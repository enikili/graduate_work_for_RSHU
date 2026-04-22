package web

import (
	"encoding/json"
	"errors"
	"html/template"
	"log"
	"net/http"
	"strconv"
	"strings"
	"unicode/utf8"

	"weather-diploma/internal/api"
	"weather-diploma/internal/store"
)

type Server struct {
	apiClient *api.Client
	store     *store.Store
	templates *template.Template
}

type forecastPayload struct {
	Location locationPayload       `json:"location"`
	Forecast *api.ForecastResponse `json:"forecast"`
}

type archivePayload struct {
	Location  locationPayload     `json:"location"`
	StartDate string              `json:"start_date"`
	EndDate   string              `json:"end_date"`
	Timezone  string              `json:"timezone"`
	Days      []archiveDayPayload `json:"days"`
}

type archiveDayPayload struct {
	Date             string               `json:"date"`
	WeatherCode      int                  `json:"weather_code"`
	TemperatureMax   float64              `json:"temperature_max"`
	TemperatureMin   float64              `json:"temperature_min"`
	PrecipitationSum float64              `json:"precipitation_sum"`
	Hourly           []archiveHourPayload `json:"hourly"`
}

type archiveHourPayload struct {
	Time          string  `json:"time"`
	Temperature   float64 `json:"temperature"`
	Precipitation float64 `json:"precipitation"`
}

type locationPayload struct {
	Name      string  `json:"name"`
	Region    string  `json:"region"`
	Country   string  `json:"country"`
	Latitude  float64 `json:"latitude"`
	Longitude float64 `json:"longitude"`
}

type errorPayload struct {
	Code  string `json:"code"`
	Error string `json:"error"`
}

func New(apiClient *api.Client, dataStore *store.Store) (*Server, error) {
	templates, err := template.ParseGlob("templates/*.html")
	if err != nil {
		return nil, err
	}

	return &Server{
		apiClient: apiClient,
		store:     dataStore,
		templates: templates,
	}, nil
}

func (s *Server) Routes() http.Handler {
	mux := http.NewServeMux()
	fileServer := http.FileServer(http.Dir("static"))

	mux.Handle("GET /static/", http.StripPrefix("/static/", fileServer))
	mux.HandleFunc("GET /", s.handleIndex)
	mux.HandleFunc("GET /api/search", s.handleSearch)
	mux.HandleFunc("GET /api/reverse-geocode", s.handleReverseGeocode)
	mux.HandleFunc("GET /api/forecast", s.handleForecast)
	mux.HandleFunc("GET /api/history", s.handleHistory)
	mux.HandleFunc("GET /api/archive", s.handleArchive)

	return logRequests(mux)
}

func (s *Server) handleIndex(w http.ResponseWriter, r *http.Request) {
	data := map[string]string{
		"Title": "AeroCast",
	}

	if err := s.templates.ExecuteTemplate(w, "index.html", data); err != nil {
		http.Error(w, "render error", http.StatusInternalServerError)
	}
}

func (s *Server) handleSearch(w http.ResponseWriter, r *http.Request) {
	query := strings.TrimSpace(r.URL.Query().Get("q"))
	language := strings.TrimSpace(r.URL.Query().Get("lang"))
	if utf8.RuneCountInString(query) < 2 {
		writeJSON(w, http.StatusOK, map[string]any{
			"query":   query,
			"results": []any{},
		})
		return
	}

	locations, err := s.apiClient.SearchLocation(query, language)
	if err != nil {
		log.Printf("search locations: %v", err)
		writeServiceError(w, err)
		return
	}

	writeJSON(w, http.StatusOK, map[string]any{
		"query":   query,
		"results": locations,
	})
}

func (s *Server) handleReverseGeocode(w http.ResponseWriter, r *http.Request) {
	latitude, err := strconv.ParseFloat(r.URL.Query().Get("lat"), 64)
	if err != nil {
		writeAPIError(w, http.StatusBadRequest, "invalid_request", "invalid latitude")
		return
	}

	longitude, err := strconv.ParseFloat(r.URL.Query().Get("lon"), 64)
	if err != nil {
		writeAPIError(w, http.StatusBadRequest, "invalid_request", "invalid longitude")
		return
	}

	language := strings.TrimSpace(r.URL.Query().Get("lang"))
	location, err := s.apiClient.ReverseGeocode(latitude, longitude, language)
	if err != nil {
		log.Printf("reverse geocode: %v", err)
		writeServiceError(w, err)
		return
	}

	writeJSON(w, http.StatusOK, location)
}

