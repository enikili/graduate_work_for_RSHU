package api

import (
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log"
	"net"
	"net/http"
	"net/url"
	"strconv"
	"strings"
	"time"
)

const (
	forecastEndpoint         = "https://api.open-meteo.com/v1/forecast"
	gfsEndpoint              = "https://api.open-meteo.com/v1/gfs"
	geocodingEndpoint        = "https://geocoding-api.open-meteo.com/v1/search"
	reverseGeocodingEndpoint = "https://nominatim.openstreetmap.org/reverse"
)

type Client struct {
	httpClient *http.Client
}

type ErrorCode string

const (
	ErrorCodeUpstreamTimeout         ErrorCode = "upstream_timeout"
	ErrorCodeUpstreamUnavailable     ErrorCode = "upstream_unavailable"
	ErrorCodeUpstreamInvalidResponse ErrorCode = "upstream_invalid_response"
)

type RequestError struct {
	Code ErrorCode
	Err  error
}

func (e *RequestError) Error() string {
	if e == nil {
		return ""
	}

	if e.Err == nil {
		return string(e.Code)
	}

	return fmt.Sprintf("%s: %v", e.Code, e.Err)
}

func (e *RequestError) Unwrap() error {
	if e == nil {
		return nil
	}

	return e.Err
}

type upstreamStatusError struct {
	StatusCode int
	Status     string
	Body       string
}

func (e *upstreamStatusError) Error() string {
	if e == nil {
		return ""
	}

	if e.Body == "" {
		return fmt.Sprintf("upstream error: %s", e.Status)
	}

	return fmt.Sprintf("upstream error: %s: %s", e.Status, e.Body)
}

type invalidResponseError struct {
	Err error
}

func (e *invalidResponseError) Error() string {
	if e == nil || e.Err == nil {
		return "invalid upstream response"
	}

	return fmt.Sprintf("invalid upstream response: %v", e.Err)
}

func (e *invalidResponseError) Unwrap() error {
	if e == nil {
		return nil
	}

	return e.Err
}

type Location struct {
	ID          int     `json:"id"`
	Name        string  `json:"name"`
	Country     string  `json:"country"`
	CountryCode string  `json:"country_code"`
	Admin1      string  `json:"admin1"`
	Admin2      string  `json:"admin2"`
	Latitude    float64 `json:"latitude"`
	Longitude   float64 `json:"longitude"`
	Timezone    string  `json:"timezone"`
	Population  int     `json:"population"`
	DisplayName string  `json:"display_name,omitempty"`
}

type searchResponse struct {
	Results []Location `json:"results"`
}

type reverseGeocodeResponse struct {
	DisplayName string `json:"display_name"`
	Address     struct {
		City         string `json:"city"`
		Town         string `json:"town"`
		Village      string `json:"village"`
		Hamlet       string `json:"hamlet"`
		Municipality string `json:"municipality"`
		Suburb       string `json:"suburb"`
		County       string `json:"county"`
		State        string `json:"state"`
		Region       string `json:"region"`
		Country      string `json:"country"`
		CountryCode  string `json:"country_code"`
	} `json:"address"`
}

type ForecastResponse struct {
	Latitude             float64        `json:"latitude"`
	Longitude            float64        `json:"longitude"`
	Elevation            float64        `json:"elevation"`
	Timezone             string         `json:"timezone"`
	TimezoneAbbreviation string         `json:"timezone_abbreviation"`
	CurrentUnits         CurrentUnits   `json:"current_units"`
	Current              Current        `json:"current"`
	HourlyUnits          HourlyUnits    `json:"hourly_units"`
	Hourly               HourlyForecast `json:"hourly"`
	DailyUnits           DailyUnits     `json:"daily_units"`
	Daily                DailyForecast  `json:"daily"`
}

type CurrentUnits struct {
	Time                string `json:"time"`
	Interval            string `json:"interval"`
	Temperature2M       string `json:"temperature_2m"`
	ApparentTemperature string `json:"apparent_temperature"`
	RelativeHumidity2M  string `json:"relative_humidity_2m"`
	IsDay               string `json:"is_day"`
	Precipitation       string `json:"precipitation"`
	WeatherCode         string `json:"weather_code"`
	WindSpeed10M        string `json:"wind_speed_10m"`
	WindDirection10M    string `json:"wind_direction_10m"`
}

