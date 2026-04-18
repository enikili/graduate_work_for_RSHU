const state = {
  selectedLocation: null,
};

const elements = {
  form: document.querySelector("#search-form"),
  input: document.querySelector("#location-input"),
  results: document.querySelector("#search-results"),
  currentPlace: document.querySelector("#current-place"),
  currentSummary: document.querySelector("#current-summary"),
  currentIcon: document.querySelector("#current-icon"),
  currentTemp: document.querySelector("#current-temp"),
  feelsLike: document.querySelector("#feels-like"),
  currentPrecip: document.querySelector("#current-precip"),
  currentHumidity: document.querySelector("#current-humidity"),
  currentWind: document.querySelector("#current-wind"),
  currentTimezone: document.querySelector("#current-timezone"),
  forecastGrid: document.querySelector("#forecast-grid"),
  chartCaption: document.querySelector("#chart-caption"),
  chartSummary: document.querySelector("#chart-summary"),
  chart: document.querySelector("#precip-chart"),
  detailsGrid: document.querySelector("#details-grid"),
  historyList: document.querySelector("#history-list"),
};

const weatherCatalog = {
  0: { label: "Ясно", icon: "sun" },
  1: { label: "Преимущественно ясно", icon: "sun" },
  2: { label: "Переменная облачность", icon: "cloudSun" },
  3: { label: "Пасмурно", icon: "cloud" },
  45: { label: "Туман", icon: "fog" },
  48: { label: "Изморозь", icon: "fog" },
  51: { label: "Слабая морось", icon: "rain" },
  53: { label: "Морось", icon: "rain" },
  55: { label: "Сильная морось", icon: "rain" },
  56: { label: "Ледяная морось", icon: "rain" },
  57: { label: "Сильная ледяная морось", icon: "rain" },
  61: { label: "Небольшой дождь", icon: "rain" },
  63: { label: "Дождь", icon: "rain" },
  65: { label: "Сильный дождь", icon: "rain" },
  66: { label: "Ледяной дождь", icon: "rain" },
  67: { label: "Сильный ледяной дождь", icon: "rain" },
  71: { label: "Небольшой снег", icon: "snow" },
  73: { label: "Снег", icon: "snow" },
  75: { label: "Сильный снег", icon: "snow" },
  77: { label: "Снежная крупа", icon: "snow" },
  80: { label: "Ливень", icon: "rain" },
  81: { label: "Ливень", icon: "rain" },
  82: { label: "Сильный ливень", icon: "storm" },
  85: { label: "Снежный заряд", icon: "snow" },
  86: { label: "Сильный снежный заряд", icon: "snow" },
  95: { label: "Гроза", icon: "storm" },
  96: { label: "Гроза с градом", icon: "storm" },
  99: { label: "Сильная гроза с градом", icon: "storm" },
};

function debounce(callback, delay = 280) {
  let timeoutId;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => callback(...args), delay);
  };
}

function getWeatherMeta(code) {
  return weatherCatalog[code] || { label: "Нет данных", icon: "cloud" };
}

function formatTemperature(value) {
  if (!Number.isFinite(value)) {
    return "Нет данных";
  }
  return `${Math.round(value)}°`;
}

function formatPrecip(value) {
  if (!Number.isFinite(value)) {
    return "Нет данных";
  }
  return `${Number(value).toFixed(1)} мм`;
}

function formatProbability(value) {
  if (!Number.isFinite(value)) {
    return "Нет данных";
  }
  return `${Math.round(value)}%`;
}

function formatWind(speed, direction) {
  if (!Number.isFinite(speed)) {
    return "Нет данных";
  }
  return `${Math.round(speed)} км/ч, ${windDirectionLabel(direction)}`;
}