func (s *Server) handleForecast(w http.ResponseWriter, r *http.Request) {
	latitude, err := strconv.ParseFloat(r.URL.Query().Get("lat"), 64)
	if err != nil {
		writeAPIError(w, http.StatusBadRequest, "invalid_request", "invalid latitude")
		return
	}

	longitude, err := strconv.ParseFloat(r.URL.Query().Get("lon"), 64)
	if err != nil {
		writeAPIError(w, http.StatusBadRequest, "invalid_request", "invalid longitude")
		return
	}

	days := parseInt(r.URL.Query().Get("days"), 3)
	if days < 1 {
		days = 1
	}
	if days > 3 {
		days = 3
	}

	forecast, err := s.apiClient.GetForecast(latitude, longitude, days)
	if err != nil {
		log.Printf("get forecast: %v", err)
		writeServiceError(w, err)
		return
	}

	location := locationPayload{
		Name:      strings.TrimSpace(r.URL.Query().Get("name")),
		Region:    strings.TrimSpace(r.URL.Query().Get("region")),
		Country:   strings.TrimSpace(r.URL.Query().Get("country")),
		Latitude:  latitude,
		Longitude: longitude,
	}

	if shouldResolveLocationName(location.Name) {
		language := strings.TrimSpace(r.URL.Query().Get("lang"))
		resolvedLocation, resolveErr := s.apiClient.ReverseGeocode(latitude, longitude, language)
		if resolveErr != nil {
			log.Printf("resolve forecast location: %v", resolveErr)
		} else if resolvedLocation != nil {
			location.Name = resolvedLocation.Name
			location.Region = firstNonEmptyString(location.Region, resolvedLocation.Admin1)
			location.Country = firstNonEmptyString(location.Country, resolvedLocation.Country)
		}
	}

	if r.URL.Query().Get("save") != "0" && location.Name != "" {
		if err := s.store.SaveSearch(
			strings.TrimSpace(r.URL.Query().Get("query")),
			location.Name,
			location.Region,
			location.Country,
			location.Latitude,
			location.Longitude,
		); err != nil {
			log.Printf("save search history: %v", err)
		}
	}

	writeJSON(w, http.StatusOK, forecastPayload{
		Location: location,
		Forecast: forecast,
	})
}

func (s *Server) handleHistory(w http.ResponseWriter, r *http.Request) {
	items, err := s.store.RecentSearches(parseInt(r.URL.Query().Get("limit"), 6))
	if err != nil {
		log.Printf("recent searches: %v", err)
		writeAPIError(w, http.StatusInternalServerError, "internal_error", "history unavailable")
		return
	}

	writeJSON(w, http.StatusOK, map[string]any{
		"items": items,
	})
}

func (s *Server) handleArchive(w http.ResponseWriter, r *http.Request) {
	latitude, err := strconv.ParseFloat(r.URL.Query().Get("lat"), 64)
	if err != nil {
		writeAPIError(w, http.StatusBadRequest, "invalid_request", "invalid latitude")
		return
	}

	longitude, err := strconv.ParseFloat(r.URL.Query().Get("lon"), 64)
	if err != nil {
		writeAPIError(w, http.StatusBadRequest, "invalid_request", "invalid longitude")
		return
	}

	location := locationPayload{
		Name:      strings.TrimSpace(r.URL.Query().Get("name")),
		Region:    strings.TrimSpace(r.URL.Query().Get("region")),
		Country:   strings.TrimSpace(r.URL.Query().Get("country")),
		Latitude:  latitude,
		Longitude: longitude,
	}

	archiveResponse, err := s.apiClient.GetHistoricalArchive(latitude, longitude, parseInt(r.URL.Query().Get("days"), 14))
	if err != nil {
		log.Printf("weather archive: %v", err)
		writeServiceError(w, err)
		return
	}

	if shouldResolveLocationName(location.Name) {
		language := strings.TrimSpace(r.URL.Query().Get("lang"))
		resolvedLocation, resolveErr := s.apiClient.ReverseGeocode(latitude, longitude, language)
		if resolveErr != nil {
			log.Printf("resolve archive location: %v", resolveErr)
		} else if resolvedLocation != nil {
			location.Name = resolvedLocation.Name
			location.Region = firstNonEmptyString(location.Region, resolvedLocation.Admin1)
			location.Country = firstNonEmptyString(location.Country, resolvedLocation.Country)
		}
	}

	writeJSON(w, http.StatusOK, buildArchivePayload(location, archiveResponse))
}

