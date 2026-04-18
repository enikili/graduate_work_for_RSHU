package store

import (
	"database/sql"
	"fmt"
	"os"
	"path/filepath"
	"strings"

	_ "modernc.org/sqlite"
)

type Store struct {
	db *sql.DB
}

type SearchRecord struct {
	ID           int64   `json:"id"`
	Query        string  `json:"query"`
	LocationName string  `json:"location_name"`
	Region       string  `json:"region"`
	Country      string  `json:"country"`
	Latitude     float64 `json:"latitude"`
	Longitude    float64 `json:"longitude"`
	DisplayName  string  `json:"display_name"`
	SearchedAt   string  `json:"searched_at"`
}

func New(path string) (*Store, error) {
	if err := os.MkdirAll(filepath.Dir(path), 0o755); err != nil {
		return nil, fmt.Errorf("create sqlite dir: %w", err)
	}

	db, err := sql.Open("sqlite", path)
	if err != nil {
		return nil, fmt.Errorf("open sqlite: %w", err)
	}

	store := &Store{db: db}
	if err := store.init(); err != nil {
		db.Close()
		return nil, err
	}

	return store, nil
}

func (s *Store) SaveSearch(query, locationName, region, country string, latitude, longitude float64) error {
	_, err := s.db.Exec(`
		INSERT INTO search_history (query, location_name, region, country, latitude, longitude)
		VALUES (?, ?, ?, ?, ?, ?)
	`, strings.TrimSpace(query), strings.TrimSpace(locationName), strings.TrimSpace(region), strings.TrimSpace(country), latitude, longitude)
	if err != nil {
		return fmt.Errorf("insert search history: %w", err)
	}

	_, err = s.db.Exec(`
		DELETE FROM search_history
		WHERE id NOT IN (
			SELECT id
			FROM search_history
			ORDER BY searched_at DESC, id DESC
			LIMIT 12
		)
	`)
	if err != nil {
		return fmt.Errorf("trim search history: %w", err)
	}

	return nil
}

func (s *Store) RecentSearches(limit int) ([]SearchRecord, error) {
	if limit < 1 {
		limit = 6
	}

	rows, err := s.db.Query(`
		SELECT id, query, location_name, region, country, latitude, longitude, searched_at
		FROM search_history
		ORDER BY searched_at DESC, id DESC
		LIMIT ?
	`, limit)
	if err != nil {
		return nil, fmt.Errorf("query search history: %w", err)
	}
	defer rows.Close()

	var records []SearchRecord
	for rows.Next() {
		var item SearchRecord
		if err := rows.Scan(
			&item.ID,
			&item.Query,
			&item.LocationName,
			&item.Region,
			&item.Country,
			&item.Latitude,
			&item.Longitude,
			&item.SearchedAt,
		); err != nil {
			return nil, fmt.Errorf("scan search history: %w", err)
		}
		item.DisplayName = composeDisplayName(item.LocationName, item.Region, item.Country)
		records = append(records, item)
	}

	return records, rows.Err()
}

func (s *Store) Close() error {
	return s.db.Close()
}

func (s *Store) init() error {
	_, err := s.db.Exec(`
		CREATE TABLE IF NOT EXISTS search_history (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			query TEXT NOT NULL,
			location_name TEXT NOT NULL,
			region TEXT,
			country TEXT,
			latitude REAL NOT NULL,
			longitude REAL NOT NULL,
			searched_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
		);

		CREATE INDEX IF NOT EXISTS idx_search_history_searched_at
		ON search_history (searched_at DESC, id DESC);
	`)
	if err != nil {
		return fmt.Errorf("init schema: %w", err)
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
