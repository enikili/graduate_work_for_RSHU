package main

import (
	"log"
	"net/http"
	"os"
	"path/filepath"
	"time"

	"weather-diploma/internal/api"
	"weather-diploma/internal/store"
	"weather-diploma/internal/web"
)

func main() {
	dbPath := filepath.Join("data", "weather_app.db")

	dataStore, err := store.New(dbPath)
	if err != nil {
		log.Fatalf("init store: %v", err)
	}
	defer dataStore.Close()

	apiClient := api.NewClient()

	server, err := web.New(apiClient, dataStore)
	if err != nil {
		log.Fatalf("init server: %v", err)
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	addr := ":" + port
	log.Printf("weather app is running at http://localhost%s", addr)

	httpServer := &http.Server{
		Addr:              addr,
		Handler:           server.Routes(),
		ReadHeaderTimeout: 5 * time.Second,
		IdleTimeout:       60 * time.Second,
	}

	if err := httpServer.ListenAndServe(); err != nil {
		log.Fatalf("listen: %v", err)
	}
}