func buildArchivePayload(location locationPayload, archiveResponse *api.HistoricalArchiveResponse) archivePayload {
	if archiveResponse == nil {
		return archivePayload{
			Location: location,
		}
	}

	hourlyByDate := map[string][]archiveHourPayload{}
	hourlyLength := minInt(
		len(archiveResponse.Hourly.Time),
		len(archiveResponse.Hourly.Temperature2M),
		len(archiveResponse.Hourly.Precipitation),
	)

	for index := 0; index < hourlyLength; index += 1 {
		timeText := strings.TrimSpace(archiveResponse.Hourly.Time[index])
		if timeText == "" {
			continue
		}

		dateText := timeText
		if cutIndex := strings.Index(timeText, "T"); cutIndex > 0 {
			dateText = timeText[:cutIndex]
		}

		hourlyByDate[dateText] = append(hourlyByDate[dateText], archiveHourPayload{
			Time:          timeText,
			Temperature:   archiveResponse.Hourly.Temperature2M[index],
			Precipitation: archiveResponse.Hourly.Precipitation[index],
		})
	}

	dailyLength := len(archiveResponse.Daily.Time)
	days := make([]archiveDayPayload, 0, dailyLength)
	for index := dailyLength - 1; index >= 0; index -= 1 {
		dateText := strings.TrimSpace(archiveResponse.Daily.Time[index])
		if dateText == "" {
			continue
		}

		day := archiveDayPayload{
			Date:   dateText,
			Hourly: hourlyByDate[dateText],
		}
		if index < len(archiveResponse.Daily.WeatherCode) {
			day.WeatherCode = archiveResponse.Daily.WeatherCode[index]
		}
		if index < len(archiveResponse.Daily.Temperature2MMax) {
			day.TemperatureMax = archiveResponse.Daily.Temperature2MMax[index]
		}
		if index < len(archiveResponse.Daily.Temperature2MMin) {
			day.TemperatureMin = archiveResponse.Daily.Temperature2MMin[index]
		}
		if index < len(archiveResponse.Daily.PrecipitationSum) {
			day.PrecipitationSum = archiveResponse.Daily.PrecipitationSum[index]
		}
		days = append(days, day)
	}

	startDate := ""
	endDate := ""
	if len(days) > 0 {
		endDate = days[0].Date
		startDate = days[len(days)-1].Date
	}

	return archivePayload{
		Location:  location,
		StartDate: startDate,
		EndDate:   endDate,
		Timezone:  archiveResponse.Timezone,
		Days:      days,
	}
}

func minInt(values ...int) int {
	if len(values) == 0 {
		return 0
	}

	minValue := values[0]
	for _, value := range values[1:] {
		if value < minValue {
			minValue = value
		}
	}

	return minValue
}

func writeJSON(w http.ResponseWriter, status int, payload any) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(payload)
}

func writeAPIError(w http.ResponseWriter, status int, code, message string) {
	writeJSON(w, status, errorPayload{
		Code:  code,
		Error: message,
	})
}

func writeServiceError(w http.ResponseWriter, err error) {
	var requestErr *api.RequestError
	if errors.As(err, &requestErr) {
		switch requestErr.Code {
		case api.ErrorCodeUpstreamTimeout:
			writeAPIError(w, http.StatusGatewayTimeout, string(requestErr.Code), "weather provider timeout")
		case api.ErrorCodeUpstreamInvalidResponse:
			writeAPIError(w, http.StatusBadGateway, string(requestErr.Code), "weather provider returned invalid data")
		default:
			writeAPIError(w, http.StatusBadGateway, string(requestErr.Code), "weather provider unavailable")
		}
		return
	}

	writeAPIError(w, http.StatusInternalServerError, "internal_error", "internal server error")
}

func parseInt(raw string, fallback int) int {
	if raw == "" {
		return fallback
	}

	value, err := strconv.Atoi(raw)
	if err != nil {
		return fallback
	}

	return value
}

func shouldResolveLocationName(name string) bool {
	switch strings.ToLower(strings.TrimSpace(name)) {
	case "", "моя геопозиция", "my location", "我的位置", "geolocation", "геопозиция", "地理定位":
		return true
	default:
		return false
	}
}

func firstNonEmptyString(values ...string) string {
	for _, value := range values {
		value = strings.TrimSpace(value)
		if value != "" {
			return value
		}
	}

	return ""
}

func logRequests(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Printf("%s %s", r.Method, r.URL.Path)
		next.ServeHTTP(w, r)
	})
}
