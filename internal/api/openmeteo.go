package api

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"strconv"
	"strings"
	"time"
)

const (
	forecastEndpoint  = "https://api.open-meteo.com/v1/forecast"
	gfsEndpoint       = "https://api.open-meteo.com/v1/gfs"
	geocodingEndpoint = "https://geocoding-api.open-meteo.com/v1/search"
)

type Client struct {
	httpClient *http.Client
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
			Timeout: 12 * time.Second,
		},
	}
}

func (c *Client) SearchLocation(query string) ([]Location, error) {
	params := url.Values{}
	params.Set("name", strings.TrimSpace(query))
	params.Set("count", "8")
	params.Set("language", "ru")
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
		return nil, err
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
	response, err := c.httpClient.Get(requestURL)
	if err != nil {
		return err
	}
	defer response.Body.Close()

	if response.StatusCode >= http.StatusBadRequest {
		body, _ := io.ReadAll(io.LimitReader(response.Body, 2048))
		return fmt.Errorf("upstream error %s: %s", response.Status, strings.TrimSpace(string(body)))
	}

	if err := json.NewDecoder(response.Body).Decode(target); err != nil {
		return fmt.Errorf("decode response: %w", err)
	}

	return nil
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