type Current struct {
	Time                string  `json:"time"`
	Interval            int     `json:"interval"`
	Temperature2M       float64 `json:"temperature_2m"`
	ApparentTemperature float64 `json:"apparent_temperature"`
	RelativeHumidity2M  float64 `json:"relative_humidity_2m"`
	IsDay               int     `json:"is_day"`
	Precipitation       float64 `json:"precipitation"`
	WeatherCode         int     `json:"weather_code"`
	WindSpeed10M        float64 `json:"wind_speed_10m"`
	WindDirection10M    float64 `json:"wind_direction_10m"`
}

type HourlyUnits struct {
	Time                     string `json:"time"`
	Temperature2M            string `json:"temperature_2m"`
	PrecipitationProbability string `json:"precipitation_probability"`
	Precipitation            string `json:"precipitation"`
	WeatherCode              string `json:"weather_code"`
}

type HourlyForecast struct {
	Time                     []string  `json:"time"`
	Temperature2M            []float64 `json:"temperature_2m"`
	PrecipitationProbability []float64 `json:"precipitation_probability"`
	Precipitation            []float64 `json:"precipitation"`
	WeatherCode              []int     `json:"weather_code"`
}

type DailyUnits struct {
	Time                        string `json:"time"`
	WeatherCode                 string `json:"weather_code"`
	Temperature2MMax            string `json:"temperature_2m_max"`
	Temperature2MMin            string `json:"temperature_2m_min"`
	PrecipitationProbabilityMax string `json:"precipitation_probability_max"`
	PrecipitationSum            string `json:"precipitation_sum"`
	WindSpeed10MMax             string `json:"wind_speed_10m_max"`
	Sunrise                     string `json:"sunrise"`
	Sunset                      string `json:"sunset"`
}

type DailyForecast struct {
	Time                        []string  `json:"time"`
	WeatherCode                 []int     `json:"weather_code"`
	Temperature2MMax            []float64 `json:"temperature_2m_max"`
	Temperature2MMin            []float64 `json:"temperature_2m_min"`
	PrecipitationProbabilityMax []float64 `json:"precipitation_probability_max"`
	PrecipitationSum            []float64 `json:"precipitation_sum"`
	WindSpeed10MMax             []float64 `json:"wind_speed_10m_max"`
	Sunrise                     []string  `json:"sunrise"`
	Sunset                      []string  `json:"sunset"`
}

type probabilityFallbackResponse struct {
	HourlyUnits struct {
		PrecipitationProbability string `json:"precipitation_probability"`
	} `json:"hourly_units"`
	Hourly struct {
		Time                     []string  `json:"time"`
		PrecipitationProbability []float64 `json:"precipitation_probability"`
	} `json:"hourly"`
	DailyUnits struct {
		PrecipitationProbabilityMax string `json:"precipitation_probability_max"`
	} `json:"daily_units"`
	Daily struct {
		Time                        []string  `json:"time"`
		PrecipitationProbabilityMax []float64 `json:"precipitation_probability_max"`
	} `json:"daily"`
}

func NewClient() *Client {
	return &Client{
		httpClient: &http.Client{
			Transport: &http.Transport{
				Proxy: http.ProxyFromEnvironment,
				DialContext: (&net.Dialer{
					Timeout:   5 * time.Second,
					KeepAlive: 30 * time.Second,
				}).DialContext,
				ForceAttemptHTTP2:     true,
				MaxIdleConns:          32,
				MaxIdleConnsPerHost:   16,
				IdleConnTimeout:       90 * time.Second,
				TLSHandshakeTimeout:   5 * time.Second,
				ExpectContinueTimeout: 1 * time.Second,
			},
			Timeout: 12 * time.Second,
		},
	}
}

func (c *Client) SearchLocation(query, language string) ([]Location, error) {
	params := url.Values{}
	params.Set("name", strings.TrimSpace(query))
	params.Set("count", "8")
	params.Set("language", normalizeLanguage(language))
	params.Set("format", "json")

	var payload searchResponse
	if err := c.getJSON(geocodingEndpoint+"?"+params.Encode(), &payload); err != nil {
		return nil, err
	}

	for index := range payload.Results {
		payload.Results[index].DisplayName = composeDisplayName(
			payload.Results[index].Name,
			payload.Results[index].Admin1,
			payload.Results[index].Country,
		)
	}

	return payload.Results, nil
}

