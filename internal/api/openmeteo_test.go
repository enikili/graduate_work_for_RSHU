package api

import (
	"errors"
	"io"
	"testing"
	"time"
)

type timeoutError struct{}

func (timeoutError) Error() string   { return "timeout" }
func (timeoutError) Timeout() bool   { return true }
func (timeoutError) Temporary() bool { return true }

func TestNormalizeLanguage(t *testing.T) {
	testCases := map[string]string{
		"ru":      "ru",
		"RU":      "ru",
		"en":      "en",
		"zh":      "zh",
		"zh-CN":   "zh",
		"unknown": "ru",
		"":        "ru",
	}

	for input, want := range testCases {
		if got := normalizeLanguage(input); got != want {
			t.Fatalf("normalizeLanguage(%q) = %q, want %q", input, got, want)
		}
	}
}

func TestShouldRetryRequest(t *testing.T) {
	if !shouldRetryRequest(&upstreamStatusError{StatusCode: 503, Status: "503 Service Unavailable"}) {
		t.Fatal("expected retry for 503 response")
	}

	if shouldRetryRequest(&upstreamStatusError{StatusCode: 404, Status: "404 Not Found"}) {
		t.Fatal("did not expect retry for 404 response")
	}

	if !shouldRetryRequest(timeoutError{}) {
		t.Fatal("expected retry for timeout error")
	}

	if !shouldRetryRequest(io.EOF) {
		t.Fatal("expected retry for EOF")
	}
}

func TestClassifyRequestError(t *testing.T) {
	testCases := []struct {
		name string
		err  error
		want ErrorCode
	}{
		{
			name: "timeout",
			err:  timeoutError{},
			want: ErrorCodeUpstreamTimeout,
		},
		{
			name: "invalid response",
			err:  &invalidResponseError{Err: errors.New("bad json")},
			want: ErrorCodeUpstreamInvalidResponse,
		},
		{
			name: "status 503",
			err:  &upstreamStatusError{StatusCode: 503, Status: "503 Service Unavailable"},
			want: ErrorCodeUpstreamUnavailable,
		},
		{
			name: "status 400",
			err:  &upstreamStatusError{StatusCode: 400, Status: "400 Bad Request"},
			want: ErrorCodeUpstreamInvalidResponse,
		},
	}

	for _, testCase := range testCases {
		t.Run(testCase.name, func(t *testing.T) {
			err := classifyRequestError(testCase.err)
			var requestErr *RequestError
			if !errors.As(err, &requestErr) {
				t.Fatalf("expected RequestError, got %T", err)
			}

			if requestErr.Code != testCase.want {
				t.Fatalf("request error code = %q, want %q", requestErr.Code, testCase.want)
			}
		})
	}
}

func TestArchiveDateRange(t *testing.T) {
	now := time.Date(2026, time.April, 22, 14, 30, 0, 0, time.UTC)

	startDate, endDate := archiveDateRange(now, 14)
	if startDate != "2026-04-08" || endDate != "2026-04-21" {
		t.Fatalf("archiveDateRange(...) = %s..%s, want 2026-04-08..2026-04-21", startDate, endDate)
	}

	startDate, endDate = archiveDateRange(now, 1)
	if startDate != "2026-04-21" || endDate != "2026-04-21" {
		t.Fatalf("archiveDateRange(...,1) = %s..%s, want 2026-04-21..2026-04-21", startDate, endDate)
	}
}