function windDirectionLabel(direction) {
  if (!Number.isFinite(direction)) {
    return "—";
  }

  const sectors = ["С", "СВ", "В", "ЮВ", "Ю", "ЮЗ", "З", "СЗ"];
  const normalized = ((direction % 360) + 360) % 360;
  return sectors[Math.round(normalized / 45) % 8];
}

function formatDay(dateText) {
  if (!dateText) {
    return "Нет данных";
  }

  const date = new Date(`${dateText}T12:00:00`);
  if (Number.isNaN(date.getTime())) {
    return "Нет данных";
  }

  return new Intl.DateTimeFormat("ru-RU", {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(date);
}

function formatHour(dateText) {
  if (!dateText) {
    return "Нет данных";
  }

  const date = new Date(dateText);
  if (Number.isNaN(date.getTime())) {
    return "Нет данных";
  }

  return new Intl.DateTimeFormat("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function compactDayLabel(timeText) {
  if (!timeText) {
    return "Нет данных";
  }

  const date = new Date(timeText);
  if (Number.isNaN(date.getTime())) {
    return "Нет данных";
  }

  return new Intl.DateTimeFormat("ru-RU", {
    weekday: "short",
    day: "numeric",
  }).format(date);
}

function shortTime(dateText) {
  if (!dateText) {
    return "Нет данных";
  }

  const date = new Date(dateText);
  if (Number.isNaN(date.getTime())) {
    return "Нет данных";
  }

  return new Intl.DateTimeFormat("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function getProbabilityDataset(hourly) {
  const values = Array.isArray(hourly?.precipitation_probability)
    ? hourly.precipitation_probability
    : [];
  const times = Array.isArray(hourly?.time) ? hourly.time : [];
  const length = Math.min(values.length, times.length);
  const dataset = [];

  for (let index = 0; index < length; index += 1) {
    if (!Number.isFinite(values[index]) || !times[index]) {
      continue;
    }

    dataset.push({
      time: times[index],
      value: values[index],
    });
  }

  return dataset;
}

function polylineToPath(points) {
  if (!points.length) {
    return "";
  }

  return points.reduce((path, point, index) => (
    index === 0 ? `M ${point}` : `${path} L ${point}`
  ), "");
}

async function fetchJSON(url) {
  const response = await fetch(url);
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Запрос завершился ошибкой.");
  }

  return response.json();
}

async function searchLocations(query) {
  const payload = await fetchJSON(`/api/search?q=${encodeURIComponent(query)}`);
  return payload.results || [];
}

async function fetchForecast(location, options = {}) {
  const params = new URLSearchParams({
    lat: String(location.latitude),
    lon: String(location.longitude),
    name: location.name,
    region: location.admin1 || location.region || "",
    country: location.country || "",
    query: options.query || location.name,
    days: String(options.days || 3),
    save: options.save === false ? "0" : "1",
  });

  const payload = await fetchJSON(`/api/forecast?${params.toString()}`);
  state.selectedLocation = {
    name: payload.location.name,
    region: payload.location.region,
    country: payload.location.country,
    latitude: payload.location.latitude,
    longitude: payload.location.longitude,
  };
  renderForecast(payload);
  await loadHistory();
}

function renderSuggestions(items) {
  elements.results.innerHTML = "";

  if (!items.length) {
    elements.results.hidden = true;
    return;
  }

  items.forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.innerHTML = `
      <span>
        <span class="result-title">${item.name}</span>
        <span class="result-meta">${item.display_name || item.country || ""}</span>
      </span>
      <span class="result-meta">${Math.round(item.latitude * 10) / 10}, ${Math.round(item.longitude * 10) / 10}</span>
    `;

    button.addEventListener("click", async () => {
      elements.results.hidden = true;
      elements.input.value = item.display_name || item.name;
      state.selectedLocation = item;
      await fetchForecast(item, { query: elements.input.value });
    });

    elements.results.appendChild(button);
  });

  elements.results.hidden = false;
}

function renderForecast(payload) {
  const forecast = payload.forecast;
  const location = payload.location;
  const currentMeta = getWeatherMeta(forecast.current.weather_code);
  const locationTitle = [location.name, location.region, location.country]
    .filter(Boolean)
    .filter((item, index, array) => array.indexOf(item) === index)
    .join(", ");

  elements.currentPlace.textContent = locationTitle || "Выбранная локация";
  elements.currentSummary.textContent = currentMeta.label;
  elements.currentIcon.innerHTML = currentSceneMarkup(currentMeta.icon, forecast.current.is_day === 1);
  elements.currentTemp.textContent = formatTemperature(forecast.current.temperature_2m);
  elements.feelsLike.textContent = `Ощущается как ${formatTemperature(forecast.current.apparent_temperature)}`;
  elements.currentPrecip.textContent = formatPrecip(forecast.current.precipitation);
  elements.currentHumidity.textContent = Number.isFinite(forecast.current.relative_humidity_2m)
    ? `${Math.round(forecast.current.relative_humidity_2m)}%`
    : "Нет данных";
  elements.currentWind.textContent = formatWind(
    forecast.current.wind_speed_10m,
    forecast.current.wind_direction_10m,
  );
  elements.currentTimezone.textContent = forecast.timezone || "Нет данных";

  renderDailyCards(forecast.daily);
  renderDetails(forecast);
  renderChart(forecast.hourly, locationTitle || "выбранной локации");
}

function renderDailyCards(daily) {
  elements.forecastGrid.innerHTML = "";

  const dailyTimes = Array.isArray(daily?.time) ? daily.time : [];
  dailyTimes.forEach((day, index) => {
    const meta = getWeatherMeta(daily.weather_code?.[index]);
    const probability = Array.isArray(daily.precipitation_probability_max)
      ? daily.precipitation_probability_max[index]
      : null;
    const item = document.createElement("article");
    item.className = "forecast-item";
    item.innerHTML = `
      <div class="forecast-day">
        <strong>${formatDay(day)}</strong>
        <span>${meta.label}</span>
      </div>
      <div class="forecast-main">
        <div class="forecast-icon">${iconMarkup(meta.icon, true)}</div>
        <div>
          <strong>${formatProbability(probability)}</strong>
          <div class="forecast-extra">Осадки: ${formatPrecip(daily.precipitation_sum?.[index])}</div>
        </div>
      </div>
      <div class="forecast-temp">
        <strong>${formatTemperature(daily.temperature_2m_max?.[index])} / ${formatTemperature(daily.temperature_2m_min?.[index])}</strong>
        <span class="forecast-extra">Ветер до ${Number.isFinite(daily.wind_speed_10m_max?.[index]) ? Math.round(daily.wind_speed_10m_max[index]) : "—"} км/ч</span>
      </div>
    `;
    elements.forecastGrid.appendChild(item);
  });
}

function renderDetails(forecast) {
  const probabilityDataset = getProbabilityDataset(forecast.hourly);
  const probabilities = probabilityDataset.map((item) => item.value);
  const peakProbability = probabilities.length ? Math.max(...probabilities) : null;
  const peakIndex = peakProbability === null
    ? -1
    : probabilityDataset.findIndex((item) => item.value === peakProbability);
  const precipitationSeries = Array.isArray(forecast.daily?.precipitation_sum)
    ? forecast.daily.precipitation_sum.filter((item) => Number.isFinite(item))
    : [];
  const totalPrecip = precipitationSeries.reduce((sum, item) => sum + item, 0);
  const sunrise = Array.isArray(forecast.daily?.sunrise) ? forecast.daily.sunrise[0] : "";
  const sunset = Array.isArray(forecast.daily?.sunset) ? forecast.daily.sunset[0] : "";

  const details = [
    {
      label: "Пик вероятности осадков",
      value: formatProbability(peakProbability),
      note: peakIndex >= 0 ? `Около ${formatHour(probabilityDataset[peakIndex].time)}` : "Нет данных",
    },
    {
      label: "Суммарные осадки за 3 дня",
      value: formatPrecip(totalPrecip),
      note: "Полезно для аналитики и сравнений.",
    },
    {
      label: "Восход",
      value: shortTime(sunrise),
      note: "Сегодня",
    },
    {
      label: "Закат",
      value: shortTime(sunset),
      note: "Сегодня",
    },
  ];

  elements.detailsGrid.innerHTML = details.map((item) => `
    <article class="detail-card">
      <span>${item.label}</span>
      <strong>${item.value}</strong>
      <div class="forecast-extra">${item.note}</div>
    </article>
  `).join("");
}

function renderChartUnavailable(title) {
  elements.chartCaption.textContent = `Источник прогноза не вернул вероятность осадков для локации: ${title}.`;
  elements.chartSummary.innerHTML = `
    <p>Вероятность осадков временно недоступна</p>
  `;
  elements.chart.innerHTML = `
    <div class="chart-empty">
      <p>Не удалось построить график вероятности осадков для этой локации.</p>
    </div>
  `;
}

function renderChart(hourly, title) {
  const probabilityDataset = getProbabilityDataset(hourly);
  if (!probabilityDataset.length) {
    renderChartUnavailable(title);
    return;
  }

  const width = 980;
  const height = 300;
  const paddingX = 40;
  const paddingTop = 20;
  const paddingBottom = 44;
  const chartWidth = width - paddingX * 2;
  const chartHeight = height - paddingTop - paddingBottom;

  const values = probabilityDataset.map((item) => item.value);
  const times = probabilityDataset.map((item) => item.time);
  const points = values.map((value, index) => {
    const x = paddingX + (chartWidth / Math.max(values.length - 1, 1)) * index;
    const y = paddingTop + chartHeight - (value / 100) * chartHeight;
    return `${x},${y}`;
  });

  const linePath = polylineToPath(points);
  const areaPath = `${linePath} L ${paddingX + chartWidth},${paddingTop + chartHeight} L ${paddingX},${paddingTop + chartHeight} Z`;

  const grid = [0, 25, 50, 75, 100].map((step) => {
    const y = paddingTop + chartHeight - (step / 100) * chartHeight;
    return `
      <line class="grid-line" x1="${paddingX}" y1="${y}" x2="${paddingX + chartWidth}" y2="${y}"></line>
      <text class="axis-label" x="4" y="${y + 4}">${step}%</text>
    `;
  }).join("");

  const dayMarks = times
    .map((label, index) => ({ label, index }))
    .filter((item) => item.index === 0 || item.label.endsWith("00:00"))
    .slice(0, 4)
    .map((item) => {
      const x = paddingX + (chartWidth / Math.max(values.length - 1, 1)) * item.index;
      return `
        <line class="grid-line" x1="${x}" y1="${paddingTop}" x2="${x}" y2="${paddingTop + chartHeight}"></line>
        <text class="axis-label" x="${x - 18}" y="${height - 10}">${compactDayLabel(item.label)}</text>
      `;
    })
    .join("");

  elements.chart.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="График вероятности осадков">
      <defs>
        <linearGradient id="chart-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="#71d7ff" stop-opacity="0.48"></stop>
          <stop offset="100%" stop-color="#71d7ff" stop-opacity="0.02"></stop>
        </linearGradient>
      </defs>
      ${grid}
      ${dayMarks}
      <path d="${areaPath}" fill="url(#chart-fill)"></path>
      <path d="${linePath}" fill="none" stroke="#71d7ff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>
  `;

  const peak = Math.max(...values);
  const average = values.reduce((sum, value) => sum + value, 0) / Math.max(values.length, 1);
  elements.chartCaption.textContent = `Почасовой график вероятности осадков для локации: ${title}.`;
  elements.chartSummary.innerHTML = `
    <p>Пиковая вероятность: ${Math.round(peak)}%</p>
    <p>Среднее значение: ${Math.round(average)}%</p>
    <p>Интервал: ${values.length} часов</p>
  `;
}

function currentSceneMarkup(type, isDay) {
  switch (type) {
    case "sun":
      return isDay ? clearSkyScene() : clearNightScene();
    case "cloudSun":
      return partlyCloudyScene(isDay);
    case "rain":
      return rainScene();
    case "snow":
      return snowScene();
    case "storm":
      return stormScene();
    case "fog":
      return fogScene();
    case "cloud":
    default:
      return cloudyScene();
  }
}

function clearSkyScene() {
  return `
    <div class="weather-scene weather-scene--clear-day">
      <svg viewBox="0 0 160 160" fill="none" aria-hidden="true">
        <circle class="weather-scene__halo" cx="80" cy="74" r="40"></circle>
        <circle class="weather-scene__sun" cx="80" cy="74" r="25"></circle>
        <g class="weather-scene__rays">
          <path d="M80 22v16"></path>
          <path d="M80 110v16"></path>
          <path d="M132 74h-16"></path>
          <path d="M44 74H28"></path>
          <path d="M117 37l-11 11"></path>
          <path d="M54 100 43 111"></path>
          <path d="M117 111l-11-11"></path>
          <path d="M54 48 43 37"></path>
        </g>
        <circle class="weather-scene__spark" cx="36" cy="38" r="3"></circle>
        <circle class="weather-scene__spark weather-scene__spark--late" cx="122" cy="48" r="2.5"></circle>
        <circle class="weather-scene__spark" cx="118" cy="112" r="3"></circle>
      </svg>
    </div>
  `;
}

function clearNightScene() {
  return `
    <div class="weather-scene weather-scene--clear-night">
      <svg viewBox="0 0 160 160" fill="none" aria-hidden="true">
        <circle class="weather-scene__moon-glow" cx="92" cy="68" r="34"></circle>
        <circle class="weather-scene__moon" cx="90" cy="70" r="24"></circle>
        <circle class="weather-scene__moon-cut" cx="102" cy="60" r="22"></circle>
        <circle class="weather-scene__star" cx="46" cy="42" r="3"></circle>
        <circle class="weather-scene__star weather-scene__spark--late" cx="122" cy="36" r="2.5"></circle>
        <circle class="weather-scene__star" cx="118" cy="102" r="2.5"></circle>
        <circle class="weather-scene__star weather-scene__spark--late" cx="58" cy="112" r="2"></circle>
      </svg>
    </div>
  `;
}

function partlyCloudyScene(isDay) {
  return `
    <div class="weather-scene ${isDay ? "weather-scene--partly-day" : "weather-scene--partly-night"}">
      <svg viewBox="0 0 160 160" fill="none" aria-hidden="true">
        ${isDay
          ? `
            <circle class="weather-scene__sun weather-scene__sun--small" cx="58" cy="56" r="20"></circle>
            <g class="weather-scene__rays weather-scene__rays--small">
              <path d="M58 24v12"></path>
              <path d="M58 76v12"></path>
              <path d="M90 56H78"></path>
              <path d="M38 56H26"></path>
              <path d="M80 34 72 42"></path>
              <path d="M44 70 36 78"></path>
              <path d="M80 78 72 70"></path>
              <path d="M44 42 36 34"></path>
            </g>
          `
          : `
            <circle class="weather-scene__moon" cx="62" cy="58" r="20"></circle>
            <circle class="weather-scene__moon-cut" cx="72" cy="50" r="18"></circle>
            <circle class="weather-scene__star" cx="112" cy="40" r="2.5"></circle>
          `}
        <g class="weather-scene__cloud weather-scene__cloud--back">
          <circle cx="70" cy="92" r="20"></circle>
          <circle cx="96" cy="82" r="24"></circle>
          <circle cx="122" cy="94" r="18"></circle>
          <rect x="50" y="94" width="90" height="24" rx="12"></rect>
        </g>
        <g class="weather-scene__cloud weather-scene__cloud--front">
          <circle cx="48" cy="104" r="14"></circle>
          <circle cx="68" cy="96" r="17"></circle>
          <circle cx="88" cy="106" r="13"></circle>
          <rect x="34" y="106" width="64" height="18" rx="9"></rect>
        </g>
      </svg>
    </div>
  `;
}

function cloudyScene() {
  return `
    <div class="weather-scene weather-scene--cloudy">
      <svg viewBox="0 0 160 160" fill="none" aria-hidden="true">
        <g class="weather-scene__cloud weather-scene__cloud--back">
          <circle cx="56" cy="84" r="20"></circle>
          <circle cx="84" cy="72" r="26"></circle>
          <circle cx="114" cy="86" r="21"></circle>
          <rect x="36" y="84" width="100" height="28" rx="14"></rect>
        </g>
        <g class="weather-scene__cloud weather-scene__cloud--front">
          <circle cx="64" cy="108" r="16"></circle>
          <circle cx="88" cy="98" r="21"></circle>
          <circle cx="112" cy="110" r="15"></circle>
          <rect x="48" y="108" width="78" height="22" rx="11"></rect>
        </g>
      </svg>
    </div>
  `;
}

function rainScene() {
  return `
    <div class="weather-scene weather-scene--rain">
      <svg viewBox="0 0 160 160" fill="none" aria-hidden="true">
        <g class="weather-scene__cloud weather-scene__cloud--back">
          <circle cx="64" cy="74" r="20"></circle>
          <circle cx="90" cy="62" r="26"></circle>
          <circle cx="118" cy="78" r="18"></circle>
          <rect x="44" y="74" width="96" height="28" rx="14"></rect>
        </g>
        <g class="weather-scene__cloud weather-scene__cloud--front weather-scene__cloud--dark">
          <circle cx="56" cy="96" r="16"></circle>
          <circle cx="82" cy="88" r="22"></circle>
          <circle cx="108" cy="100" r="16"></circle>
          <rect x="40" y="98" width="84" height="22" rx="11"></rect>
        </g>
        <path class="weather-scene__drop" style="animation-delay:0s" d="M58 120c4 8 4 14 0 20"></path>
        <path class="weather-scene__drop" style="animation-delay:.25s" d="M82 122c4 8 4 14 0 20"></path>
        <path class="weather-scene__drop" style="animation-delay:.5s" d="M106 120c4 8 4 14 0 20"></path>
      </svg>
    </div>
  `;
}

function snowScene() {
  return `
    <div class="weather-scene weather-scene--snow">
      <svg viewBox="0 0 160 160" fill="none" aria-hidden="true">
        <g class="weather-scene__cloud weather-scene__cloud--back">
          <circle cx="64" cy="78" r="20"></circle>
          <circle cx="92" cy="66" r="26"></circle>
          <circle cx="120" cy="82" r="18"></circle>
          <rect x="44" y="78" width="98" height="28" rx="14"></rect>
        </g>
        <g class="weather-scene__snowflake" style="animation-delay:0s">
          <path d="M54 118v14"></path>
          <path d="M47 125h14"></path>
          <path d="m49 120 10 10"></path>
          <path d="m59 120-10 10"></path>
        </g>
        <g class="weather-scene__snowflake" style="animation-delay:.4s">
          <path d="M82 122v14"></path>
          <path d="M75 129h14"></path>
          <path d="m77 124 10 10"></path>
          <path d="m87 124-10 10"></path>
        </g>
        <g class="weather-scene__snowflake" style="animation-delay:.8s">
          <path d="M110 118v14"></path>
          <path d="M103 125h14"></path>
          <path d="m105 120 10 10"></path>
          <path d="m115 120-10 10"></path>
        </g>
      </svg>
    </div>
  `;
}

function stormScene() {
  return `
    <div class="weather-scene weather-scene--storm">
      <svg viewBox="0 0 160 160" fill="none" aria-hidden="true">
        <g class="weather-scene__cloud weather-scene__cloud--storm">
          <circle cx="62" cy="74" r="20"></circle>
          <circle cx="90" cy="60" r="28"></circle>
          <circle cx="120" cy="78" r="20"></circle>
          <rect x="42" y="76" width="100" height="30" rx="15"></rect>
        </g>
        <path class="weather-scene__bolt" d="m84 102-12 26h14l-8 22 28-34H92l10-14Z"></path>
        <path class="weather-scene__drop weather-scene__drop--storm" style="animation-delay:.1s" d="M60 116c4 8 4 14 0 20"></path>
        <path class="weather-scene__drop weather-scene__drop--storm" style="animation-delay:.45s" d="M116 116c4 8 4 14 0 20"></path>
      </svg>
    </div>
  `;
}

function fogScene() {
  return `
    <div class="weather-scene weather-scene--fog">
      <svg viewBox="0 0 160 160" fill="none" aria-hidden="true">
        <g class="weather-scene__cloud weather-scene__cloud--back">
          <circle cx="60" cy="74" r="18"></circle>
          <circle cx="88" cy="64" r="24"></circle>
          <circle cx="114" cy="78" r="18"></circle>
          <rect x="42" y="78" width="94" height="24" rx="12"></rect>
        </g>
        <path class="weather-scene__mist" d="M36 108h88"></path>
        <path class="weather-scene__mist weather-scene__mist--late" d="M48 122h74"></path>
        <path class="weather-scene__mist" d="M40 136h82"></path>
      </svg>
    </div>
  `;
}

function iconMarkup(type, isDay) {
  switch (type) {
    case "sun":
      return `
        <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
          <circle cx="32" cy="32" r="10" stroke="${isDay ? "#ffbe7a" : "#71d7ff"}" stroke-width="3"></circle>
          <path d="M32 8v8M32 48v8M56 32h-8M16 32H8M48.97 15.03l-5.66 5.66M20.69 43.31l-5.66 5.66M48.97 48.97l-5.66-5.66M20.69 20.69l-5.66-5.66" stroke="${isDay ? "#ffbe7a" : "#71d7ff"}" stroke-width="3" stroke-linecap="round"></path>
        </svg>
      `;
    case "cloudSun":
      return `
        <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
          <circle cx="24" cy="24" r="8" stroke="#ffbe7a" stroke-width="3"></circle>
          <path d="M42 46H21a8 8 0 1 1 2.82-15.49A11 11 0 0 1 45 33a6.5 6.5 0 1 1-3 13Z" stroke="#71d7ff" stroke-width="3" stroke-linejoin="round"></path>
        </svg>
      `;
    case "rain":
      return `
        <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
          <path d="M44 42H21a9 9 0 1 1 3.1-17.45A12 12 0 0 1 47 28a7 7 0 1 1-3 14Z" stroke="#71d7ff" stroke-width="3" stroke-linejoin="round"></path>
          <path d="M24 46l-3 8M34 46l-3 8M44 46l-3 8" stroke="#8ef7d4" stroke-width="3" stroke-linecap="round"></path>
        </svg>
      `;
    case "snow":
      return `
        <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
          <path d="M44 42H21a9 9 0 1 1 3.1-17.45A12 12 0 0 1 47 28a7 7 0 1 1-3 14Z" stroke="#c6ecff" stroke-width="3" stroke-linejoin="round"></path>
          <path d="M24 49h0M32 53h0M40 49h0" stroke="#ffffff" stroke-width="6" stroke-linecap="round"></path>
        </svg>
      `;
    case "storm":
      return `
        <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
          <path d="M44 42H21a9 9 0 1 1 3.1-17.45A12 12 0 0 1 47 28a7 7 0 1 1-3 14Z" stroke="#71d7ff" stroke-width="3" stroke-linejoin="round"></path>
          <path d="m32 45-5 10h5l-3 7 9-13h-5l4-4Z" fill="#ffbe7a"></path>
        </svg>
      `;
    case "fog":
      return `
        <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
          <path d="M44 34H21a9 9 0 1 1 3.1-17.45A12 12 0 0 1 47 20a7 7 0 1 1-3 14Z" stroke="#c6ecff" stroke-width="3" stroke-linejoin="round"></path>
          <path d="M16 46h32M20 52h24" stroke="#c6ecff" stroke-width="3" stroke-linecap="round"></path>
        </svg>
      `;
    default:
      return `
        <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
          <path d="M44 42H21a9 9 0 1 1 3.1-17.45A12 12 0 0 1 47 28a7 7 0 1 1-3 14Z" stroke="#71d7ff" stroke-width="3" stroke-linejoin="round"></path>
        </svg>
      `;
  }
}

async function loadHistory() {
  const payload = await fetchJSON("/api/history?limit=6");
  const items = payload.items || [];

  if (!items.length) {
    elements.historyList.innerHTML = `<p class="history-empty">История пока пустая. Найдите первый населенный пункт.</p>`;
    return items;
  }

  elements.historyList.innerHTML = "";
  items.forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "history-item";
    button.innerHTML = `
      <strong>${item.location_name}</strong>
      <span>${item.display_name}</span>
    `;

    button.addEventListener("click", async () => {
      await fetchForecast({
        name: item.location_name,
        region: item.region,
        country: item.country,
        latitude: item.latitude,
        longitude: item.longitude,
      }, {
        query: item.query,
        save: false,
      });
    });

    elements.historyList.appendChild(button);
  });

  return items;
}

async function bootstrap() {
  try {
    const history = await loadHistory();
    if (history.length) {
      const item = history[0];
      await fetchForecast({
        name: item.location_name,
        region: item.region,
        country: item.country,
        latitude: item.latitude,
        longitude: item.longitude,
      }, {
        query: item.query,
        save: false,
      });
      return;
    }

    const defaults = await searchLocations("Москва");
    if (defaults.length) {
      const first = defaults[0];
      elements.input.value = first.display_name || first.name;
      await fetchForecast(first, { query: "Москва", save: false });
    }
  } catch (error) {
    showError(error);
  }
}

function showError(error) {
  const message = error instanceof Error ? error.message : "Произошла ошибка.";
  elements.currentPlace.textContent = "Не удалось загрузить данные";
  elements.currentSummary.textContent = message;
  elements.forecastGrid.innerHTML = "";
  elements.detailsGrid.innerHTML = "";
  elements.chartCaption.textContent = "Не удалось построить график";
  elements.chartSummary.innerHTML = "";
  elements.chart.innerHTML = "";
}

elements.form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const query = elements.input.value.trim();
  if (!query) {
    return;
  }

  try {
    let target = state.selectedLocation;
    if (!target || !query.includes(target.name)) {
      const items = await searchLocations(query);
      target = items[0];
    }

    if (!target) {
      throw new Error("Населенный пункт не найден. Попробуйте уточнить название.");
    }

    await fetchForecast(target, { query });
    elements.results.hidden = true;
  } catch (error) {
    showError(error);
  }
});

elements.input.addEventListener("input", debounce(async () => {
  const query = elements.input.value.trim();
  state.selectedLocation = null;

  if (query.length < 2) {
    renderSuggestions([]);
    return;
  }

  try {
    const items = await searchLocations(query);
    renderSuggestions(items);
  } catch (error) {
    renderSuggestions([]);
  }
}, 260));

document.addEventListener("click", (event) => {
  if (!elements.results.contains(event.target) && event.target !== elements.input) {
    elements.results.hidden = true;
  }
});

bootstrap();