func (c *Client) ReverseGeocode(latitude, longitude float64, language string) (*Location, error) {
	params := url.Values{}
	params.Set("lat", strconv.FormatFloat(latitude, 'f', 6, 64))
	params.Set("lon", strconv.FormatFloat(longitude, 'f', 6, 64))
	params.Set("format", "jsonv2")
	params.Set("accept-language", normalizeReverseLanguage(language))

	var payload reverseGeocodeResponse
	if err := c.getJSONWithHeaders(reverseGeocodingEndpoint+"?"+params.Encode(), &payload, map[string]string{
		"User-Agent": "AeroCast/1.0 (diploma weather app)",
	}); err != nil {
		return nil, err
	}

	name := firstNonEmpty(
		payload.Address.City,
		payload.Address.Town,
		payload.Address.Village,
		payload.Address.Hamlet,
		payload.Address.Municipality,
		payload.Address.Suburb,
		payload.Address.County,
	)
	if name == "" && payload.DisplayName != "" {
		name = strings.TrimSpace(strings.Split(payload.DisplayName, ",")[0])
	}
	if name == "" {
		return nil, &RequestError{
			Code: ErrorCodeUpstreamInvalidResponse,
			Err:  errors.New("reverse geocoding returned empty place"),
		}
	}

	location := &Location{
		Name:        name,
		Country:     strings.TrimSpace(payload.Address.Country),
		CountryCode: strings.ToUpper(strings.TrimSpace(payload.Address.CountryCode)),
		Admin1:      firstNonEmpty(payload.Address.State, payload.Address.Region),
		Latitude:    latitude,
		Longitude:   longitude,
	}
	location.DisplayName = composeDisplayName(location.Name, location.Admin1, location.Country)

	return location, nil
}

func normalizeLanguage(language string) string {
	switch strings.ToLower(strings.TrimSpace(language)) {
	case "ru":
		return "ru"
	case "en":
		return "en"
	case "zh", "zh-cn", "zh-hans":
		return "zh"
	default:
		return "ru"
	}
}

func normalizeReverseLanguage(language string) string {
	switch normalizeLanguage(language) {
	case "zh":
		return "zh-CN"
	default:
		return normalizeLanguage(language)
	}
}

func (c *Client) GetForecast(latitude, longitude float64, days int) (*ForecastResponse, error) {
	if days < 1 {
		days = 1
	}
	if days > 3 {
		days = 3
	}

	params := url.Values{}
	params.Set("latitude", strconv.FormatFloat(latitude, 'f', 4, 64))
	params.Set("longitude", strconv.FormatFloat(longitude, 'f', 4, 64))
	params.Set("forecast_days", strconv.Itoa(days))
	params.Set("timezone", "auto")
	params.Set("current", strings.Join([]string{
		"temperature_2m",
		"apparent_temperature",
		"relative_humidity_2m",
		"is_day",
		"precipitation",
		"weather_code",
		"wind_speed_10m",
		"wind_direction_10m",
	}, ","))
	params.Set("hourly", strings.Join([]string{
		"temperature_2m",
		"precipitation_probability",
		"precipitation",
		"weather_code",
	}, ","))
	params.Set("daily", strings.Join([]string{
		"weather_code",
		"temperature_2m_max",
		"temperature_2m_min",
		"precipitation_probability_max",
		"precipitation_sum",
		"wind_speed_10m_max",
		"sunrise",
		"sunset",
	}, ","))

	var forecast ForecastResponse
	if err := c.getJSON(forecastEndpoint+"?"+params.Encode(), &forecast); err != nil {
		return nil, err
	}

	if err := c.mergeProbabilityFallback(&forecast, latitude, longitude, days); err != nil {
		log.Printf("load precipitation probability fallback: %v", err)
	}

	return &forecast, nil
}

func (c *Client) mergeProbabilityFallback(forecast *ForecastResponse, latitude, longitude float64, days int) error {
	if len(forecast.Hourly.PrecipitationProbability) > 0 && len(forecast.Daily.PrecipitationProbabilityMax) > 0 {
		return nil
	}

	params := url.Values{}
	params.Set("latitude", strconv.FormatFloat(latitude, 'f', 4, 64))
	params.Set("longitude", strconv.FormatFloat(longitude, 'f', 4, 64))
	params.Set("forecast_days", strconv.Itoa(days))
	params.Set("timezone", "auto")
	params.Set("hourly", "precipitation_probability")
	params.Set("daily", "precipitation_probability_max")

	var fallback probabilityFallbackResponse
	if err := c.getJSON(gfsEndpoint+"?"+params.Encode(), &fallback); err != nil {
		return fmt.Errorf("load precipitation probability fallback: %w", err)
	}

	if len(forecast.Hourly.PrecipitationProbability) == 0 && len(fallback.Hourly.PrecipitationProbability) > 0 {
		forecast.Hourly.PrecipitationProbability = fallback.Hourly.PrecipitationProbability
		if forecast.HourlyUnits.PrecipitationProbability == "" {
			forecast.HourlyUnits.PrecipitationProbability = fallback.HourlyUnits.PrecipitationProbability
		}
		if len(forecast.Hourly.Time) == 0 {
			forecast.Hourly.Time = fallback.Hourly.Time
		}
	}

	if len(forecast.Daily.PrecipitationProbabilityMax) == 0 && len(fallback.Daily.PrecipitationProbabilityMax) > 0 {
		forecast.Daily.PrecipitationProbabilityMax = fallback.Daily.PrecipitationProbabilityMax
		if forecast.DailyUnits.PrecipitationProbabilityMax == "" {
			forecast.DailyUnits.PrecipitationProbabilityMax = fallback.DailyUnits.PrecipitationProbabilityMax
		}
		if len(forecast.Daily.Time) == 0 {
			forecast.Daily.Time = fallback.Daily.Time
		}
	}

	return nil
}

func (c *Client) getJSON(requestURL string, target any) error {
	return c.getJSONWithHeaders(requestURL, target, nil)
}

func (c *Client) getJSONWithHeaders(requestURL string, target any, headers map[string]string) error {
	const maxAttempts = 3

	var lastErr error
	for attempt := 1; attempt <= maxAttempts; attempt++ {
		if attempt > 1 {
			time.Sleep(time.Duration(attempt-1) * 350 * time.Millisecond)
		}

		if err := c.getJSONOnce(requestURL, target, headers); err != nil {
			lastErr = err
			if attempt == maxAttempts || !shouldRetryRequest(err) {
				return classifyRequestError(err)
			}
			continue
		}

		return nil
	}

	return classifyRequestError(lastErr)
}

func (c *Client) getJSONOnce(requestURL string, target any, headers map[string]string) error {
	request, err := http.NewRequest(http.MethodGet, requestURL, nil)
	if err != nil {
		return err
	}

	for key, value := range headers {
		if strings.TrimSpace(key) == "" || strings.TrimSpace(value) == "" {
			continue
		}
		request.Header.Set(key, value)
	}

	response, err := c.httpClient.Do(request)
	if err != nil {
		return err
	}
	defer response.Body.Close()

	if response.StatusCode >= http.StatusBadRequest {
		body, _ := io.ReadAll(io.LimitReader(response.Body, 2048))
		return &upstreamStatusError{
			StatusCode: response.StatusCode,
			Status:     response.Status,
			Body:       strings.TrimSpace(string(body)),
		}
	}

	if err := json.NewDecoder(response.Body).Decode(target); err != nil {
		return &invalidResponseError{Err: err}
	}

	return nil
}

func shouldRetryRequest(err error) bool {
	var statusErr *upstreamStatusError
	if errors.As(err, &statusErr) {
		switch statusErr.StatusCode {
		case http.StatusTooManyRequests, http.StatusBadGateway, http.StatusServiceUnavailable, http.StatusGatewayTimeout:
			return true
		default:
			return false
		}
	}

	var netErr net.Error
	if errors.As(err, &netErr) {
		return netErr.Timeout()
	}

	return errors.Is(err, io.EOF)
}

func classifyRequestError(err error) error {
	if err == nil {
		return nil
	}

	var requestErr *RequestError
	if errors.As(err, &requestErr) {
		return requestErr
	}

	var invalidErr *invalidResponseError
	if errors.As(err, &invalidErr) {
		return &RequestError{
			Code: ErrorCodeUpstreamInvalidResponse,
			Err:  err,
		}
	}

	var statusErr *upstreamStatusError
	if errors.As(err, &statusErr) {
		code := ErrorCodeUpstreamUnavailable
		if statusErr.StatusCode >= http.StatusBadRequest && statusErr.StatusCode < http.StatusInternalServerError && statusErr.StatusCode != http.StatusTooManyRequests {
			code = ErrorCodeUpstreamInvalidResponse
		}

		return &RequestError{
			Code: code,
			Err:  err,
		}
	}

	var netErr net.Error
	if errors.As(err, &netErr) && netErr.Timeout() {
		return &RequestError{
			Code: ErrorCodeUpstreamTimeout,
			Err:  err,
		}
	}

	return &RequestError{
		Code: ErrorCodeUpstreamUnavailable,
		Err:  err,
	}
}

func composeDisplayName(parts ...string) string {
	seen := map[string]bool{}
	result := make([]string, 0, len(parts))

	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" || seen[strings.ToLower(part)] {
			continue
		}
		seen[strings.ToLower(part)] = true
		result = append(result, part)
	}

	return strings.Join(result, ", ")
}

func firstNonEmpty(parts ...string) string {
	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part != "" {
			return part
		}
	}

	return ""
}
