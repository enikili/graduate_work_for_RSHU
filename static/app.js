const GEO_FIRST_VISIT_KEY = "aerocast_geo_first_visit_done";
const LANGUAGE_STORAGE_KEY = "aerocast_language";
const DEFAULT_LANGUAGE = "ru";

const translations = {
  ru: {
    locale: "ru-RU",
    searchApi: "ru",
    strings: {
      "brand.copy": "Веб-приложение для прогноза погоды по городу, селу или посёлку с акцентом на осадки, комфорт восприятия и наглядную аналитику.",
      "search.label": "Населённый пункт",
      "search.placeholder": "Например: Казань, Зеленоградск, Таруса",
      "search.submit": "Показать прогноз",
      "search.geoButton": "Моя геопозиция",
      "search.geoLoading": "Определяем...",
      "search.hint": "Поддерживаются города, посёлки, сёла и другие населённые пункты.",
      "current.sectionLabel": "Текущая ситуация",
      "current.loadingTitle": "Загрузка прогноза...",
      "current.loadingSubtitle": "Подбираем первую локацию для демонстрации.",
      "current.selectedLocationFallback": "Выбранная локация",
      "current.feelsLikePrefix": "Ощущается как",
      "current.archiveSummary": "{weather}. Архивный снимок от {time}.",
      "current.precipNow": "Осадки сейчас",
      "current.humidity": "Влажность",
      "current.wind": "Ветер",
      "current.timezone": "Часовой пояс",
      "forecast.sectionLabel": "Прогноз",
      "forecast.title": "Ближайшие 3 дня",
      "forecast.subtitle": "Краткая сводка по температуре, ветру и вероятности осадков.",
      "forecast.precipLabel": "Осадки",
      "forecast.windUpTo": "Ветер до",
      "chart.sectionLabel": "Осадки",
      "chart.title": "Вероятность по часам",
      "chart.defaultCaption": "Показываем вероятность осадков на 72 часа.",
      "chart.unavailableCaption": "Источник прогноза не вернул вероятность осадков для локации: {title}.",
      "chart.unavailableTitle": "Вероятность осадков временно недоступна",
      "chart.unavailableDescription": "Не удалось построить график вероятности осадков для этой локации.",
      "chart.captionLocation": "Почасовой график вероятности осадков для локации: {title}.",
      "chart.summaryPeak": "Пиковая вероятность: {value}%",
      "chart.summaryAverage": "Среднее значение: {value}%",
      "chart.summaryInterval": "Интервал: {value} часов",
      "chart.hoverAria": "График вероятности осадков",
      "details.sectionLabel": "Детали",
      "details.title": "Данные для анализа",
      "details.peakProbability": "Пик вероятности осадков",
      "details.totalPrecip": "Суммарные осадки за 3 дня",
      "details.sunrise": "Восход",
      "details.sunset": "Закат",
      "details.around": "Около {time}",
      "details.today": "Сегодня",
      "details.analyticsNote": "Для сравнения.",
      "map.sectionLabel": "Карта",
      "map.title": "Локация на карте",
      "map.subtitle": "Показываем точку выбранной локации, регион и координаты.",
      "map.captionLocation": "Точка на карте для локации: {title}.",
      "map.region": "Регион",
      "map.country": "Страна",
      "map.coordinates": "Координаты",
      "map.openLink": "Открыть в OpenStreetMap",
      "map.empty": "Карта появится после загрузки прогноза.",
      "map.iframeTitle": "Карта локации: {title}",
      "archive.sectionLabel": "Архив",
      "archive.title": "Погода за 2 недели",
      "archive.subtitle": "Данные за 2 недели открываются в отдельном окне с почасовой детализацией.",
      "archive.empty": "Архив появится после загрузки прогноза для выбранной локации.",
      "archive.openButton": "Открыть архив",
      "archive.modalLabel": "Архив",
      "archive.modalTitle": "Данные за 2 недели",
      "archive.closeButton": "Закрыть",
      "archive.previewText": "Доступен архив за {days} дней: с {start} по {end}.",
      "archive.availableDays": "Дней",
      "archive.wetDays": "Дождливых дней",
      "archive.selected": "Открыто",
      "archive.dayDetails": "Подробно за {date}",
      "archive.maxTemp": "Макс. температура",
      "archive.minTemp": "Мин. температура",
      "archive.totalPrecip": "Осадки за день",
      "archive.wetHours": "Часы с осадками",
      "archive.hourlyTitle": "Почасовые данные",
      "archive.hourlyTemp": "Температура",
      "archive.hourlyPrecip": "Осадки",
      "archive.hourlyEmpty": "Почасовые данные за этот день недоступны.",
      "history.sectionLabel": "История",
      "history.title": "Последние запросы",
      "history.subtitle": "Данные сохраняются в локальной SQLite базе.",
      "history.empty": "История пока пустая. Найдите первый населённый пункт.",
      "footer.author": "Автор: Жуков Александр",
      "geo.unsupported": "Ваш браузер не поддерживает геолокацию.",
      "geo.requesting": "Запрашиваем доступ к геопозиции...",
      "geo.autoRequesting": "Пробуем определить ваше местоположение...",
      "geo.success": "Прогноз построен для текущего местоположения.",
      "geo.inputLabel": "Моя геопозиция",
      "geo.queryLabel": "Геопозиция",
      "geo.permissionDenied": "Доступ к геопозиции запрещён в браузере.",
      "geo.unavailable": "Не удалось определить текущее местоположение.",
      "geo.timeout": "Истекло время ожидания определения геопозиции.",
      "geo.generic": "Не удалось определить геопозицию.",
      "errors.requestFailed": "Запрос завершился ошибкой.",
      "errors.noData": "Нет данных",
      "errors.loadDataTitle": "Не удалось загрузить данные",
      "errors.chartFailed": "Не удалось построить график",
      "errors.generic": "Произошла ошибка.",
      "errors.upstreamTimeout": "Сервис погоды отвечает слишком долго. Попробуйте ещё раз через несколько секунд.",
      "errors.upstreamUnavailable": "Сервис погоды временно недоступен. Попробуйте повторить запрос чуть позже.",
      "errors.upstreamInvalidResponse": "Погодный сервис вернул неполные данные. Попробуйте выбрать другой населённый пункт.",
      "errors.invalidRequest": "Не удалось сформировать запрос. Проверьте выбранный населённый пункт.",
      "errors.internal": "Внутренняя ошибка приложения. Обновите страницу и попробуйте снова.",
      "errors.locationNotFound": "Населённый пункт не найден. Попробуйте уточнить название.",
      "errors.forecastEmpty": "Прогноз на ближайшие дни появится после успешной загрузки данных.",
      "errors.detailsEmpty": "Детальные показатели появятся после успешной загрузки прогноза.",
      "errors.chartEmpty": "График вероятности осадков появится после успешной загрузки прогноза.",
      "defaults.cityQuery": "Москва",
      "units.precip": "мм",
      "units.wind": "км/ч",
      "wind.unknown": "—",
      "weather.clear": "Ясно",
      "weather.mainlyClear": "Преимущественно ясно",
      "weather.partlyCloudy": "Переменная облачность",
      "weather.overcast": "Пасмурно",
      "weather.fog": "Туман",
      "weather.rimeFog": "Изморозь",
      "weather.lightDrizzle": "Слабая морось",
      "weather.drizzle": "Морось",
      "weather.heavyDrizzle": "Сильная морось",
      "weather.freezingDrizzle": "Ледяная морось",
      "weather.heavyFreezingDrizzle": "Сильная ледяная морось",
      "weather.lightRain": "Небольшой дождь",
      "weather.rain": "Дождь",
      "weather.heavyRain": "Сильный дождь",
      "weather.freezingRain": "Ледяной дождь",
      "weather.heavyFreezingRain": "Сильный ледяной дождь",
      "weather.lightSnow": "Небольшой снег",
      "weather.snow": "Снег",
      "weather.heavySnow": "Сильный снег",
      "weather.snowGrains": "Снежная крупа",
      "weather.showers": "Ливень",
      "weather.heavyShowers": "Сильный ливень",
      "weather.snowShowers": "Снежный заряд",
      "weather.heavySnowShowers": "Сильный снежный заряд",
      "weather.thunderstorm": "Гроза",
      "weather.thunderstormHail": "Гроза с градом",
      "weather.heavyThunderstormHail": "Сильная гроза с градом",
    },
  },
  en: {
    locale: "en-GB",
    searchApi: "en",
    strings: {
      "brand.copy": "A weather forecasting web application for cities, villages, and towns with a focus on precipitation, comfort perception, and visual analytics.",
      "search.label": "Location",
      "search.placeholder": "For example: Kazan, Zelenogradsk, Tarusa",
      "search.submit": "Show forecast",
      "search.geoButton": "My location",
      "search.geoLoading": "Locating...",
      "search.hint": "Cities, towns, villages, and other populated places are supported.",
      "current.sectionLabel": "Current conditions",
      "current.loadingTitle": "Loading forecast...",
      "current.loadingSubtitle": "Selecting the first location for the demo.",
      "current.selectedLocationFallback": "Selected location",
      "current.feelsLikePrefix": "Feels like",
      "current.archiveSummary": "{weather}. Archived snapshot from {time}.",
      "current.precipNow": "Precipitation now",
      "current.humidity": "Humidity",
      "current.wind": "Wind",
      "current.timezone": "Time zone",
      "forecast.sectionLabel": "Forecast",
      "forecast.title": "Next 3 days",
      "forecast.subtitle": "A quick summary of temperature, wind, and precipitation probability.",
      "forecast.precipLabel": "Precipitation",
      "forecast.windUpTo": "Wind up to",
      "chart.sectionLabel": "Precipitation",
      "chart.title": "Hourly probability",
      "chart.defaultCaption": "Showing precipitation probability for 72 hours.",
      "chart.unavailableCaption": "The forecast source did not return precipitation probability for: {title}.",
      "chart.unavailableTitle": "Precipitation probability is temporarily unavailable",
      "chart.unavailableDescription": "Unable to build the precipitation probability chart for this location.",
      "chart.captionLocation": "Hourly precipitation probability chart for: {title}.",
      "chart.summaryPeak": "Peak probability: {value}%",
      "chart.summaryAverage": "Average value: {value}%",
      "chart.summaryInterval": "Interval: {value} hours",
      "chart.hoverAria": "Precipitation probability chart",
      "details.sectionLabel": "Details",
      "details.title": "Analysis data",
      "details.peakProbability": "Peak precipitation probability",
      "details.totalPrecip": "Total precipitation for 3 days",
      "details.sunrise": "Sunrise",
      "details.sunset": "Sunset",
      "details.around": "Around {time}",
      "details.today": "Today",
      "details.analyticsNote": "For comparison.",
      "map.sectionLabel": "Map",
      "map.title": "Location on map",
      "map.subtitle": "Showing the selected point, region, and coordinates.",
      "map.captionLocation": "Map point for: {title}.",
      "map.region": "Region",
      "map.country": "Country",
      "map.coordinates": "Coordinates",
      "map.openLink": "Open in OpenStreetMap",
      "map.empty": "The map will appear after the forecast loads.",
      "map.iframeTitle": "Location map: {title}",
      "archive.sectionLabel": "Archive",
      "archive.title": "Weather for 2 weeks",
      "archive.subtitle": "Two-week data opens in a separate window with hourly details.",
      "archive.empty": "The archive will appear after the forecast loads for the selected location.",
      "archive.openButton": "Open archive",
      "archive.modalLabel": "Archive",
      "archive.modalTitle": "Two-week data",
      "archive.closeButton": "Close",
      "archive.previewText": "An archive for {days} days is available: from {start} to {end}.",
      "archive.availableDays": "Days",
      "archive.wetDays": "Wet days",
      "archive.selected": "Open",
      "archive.dayDetails": "Details for {date}",
      "archive.maxTemp": "Max temperature",
      "archive.minTemp": "Min temperature",
      "archive.totalPrecip": "Daily precipitation",
      "archive.wetHours": "Wet hours",
      "archive.hourlyTitle": "Hourly data",
      "archive.hourlyTemp": "Temperature",
      "archive.hourlyPrecip": "Precipitation",
      "archive.hourlyEmpty": "Hourly data is unavailable for this day.",
      "history.sectionLabel": "History",
      "history.title": "Recent queries",
      "history.subtitle": "Data is stored in a local SQLite database.",
      "history.empty": "History is empty for now. Search for your first location.",
      "footer.author": "Author: Zhukov Alexander",
      "geo.unsupported": "Your browser does not support geolocation.",
      "geo.requesting": "Requesting access to your location...",
      "geo.autoRequesting": "Trying to detect your current location...",
      "geo.success": "Forecast loaded for your current location.",
      "geo.inputLabel": "My location",
      "geo.queryLabel": "Geolocation",
      "geo.permissionDenied": "Location access was denied in the browser.",
      "geo.unavailable": "Unable to determine your current location.",
      "geo.timeout": "The geolocation request timed out.",
      "geo.generic": "Unable to determine your location.",
      "errors.requestFailed": "The request failed.",
      "errors.noData": "No data",
      "errors.loadDataTitle": "Failed to load data",
      "errors.chartFailed": "Unable to render the chart",
      "errors.generic": "Something went wrong.",
      "errors.upstreamTimeout": "The weather service is responding too slowly. Please try again in a few seconds.",
      "errors.upstreamUnavailable": "The weather service is temporarily unavailable. Please try again a little later.",
      "errors.upstreamInvalidResponse": "The weather service returned incomplete data. Try another location.",
      "errors.invalidRequest": "The request could not be prepared. Check the selected location.",
      "errors.internal": "The app hit an internal error. Refresh the page and try again.",
      "errors.locationNotFound": "Location not found. Try refining the name.",
      "errors.forecastEmpty": "The 1-3 day forecast will appear after the data loads successfully.",
      "errors.detailsEmpty": "Detailed metrics will appear after the forecast loads successfully.",
      "errors.chartEmpty": "The precipitation probability chart will appear after the forecast loads successfully.",
      "defaults.cityQuery": "Moscow",
      "units.precip": "mm",
      "units.wind": "km/h",
      "wind.unknown": "—",
      "weather.clear": "Clear",
      "weather.mainlyClear": "Mostly clear",
      "weather.partlyCloudy": "Partly cloudy",
      "weather.overcast": "Overcast",
      "weather.fog": "Fog",
      "weather.rimeFog": "Rime fog",
      "weather.lightDrizzle": "Light drizzle",
      "weather.drizzle": "Drizzle",
      "weather.heavyDrizzle": "Heavy drizzle",
      "weather.freezingDrizzle": "Freezing drizzle",
      "weather.heavyFreezingDrizzle": "Heavy freezing drizzle",
      "weather.lightRain": "Light rain",
      "weather.rain": "Rain",
      "weather.heavyRain": "Heavy rain",
      "weather.freezingRain": "Freezing rain",
      "weather.heavyFreezingRain": "Heavy freezing rain",
      "weather.lightSnow": "Light snow",
      "weather.snow": "Snow",
      "weather.heavySnow": "Heavy snow",
      "weather.snowGrains": "Snow grains",
      "weather.showers": "Showers",
      "weather.heavyShowers": "Heavy showers",
      "weather.snowShowers": "Snow showers",
      "weather.heavySnowShowers": "Heavy snow showers",
      "weather.thunderstorm": "Thunderstorm",
      "weather.thunderstormHail": "Thunderstorm with hail",
      "weather.heavyThunderstormHail": "Severe thunderstorm with hail",
    },
  },
  zh: {
    locale: "zh-CN",
    searchApi: "zh",
    strings: {
      "brand.copy": "一个用于城市、村庄和其他居民点天气预报的 Web 应用，重点展示降水、体感舒适度和可视化分析。",
      "search.label": "地点",
      "search.placeholder": "例如：喀山、泽列诺格勒斯克、塔鲁萨",
      "search.submit": "查看预报",
      "search.geoButton": "我的位置",
      "search.geoLoading": "定位中...",
      "search.hint": "支持城市、城镇、村庄及其他居民点。",
      "current.sectionLabel": "当前天气",
      "current.loadingTitle": "正在加载预报...",
      "current.loadingSubtitle": "正在为演示选择第一个地点。",
      "current.selectedLocationFallback": "已选地点",
      "current.feelsLikePrefix": "体感",
      "current.archiveSummary": "{weather}。归档快照保存于 {time}。",
      "current.precipNow": "当前降水",
      "current.humidity": "湿度",
      "current.wind": "风速",
      "current.timezone": "时区",
      "forecast.sectionLabel": "预报",
      "forecast.title": "未来 3 天",
      "forecast.subtitle": "温度、风和降水概率的简要概览。",
      "forecast.precipLabel": "降水",
      "forecast.windUpTo": "风速最高",
      "chart.sectionLabel": "降水",
      "chart.title": "逐小时概率",
      "chart.defaultCaption": "显示未来 72 小时的降水概率。",
      "chart.unavailableCaption": "预报源未返回 {title} 的降水概率数据。",
      "chart.unavailableTitle": "降水概率暂时不可用",
      "chart.unavailableDescription": "无法为该地点构建降水概率图表。",
      "chart.captionLocation": "{title} 的逐小时降水概率图。",
      "chart.summaryPeak": "峰值概率：{value}%",
      "chart.summaryAverage": "平均值：{value}%",
      "chart.summaryInterval": "区间：{value} 小时",
      "chart.hoverAria": "降水概率图表",
      "details.sectionLabel": "详情",
      "details.title": "分析数据",
      "details.peakProbability": "降水概率峰值",
      "details.totalPrecip": "3 天总降水量",
      "details.sunrise": "日出",
      "details.sunset": "日落",
      "details.around": "约 {time}",
      "details.today": "今天",
      "details.analyticsNote": "便于对比。",
      "map.sectionLabel": "地图",
      "map.title": "地图中的地点",
      "map.subtitle": "显示所选地点的位置、地区和坐标。",
      "map.captionLocation": "{title} 的地图位置。",
      "map.region": "地区",
      "map.country": "国家",
      "map.coordinates": "坐标",
      "map.openLink": "在 OpenStreetMap 中打开",
      "map.empty": "预报加载成功后，这里会显示地图。",
      "map.iframeTitle": "{title} 的位置地图",
      "archive.sectionLabel": "归档",
      "archive.title": "近两周天气",
      "archive.subtitle": "两周数据会在独立窗口中打开，并显示逐小时详情。",
      "archive.empty": "成功加载所选地点的预报后，这里会显示历史归档。",
      "archive.openButton": "打开归档",
      "archive.modalLabel": "归档",
      "archive.modalTitle": "两周数据",
      "archive.closeButton": "关闭",
      "archive.previewText": "已提供 {days} 天归档：从 {start} 到 {end}。",
      "archive.availableDays": "天数",
      "archive.wetDays": "降水天数",
      "archive.selected": "已打开",
      "archive.dayDetails": "{date} 的详情",
      "archive.maxTemp": "最高气温",
      "archive.minTemp": "最低气温",
      "archive.totalPrecip": "当日降水",
      "archive.wetHours": "有降水的小时数",
      "archive.hourlyTitle": "逐小时数据",
      "archive.hourlyTemp": "温度",
      "archive.hourlyPrecip": "降水",
      "archive.hourlyEmpty": "该日期没有可用的逐小时数据。",
      "history.sectionLabel": "历史",
      "history.title": "最近查询",
      "history.subtitle": "数据保存在本地 SQLite 数据库中。",
      "history.empty": "历史记录为空。请先搜索一个地点。",
      "footer.author": "作者：Жуков Александр",
      "geo.unsupported": "您的浏览器不支持地理定位。",
      "geo.requesting": "正在请求定位权限...",
      "geo.autoRequesting": "正在尝试获取您的当前位置...",
      "geo.success": "已为当前位置加载预报。",
      "geo.inputLabel": "我的位置",
      "geo.queryLabel": "地理定位",
      "geo.permissionDenied": "浏览器已禁止定位权限。",
      "geo.unavailable": "无法确定当前位置。",
      "geo.timeout": "获取定位超时。",
      "geo.generic": "无法确定您的位置。",
      "errors.requestFailed": "请求失败。",
      "errors.noData": "无数据",
      "errors.loadDataTitle": "无法加载数据",
      "errors.chartFailed": "无法绘制图表",
      "errors.generic": "发生错误。",
      "errors.upstreamTimeout": "天气服务响应过慢，请几秒后重试。",
      "errors.upstreamUnavailable": "天气服务暂时不可用，请稍后再试。",
      "errors.upstreamInvalidResponse": "天气服务返回的数据不完整，请尝试其他地点。",
      "errors.invalidRequest": "无法构建请求，请检查所选地点。",
      "errors.internal": "应用发生内部错误，请刷新页面后重试。",
      "errors.locationNotFound": "未找到该地点，请尝试进一步完善名称。",
      "errors.forecastEmpty": "数据成功加载后，这里会显示未来 1-3 天的预报。",
      "errors.detailsEmpty": "预报成功加载后，这里会显示详细指标。",
      "errors.chartEmpty": "预报成功加载后，这里会显示降水概率图表。",
      "defaults.cityQuery": "莫斯科",
      "units.precip": "毫米",
      "units.wind": "公里/时",
      "wind.unknown": "—",
      "weather.clear": "晴朗",
      "weather.mainlyClear": "大致晴朗",
      "weather.partlyCloudy": "局部多云",
      "weather.overcast": "阴天",
      "weather.fog": "有雾",
      "weather.rimeFog": "冻雾",
      "weather.lightDrizzle": "小毛毛雨",
      "weather.drizzle": "毛毛雨",
      "weather.heavyDrizzle": "强毛毛雨",
      "weather.freezingDrizzle": "冻毛毛雨",
      "weather.heavyFreezingDrizzle": "强冻毛毛雨",
      "weather.lightRain": "小雨",
      "weather.rain": "降雨",
      "weather.heavyRain": "大雨",
      "weather.freezingRain": "冻雨",
      "weather.heavyFreezingRain": "强冻雨",
      "weather.lightSnow": "小雪",
      "weather.snow": "降雪",
      "weather.heavySnow": "大雪",
      "weather.snowGrains": "米雪",
      "weather.showers": "阵雨",
      "weather.heavyShowers": "强阵雨",
      "weather.snowShowers": "阵雪",
      "weather.heavySnowShowers": "强阵雪",
      "weather.thunderstorm": "雷暴",
      "weather.thunderstormHail": "伴有冰雹的雷暴",
      "weather.heavyThunderstormHail": "强雷暴伴冰雹",
    },
  },
};

const state = {
  selectedLocation: null,
  currentLanguage: getStoredLanguage(),
  lastForecastPayload: null,
  lastForecastMeta: {},
  lastError: null,
  archiveDays: [],
  activeArchiveDate: "",
  isArchiveModalOpen: false,
};

const elements = {
  form: document.querySelector("#search-form"),
  input: document.querySelector("#location-input"),
  geoButton: document.querySelector("#geo-button"),
  geoStatus: document.querySelector("#geo-status"),
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
  mapCaption: document.querySelector("#map-caption"),
  mapSummary: document.querySelector("#map-summary"),
  mapFrame: document.querySelector("#map-frame"),
  mapLink: document.querySelector("#map-link"),
  detailsGrid: document.querySelector("#details-grid"),
  archivePreview: document.querySelector("#archive-preview"),
  archiveOpenButton: document.querySelector("#archive-open-button"),
  archiveModal: document.querySelector("#archive-modal"),
  archiveModalClose: document.querySelector("#archive-modal-close"),
  archiveList: document.querySelector("#archive-list"),
  archiveView: document.querySelector("#archive-view"),
  historyList: document.querySelector("#history-list"),
  languageButtons: document.querySelectorAll("[data-lang-switch]"),
};

const weatherCatalog = {
  0: { labelKey: "weather.clear", icon: "sun" },
  1: { labelKey: "weather.mainlyClear", icon: "sun" },
  2: { labelKey: "weather.partlyCloudy", icon: "cloudSun" },
  3: { labelKey: "weather.overcast", icon: "cloud" },
  45: { labelKey: "weather.fog", icon: "fog" },
  48: { labelKey: "weather.rimeFog", icon: "fog" },
  51: { labelKey: "weather.lightDrizzle", icon: "rain" },
  53: { labelKey: "weather.drizzle", icon: "rain" },
  55: { labelKey: "weather.heavyDrizzle", icon: "rain" },
  56: { labelKey: "weather.freezingDrizzle", icon: "rain" },
  57: { labelKey: "weather.heavyFreezingDrizzle", icon: "rain" },
  61: { labelKey: "weather.lightRain", icon: "rain" },
  63: { labelKey: "weather.rain", icon: "rain" },
  65: { labelKey: "weather.heavyRain", icon: "rain" },
  66: { labelKey: "weather.freezingRain", icon: "rain" },
  67: { labelKey: "weather.heavyFreezingRain", icon: "rain" },
  71: { labelKey: "weather.lightSnow", icon: "snow" },
  73: { labelKey: "weather.snow", icon: "snow" },
  75: { labelKey: "weather.heavySnow", icon: "snow" },
  77: { labelKey: "weather.snowGrains", icon: "snow" },
  80: { labelKey: "weather.showers", icon: "rain" },
  81: { labelKey: "weather.showers", icon: "rain" },
  82: { labelKey: "weather.heavyShowers", icon: "storm" },
  85: { labelKey: "weather.snowShowers", icon: "snow" },
  86: { labelKey: "weather.heavySnowShowers", icon: "snow" },
  95: { labelKey: "weather.thunderstorm", icon: "storm" },
  96: { labelKey: "weather.thunderstormHail", icon: "storm" },
  99: { labelKey: "weather.heavyThunderstormHail", icon: "storm" },
};

function getStoredLanguage() {
  try {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored && translations[stored]) {
      return stored;
    }
  } catch (error) {
    // Ignore storage errors.
  }

  return DEFAULT_LANGUAGE;
}

function saveLanguage(language) {
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch (error) {
    // Ignore storage errors.
  }
}

function getTranslationBundle(language = state.currentLanguage) {
  return translations[language] || translations[DEFAULT_LANGUAGE];
}

function t(key, replacements = {}) {
  const bundle = getTranslationBundle();
  const fallback = translations[DEFAULT_LANGUAGE];
  const template = bundle.strings[key] || fallback.strings[key] || key;
  return template.replace(/\{(\w+)\}/g, (_, name) => (replacements[name] ?? `{${name}}`));
}

function getCurrentLocale() {
  return getTranslationBundle().locale;
}

function getSearchLanguage() {
  return getTranslationBundle().searchApi;
}

function escapeHTML(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function debounce(callback, delay = 280) {
  let timeoutId;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => callback(...args), delay);
  };
}

function applyLanguage(language, options = {}) {
  if (!translations[language]) {
    return;
  }

  state.currentLanguage = language;
  saveLanguage(language);
  document.documentElement.lang = language === "zh" ? "zh-CN" : language;
  elements.input.setAttribute("lang", document.documentElement.lang);

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    node.setAttribute("placeholder", t(node.dataset.i18nPlaceholder));
  });

  elements.languageButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.langSwitch === language);
  });

  if (elements.geoButton && !elements.geoButton.disabled) {
    elements.geoButton.textContent = t("search.geoButton");
  }

  if (!state.lastForecastPayload) {
    if (state.lastError) {
      showError(state.lastError);
    } else {
      elements.currentPlace.textContent = t("current.loadingTitle");
      elements.currentSummary.textContent = t("current.loadingSubtitle");
      elements.feelsLike.textContent = `${t("current.feelsLikePrefix")} --`;
      elements.chartCaption.textContent = t("chart.defaultCaption");
      renderMapEmpty();
    }
  } else {
    renderForecast(state.lastForecastPayload, state.lastForecastMeta);
  }

  renderArchiveSection();

  elements.input.value = "";
  elements.results.innerHTML = "";
  elements.results.hidden = true;
  state.selectedLocation = null;
  setGeoStatus("");

  if (!options.skipHistoryRefresh) {
    loadHistory().catch(() => {
      // Ignore history refresh issues during language switch.
    });
  }
}

function getWeatherMeta(code) {
  const meta = weatherCatalog[code] || { labelKey: "errors.noData", icon: "cloud" };
  return {
    label: t(meta.labelKey),
    icon: meta.icon,
  };
}

function formatTemperature(value) {
  if (!Number.isFinite(value)) {
    return t("errors.noData");
  }
  return `${Math.round(value)}°`;
}

function formatPrecip(value) {
  if (!Number.isFinite(value)) {
    return t("errors.noData");
  }
  return `${Number(value).toFixed(1)} ${t("units.precip")}`;
}

function formatProbability(value) {
  if (!Number.isFinite(value)) {
    return t("errors.noData");
  }
  return `${Math.round(value)}%`;
}

function formatWind(speed, direction) {
  if (!Number.isFinite(speed)) {
    return t("errors.noData");
  }
  return `${Math.round(speed)} ${t("units.wind")}, ${windDirectionLabel(direction)}`;
}

function windDirectionLabel(direction) {
  if (!Number.isFinite(direction)) {
    return t("wind.unknown");
  }

  const sectorsByLanguage = {
    ru: ["С", "СВ", "В", "ЮВ", "Ю", "ЮЗ", "З", "СЗ"],
    en: ["N", "NE", "E", "SE", "S", "SW", "W", "NW"],
    zh: ["北", "东北", "东", "东南", "南", "西南", "西", "西北"],
  };

  const sectors = sectorsByLanguage[state.currentLanguage] || sectorsByLanguage.ru;
  const normalized = ((direction % 360) + 360) % 360;
  return sectors[Math.round(normalized / 45) % 8];
}

function formatDay(dateText) {
  if (!dateText) {
    return t("errors.noData");
  }

  const date = new Date(`${dateText}T12:00:00`);
  if (Number.isNaN(date.getTime())) {
    return t("errors.noData");
  }

  return new Intl.DateTimeFormat(getCurrentLocale(), {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(date);
}

function formatHour(dateText) {
  if (!dateText) {
    return t("errors.noData");
  }

  const date = new Date(dateText);
  if (Number.isNaN(date.getTime())) {
    return t("errors.noData");
  }

  return new Intl.DateTimeFormat(getCurrentLocale(), {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function compactDayLabel(timeText) {
  if (!timeText) {
    return t("errors.noData");
  }

  const date = new Date(timeText);
  if (Number.isNaN(date.getTime())) {
    return t("errors.noData");
  }

  return new Intl.DateTimeFormat(getCurrentLocale(), {
    weekday: "short",
    day: "numeric",
  }).format(date);
}

function formatTooltipDateTime(timeText) {
  if (!timeText) {
    return t("errors.noData");
  }

  const date = new Date(timeText);
  if (Number.isNaN(date.getTime())) {
    return t("errors.noData");
  }

  return new Intl.DateTimeFormat(getCurrentLocale(), {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function shortTime(dateText) {
  if (!dateText) {
    return t("errors.noData");
  }

  const date = new Date(dateText);
  if (Number.isNaN(date.getTime())) {
    return t("errors.noData");
  }

  return new Intl.DateTimeFormat(getCurrentLocale(), {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function composeLocationTitle(location) {
  return [location?.name, location?.region, location?.country]
    .filter(Boolean)
    .filter((item, index, array) => array.indexOf(item) === index)
    .join(", ");
}

function parseStoredDateTime(value) {
  if (!value) {
    return null;
  }

  const normalized = value.includes("T") ? value : value.replace(" ", "T");
  const utcCandidate = normalized.endsWith("Z") ? normalized : `${normalized}Z`;
  const utcDate = new Date(utcCandidate);
  if (!Number.isNaN(utcDate.getTime())) {
    return utcDate;
  }

  const fallbackDate = new Date(value);
  if (!Number.isNaN(fallbackDate.getTime())) {
    return fallbackDate;
  }

  return null;
}

function formatStoredDateTime(value) {
  const date = parseStoredDateTime(value);
  if (!date) {
    return t("errors.noData");
  }

  return new Intl.DateTimeFormat(getCurrentLocale(), {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function formatCoordinates(latitude, longitude) {
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return t("errors.noData");
  }

  return `${Number(latitude).toFixed(3)}, ${Number(longitude).toFixed(3)}`;
}

function buildMapURLs(location) {
  const latitude = Number(location?.latitude);
  const longitude = Number(location?.longitude);
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return null;
  }

  const latDelta = 0.22;
  const longitudeScale = Math.max(Math.cos((latitude * Math.PI) / 180), 0.35);
  const lonDelta = 0.22 / longitudeScale;
  const params = new URLSearchParams({
    bbox: [
      (longitude - lonDelta).toFixed(6),
      (latitude - latDelta).toFixed(6),
      (longitude + lonDelta).toFixed(6),
      (latitude + latDelta).toFixed(6),
    ].join(","),
    layer: "mapnik",
    marker: `${latitude.toFixed(6)},${longitude.toFixed(6)}`,
  });

  return {
    embedURL: `https://www.openstreetmap.org/export/embed.html?${params.toString()}`,
    externalURL: `https://www.openstreetmap.org/?mlat=${latitude.toFixed(6)}&mlon=${longitude.toFixed(6)}#map=9/${latitude.toFixed(6)}/${longitude.toFixed(6)}`,
  };
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

function renderPanelEmpty(container, message) {
  container.innerHTML = `
    <div class="panel-empty">
      <p>${escapeHTML(message)}</p>
    </div>
  `;
}

function renderMapEmpty(message = t("map.empty")) {
  elements.mapCaption.textContent = t("map.subtitle");
  elements.mapSummary.innerHTML = "";
  renderPanelEmpty(elements.mapFrame, message);
  if (elements.mapLink) {
    elements.mapLink.hidden = true;
    elements.mapLink.removeAttribute("href");
  }
}

function renderMap(location, forecast) {
  const mapURLs = buildMapURLs(location);
  const locationTitle = composeLocationTitle(location) || t("current.selectedLocationFallback");
  if (!mapURLs) {
    renderMapEmpty();
    return;
  }

  elements.mapCaption.textContent = t("map.captionLocation", { title: locationTitle });
  elements.mapSummary.innerHTML = `
    <article class="map-chip">
      <span>${escapeHTML(t("map.region"))}</span>
      <strong>${escapeHTML(location.region || t("errors.noData"))}</strong>
    </article>
    <article class="map-chip">
      <span>${escapeHTML(t("map.country"))}</span>
      <strong>${escapeHTML(location.country || t("errors.noData"))}</strong>
    </article>
    <article class="map-chip map-chip--wide">
      <span>${escapeHTML(t("map.coordinates"))}</span>
      <strong>${escapeHTML(formatCoordinates(location.latitude, location.longitude))}</strong>
    </article>
    <article class="map-chip">
      <span>${escapeHTML(t("current.timezone"))}</span>
      <strong>${escapeHTML(forecast?.timezone || t("errors.noData"))}</strong>
    </article>
  `;
  elements.mapFrame.innerHTML = `
    <iframe
      src="${escapeHTML(mapURLs.embedURL)}"
      title="${escapeHTML(t("map.iframeTitle", { title: locationTitle }))}"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
    ></iframe>
  `;

  if (elements.mapLink) {
    elements.mapLink.hidden = false;
    elements.mapLink.href = mapURLs.externalURL;
    elements.mapLink.textContent = t("map.openLink");
  }
}

function openArchiveModal() {
  if (!elements.archiveModal || !state.archiveDays.length) {
    return;
  }

  state.isArchiveModalOpen = true;
  elements.archiveModal.hidden = false;
  document.body.classList.add("modal-open");
}

function closeArchiveModal() {
  if (!elements.archiveModal) {
    return;
  }

  state.isArchiveModalOpen = false;
  elements.archiveModal.hidden = true;
  document.body.classList.remove("modal-open");
}

function getWetHoursCount(day) {
  const hourly = Array.isArray(day?.hourly) ? day.hourly : [];
  return hourly.filter((item) => Number(item?.precipitation) > 0.05).length;
}

function formatArchiveDate(dateText) {
  if (!dateText) {
    return t("errors.noData");
  }

  const date = new Date(`${dateText}T12:00:00`);
  if (Number.isNaN(date.getTime())) {
    return t("errors.noData");
  }

  return new Intl.DateTimeFormat(getCurrentLocale(), {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(date);
}

function getActiveArchiveDay() {
  if (!state.archiveDays.length) {
    return null;
  }

  return state.archiveDays.find((day) => day.date === state.activeArchiveDate) || state.archiveDays[0];
}

function renderArchivePreview(days) {
  if (!elements.archivePreview || !elements.archiveOpenButton) {
    return;
  }

  if (!days.length) {
    elements.archivePreview.innerHTML = `
      <div class="archive-preview__empty">
        <p>${escapeHTML(t("archive.empty"))}</p>
      </div>
    `;
    elements.archiveOpenButton.disabled = true;
    return;
  }

  const firstDay = days[days.length - 1];
  const lastDay = days[0];
  const wetDays = days.filter((day) => Number(day?.precipitation_sum) > 0.05).length;

  elements.archivePreview.innerHTML = `
    <p class="archive-preview__text">${escapeHTML(t("archive.previewText", {
      days: String(days.length),
      start: formatArchiveDate(firstDay.date),
      end: formatArchiveDate(lastDay.date),
    }))}</p>
    <div class="archive-preview__stats">
      <article class="archive-preview__card">
        <span>${escapeHTML(t("archive.availableDays"))}</span>
        <strong>${escapeHTML(String(days.length))}</strong>
      </article>
      <article class="archive-preview__card">
        <span>${escapeHTML(t("archive.wetDays"))}</span>
        <strong>${escapeHTML(String(wetDays))}</strong>
      </article>
      <article class="archive-preview__card">
        <span>${escapeHTML(t("archive.totalPrecip"))}</span>
        <strong>${escapeHTML(formatPrecip(days.reduce((sum, day) => sum + (Number(day?.precipitation_sum) || 0), 0)))}</strong>
      </article>
    </div>
  `;
  elements.archiveOpenButton.disabled = false;
}

function renderArchiveSection() {
  if (!state.archiveDays.length && state.isArchiveModalOpen) {
    closeArchiveModal();
  }

  renderArchivePreview(state.archiveDays);
  renderArchiveList(state.archiveDays, state.activeArchiveDate);
  renderArchiveDetail(getActiveArchiveDay());
}

function renderArchiveList(days, activeDate = state.activeArchiveDate) {
  if (!days.length) {
    elements.archiveList.innerHTML = `<p class="archive-empty">${escapeHTML(t("archive.empty"))}</p>`;
    return;
  }

  elements.archiveList.innerHTML = "";
  days.forEach((day) => {
    const meta = getWeatherMeta(day.weather_code);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "archive-item";
    button.classList.toggle("is-active", day.date === activeDate);
    button.innerHTML = `
      <div class="archive-item__head">
        <div>
          <strong>${escapeHTML(formatArchiveDate(day.date))}</strong>
          <span>${escapeHTML(meta.label)}</span>
        </div>
        ${day.date === activeDate ? `<span class="archive-item__stamp">${escapeHTML(t("archive.selected"))}</span>` : ""}
      </div>
      <div class="archive-item__stats">
        <span>
          <small>${escapeHTML(t("archive.maxTemp"))}</small>
          <strong>${escapeHTML(formatTemperature(day.temperature_max))}</strong>
        </span>
        <span>
          <small>${escapeHTML(t("archive.minTemp"))}</small>
          <strong>${escapeHTML(formatTemperature(day.temperature_min))}</strong>
        </span>
        <span>
          <small>${escapeHTML(t("archive.totalPrecip"))}</small>
          <strong>${escapeHTML(formatPrecip(day.precipitation_sum))}</strong>
        </span>
      </div>
    `;

    button.addEventListener("click", () => {
      state.activeArchiveDate = day.date;
      renderArchiveSection();
    });

    elements.archiveList.appendChild(button);
  });
}

function renderArchiveDetail(day) {
  if (!day) {
    renderPanelEmpty(elements.archiveView, t("archive.empty"));
    return;
  }

  const meta = getWeatherMeta(day.weather_code);
  const hourly = Array.isArray(day.hourly) ? day.hourly.filter((item) => item?.time) : [];
  const wetHours = getWetHoursCount(day);

  elements.archiveView.innerHTML = `
    <div class="archive-detail-head">
      <div>
        <p class="section-label">${escapeHTML(t("archive.hourlyTitle"))}</p>
        <h4>${escapeHTML(t("archive.dayDetails", { date: formatArchiveDate(day.date) }))}</h4>
        <p class="section-subtitle">${escapeHTML(meta.label)}</p>
      </div>
    </div>
    <div class="archive-detail-grid">
      <article class="archive-detail-card">
        <span>${escapeHTML(t("archive.maxTemp"))}</span>
        <strong>${escapeHTML(formatTemperature(day.temperature_max))}</strong>
      </article>
      <article class="archive-detail-card">
        <span>${escapeHTML(t("archive.minTemp"))}</span>
        <strong>${escapeHTML(formatTemperature(day.temperature_min))}</strong>
      </article>
      <article class="archive-detail-card">
        <span>${escapeHTML(t("archive.totalPrecip"))}</span>
        <strong>${escapeHTML(formatPrecip(day.precipitation_sum))}</strong>
      </article>
      <article class="archive-detail-card">
        <span>${escapeHTML(t("archive.wetHours"))}</span>
        <strong>${escapeHTML(String(wetHours))}</strong>
      </article>
    </div>
    <div class="archive-hourly-block">
      <p class="archive-hourly-title">${escapeHTML(t("archive.hourlyTitle"))}</p>
      <div class="archive-hourly-grid">
        ${hourly.length ? hourly.map((item) => `
          <article class="archive-hour-card ${Number(item.precipitation) > 0.05 ? "archive-hour-card--wet" : ""}">
            <span class="archive-hour-card__time">${escapeHTML(formatHour(item.time))}</span>
            <strong>${escapeHTML(formatTemperature(item.temperature))}</strong>
            <span class="archive-hour-card__metric">${escapeHTML(t("archive.hourlyPrecip"))}: ${escapeHTML(formatPrecip(item.precipitation))}</span>
          </article>
        `).join("") : `
          <div class="panel-empty">
            <p>${escapeHTML(t("archive.hourlyEmpty"))}</p>
          </div>
        `}
      </div>
    </div>
  `;
}

function scrollToTopSmooth() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function markGeoFirstVisitHandled() {
  try {
    window.localStorage.setItem(GEO_FIRST_VISIT_KEY, "1");
  } catch (error) {
    // Ignore storage issues and keep the rest of the app working.
  }
}

function shouldAutoUseGeolocation() {
  try {
    return window.localStorage.getItem(GEO_FIRST_VISIT_KEY) !== "1";
  } catch (error) {
    return true;
  }
}

function setGeoStatus(message, isError = false) {
  if (!elements.geoStatus) {
    return;
  }

  if (!message) {
    elements.geoStatus.hidden = true;
    elements.geoStatus.textContent = "";
    elements.geoStatus.classList.remove("is-error");
    return;
  }

  elements.geoStatus.hidden = false;
  elements.geoStatus.textContent = message;
  elements.geoStatus.classList.toggle("is-error", isError);
}

function setGeoButtonLoading(isLoading) {
  if (!elements.geoButton) {
    return;
  }

  elements.geoButton.disabled = isLoading;
  elements.geoButton.textContent = isLoading ? t("search.geoLoading") : t("search.geoButton");
}

function getGeolocationErrorMessage(error) {
  if (!error || typeof error.code !== "number") {
    return t("geo.generic");
  }

  switch (error.code) {
    case 1:
      return t("geo.permissionDenied");
    case 2:
      return t("geo.unavailable");
    case 3:
      return t("geo.timeout");
    default:
      return t("geo.generic");
  }
}

async function requestCurrentPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000,
    });
  });
}

async function useCurrentLocation(options = {}) {
  const auto = options.auto === true;

  if (!("geolocation" in navigator)) {
    if (auto) {
      setGeoStatus("");
    } else {
      setGeoStatus(t("geo.unsupported"), true);
    }
    return false;
  }

  setGeoButtonLoading(true);
  setGeoStatus(auto ? t("geo.autoRequesting") : t("geo.requesting"));

  try {
    const position = await requestCurrentPosition();
    let location = {
      name: t("geo.inputLabel"),
      region: "",
      country: "",
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };

    try {
      const resolvedLocation = await reverseGeocodeLocation(
        position.coords.latitude,
        position.coords.longitude,
      );
      if (resolvedLocation?.name) {
        location = resolvedLocation;
      }
    } catch (error) {
      // Fall back to a generic label if reverse geocoding is unavailable.
    }

    elements.results.hidden = true;
    elements.input.value = location.display_name || location.name || t("geo.inputLabel");
    state.selectedLocation = location;
    if (!auto) {
      scrollToTopSmooth();
    }
    await fetchForecast(location, {
      query: location.display_name || location.name || t("geo.queryLabel"),
      save: false,
    });
    setGeoStatus(auto ? "" : t("geo.success"));
    return true;
  } catch (error) {
    if (auto) {
      setGeoStatus("");
    } else {
      setGeoStatus(getGeolocationErrorMessage(error), true);
    }
    return false;
  } finally {
    setGeoButtonLoading(false);
  }
}

async function fetchJSON(url) {
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
  });
  const contentType = response.headers.get("content-type") || "";
  let payload = null;

  if (contentType.includes("application/json")) {
    try {
      payload = await response.json();
    } catch (error) {
      payload = null;
    }
  } else {
    const message = await response.text();
    payload = message ? { error: message } : null;
  }

  if (!response.ok) {
    const error = new Error(payload?.error || t("errors.requestFailed"));
    if (payload?.code) {
      error.code = payload.code;
    }
    throw error;
  }

  return payload || {};
}

async function searchLocations(query) {
  const payload = await fetchJSON(`/api/search?q=${encodeURIComponent(query)}&lang=${encodeURIComponent(getSearchLanguage())}`);
  return payload.results || [];
}

async function reverseGeocodeLocation(latitude, longitude) {
  return fetchJSON(
    `/api/reverse-geocode?lat=${encodeURIComponent(latitude)}&lon=${encodeURIComponent(longitude)}&lang=${encodeURIComponent(getSearchLanguage())}`,
  );
}

async function loadArchive(location) {
  const latitude = Number(location?.latitude);
  const longitude = Number(location?.longitude);
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    state.archiveDays = [];
    state.activeArchiveDate = "";
    renderArchiveSection();
    return [];
  }

  const params = new URLSearchParams({
    lat: String(latitude),
    lon: String(longitude),
    name: location?.name || "",
    region: location?.region || "",
    country: location?.country || "",
    days: "14",
    lang: getSearchLanguage(),
  });
  const payload = await fetchJSON(
    `/api/archive?${params.toString()}`,
  );
  const days = Array.isArray(payload.days) ? payload.days : [];
  state.archiveDays = days;
  state.activeArchiveDate = days[0]?.date || "";
  renderArchiveSection();
  return days;
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
    lang: getSearchLanguage(),
  });

  const payload = await fetchJSON(`/api/forecast?${params.toString()}`);
  state.activeArchiveDate = "";
  state.selectedLocation = {
    name: payload.location.name,
    region: payload.location.region,
    country: payload.location.country,
    latitude: payload.location.latitude,
    longitude: payload.location.longitude,
  };
  renderForecast(payload);

  const [historyResult, archiveResult] = await Promise.allSettled([
    loadHistory(),
    loadArchive(payload.location),
  ]);

  if (historyResult.status === "rejected") {
    console.error(historyResult.reason);
  }

  if (archiveResult.status === "rejected") {
    console.error(archiveResult.reason);
    state.archiveDays = [];
    state.activeArchiveDate = "";
    renderArchiveSection();
  }
}

function getDisplayErrorMessage(error) {
  const messagesByCode = {
    upstream_timeout: t("errors.upstreamTimeout"),
    upstream_unavailable: t("errors.upstreamUnavailable"),
    upstream_invalid_response: t("errors.upstreamInvalidResponse"),
    invalid_request: t("errors.invalidRequest"),
    internal_error: t("errors.internal"),
  };

  if (error && typeof error === "object" && typeof error.code === "string" && messagesByCode[error.code]) {
    return messagesByCode[error.code];
  }

  if (error instanceof TypeError) {
    return t("errors.upstreamUnavailable");
  }

  return error instanceof Error ? error.message : t("errors.generic");
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
        <span class="result-title">${escapeHTML(item.name)}</span>
        <span class="result-meta">${escapeHTML(item.display_name || item.country || "")}</span>
      </span>
      <span class="result-meta">${escapeHTML(Math.round(item.latitude * 10) / 10)}, ${escapeHTML(Math.round(item.longitude * 10) / 10)}</span>
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

function renderForecast(payload, meta = {}) {
  state.lastForecastPayload = payload;
  state.lastForecastMeta = meta;
  state.lastError = null;

  const forecast = payload.forecast;
  const location = payload.location;
  const currentMeta = getWeatherMeta(forecast.current.weather_code);
  const locationTitle = composeLocationTitle(location);

  elements.currentPlace.textContent = locationTitle || t("current.selectedLocationFallback");
  elements.currentSummary.textContent = meta.archivedAt
    ? t("current.archiveSummary", {
      weather: currentMeta.label,
      time: formatStoredDateTime(meta.archivedAt),
    })
    : currentMeta.label;
  elements.currentIcon.innerHTML = currentSceneMarkup(currentMeta.icon, forecast.current.is_day === 1);
  elements.currentTemp.textContent = formatTemperature(forecast.current.temperature_2m);
  elements.feelsLike.textContent = `${t("current.feelsLikePrefix")} ${formatTemperature(forecast.current.apparent_temperature)}`;
  elements.currentPrecip.textContent = formatPrecip(forecast.current.precipitation);
  elements.currentHumidity.textContent = Number.isFinite(forecast.current.relative_humidity_2m)
    ? `${Math.round(forecast.current.relative_humidity_2m)}%`
    : t("errors.noData");
  elements.currentWind.textContent = formatWind(
    forecast.current.wind_speed_10m,
    forecast.current.wind_direction_10m,
  );
  elements.currentTimezone.textContent = forecast.timezone || t("errors.noData");

  renderDailyCards(forecast.daily);
  renderDetails(forecast);
  renderChart(forecast.hourly, locationTitle || t("current.selectedLocationFallback"));
  renderMap(location, forecast);
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
        <strong>${escapeHTML(formatDay(day))}</strong>
        <span>${escapeHTML(meta.label)}</span>
      </div>
      <div class="forecast-main">
        <div class="forecast-icon">${iconMarkup(meta.icon, true)}</div>
        <div>
          <strong>${escapeHTML(formatProbability(probability))}</strong>
          <div class="forecast-extra">${escapeHTML(t("forecast.precipLabel"))}: ${escapeHTML(formatPrecip(daily.precipitation_sum?.[index]))}</div>
        </div>
      </div>
      <div class="forecast-temp">
        <strong>${escapeHTML(formatTemperature(daily.temperature_2m_max?.[index]))} / ${escapeHTML(formatTemperature(daily.temperature_2m_min?.[index]))}</strong>
        <span class="forecast-extra">${escapeHTML(t("forecast.windUpTo"))} ${escapeHTML(Number.isFinite(daily.wind_speed_10m_max?.[index]) ? Math.round(daily.wind_speed_10m_max[index]) : t("wind.unknown"))} ${escapeHTML(t("units.wind"))}</span>
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
      label: t("details.peakProbability"),
      value: formatProbability(peakProbability),
      note: peakIndex >= 0 ? t("details.around", { time: formatHour(probabilityDataset[peakIndex].time) }) : t("errors.noData"),
    },
    {
      label: t("details.totalPrecip"),
      value: formatPrecip(totalPrecip),
      note: t("details.analyticsNote"),
    },
    {
      label: t("details.sunrise"),
      value: shortTime(sunrise),
      note: t("details.today"),
    },
    {
      label: t("details.sunset"),
      value: shortTime(sunset),
      note: t("details.today"),
    },
  ];

  elements.detailsGrid.innerHTML = details.map((item) => `
    <article class="detail-card">
      <span>${escapeHTML(item.label)}</span>
      <strong>${escapeHTML(item.value)}</strong>
      <div class="forecast-extra">${escapeHTML(item.note)}</div>
    </article>
  `).join("");
}

function renderChartUnavailable(title) {
  elements.chartCaption.textContent = t("chart.unavailableCaption", { title });
  elements.chartSummary.innerHTML = `
    <p>${t("chart.unavailableTitle")}</p>
  `;
  elements.chart.innerHTML = `
    <div class="chart-empty">
      <p>${t("chart.unavailableDescription")}</p>
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
    return {
      x,
      y,
      value,
      time: times[index],
    };
  });

  const linePath = polylineToPath(points.map((point) => `${point.x},${point.y}`));
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
    <div class="chart-tooltip" id="chart-tooltip" hidden></div>
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${t("chart.hoverAria")}">
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
      <line class="chart-hover-line" id="chart-hover-line" x1="${paddingX}" y1="${paddingTop}" x2="${paddingX}" y2="${paddingTop + chartHeight}" hidden></line>
      <circle class="chart-hover-dot" id="chart-hover-dot" cx="${paddingX}" cy="${paddingTop + chartHeight}" r="5" hidden></circle>
      <rect
        class="chart-hover-layer"
        id="chart-hover-layer"
        x="${paddingX}"
        y="${paddingTop}"
        width="${chartWidth}"
        height="${chartHeight}"
      ></rect>
    </svg>
  `;

  const tooltip = elements.chart.querySelector("#chart-tooltip");
  const hoverLayer = elements.chart.querySelector("#chart-hover-layer");
  const hoverLine = elements.chart.querySelector("#chart-hover-line");
  const hoverDot = elements.chart.querySelector("#chart-hover-dot");

  if (tooltip && hoverLayer && hoverLine && hoverDot) {
    hoverLayer.addEventListener("mouseenter", () => {
      tooltip.hidden = false;
      hoverLine.removeAttribute("hidden");
      hoverDot.removeAttribute("hidden");
    });

    hoverLayer.addEventListener("mousemove", (event) => {
      const frameRect = elements.chart.getBoundingClientRect();
      const layerRect = hoverLayer.getBoundingClientRect();
      const relativeX = Math.max(0, Math.min(layerRect.width, event.clientX - layerRect.left));
      const normalizedX = relativeX / Math.max(layerRect.width, 1);
      const positionOnSeries = normalizedX * Math.max(points.length - 1, 0);
      const leftIndex = Math.floor(positionOnSeries);
      const rightIndex = Math.min(points.length - 1, leftIndex + 1);
      const nearestIndex = Math.round(positionOnSeries);
      const leftPoint = points[Math.max(0, Math.min(points.length - 1, leftIndex))];
      const rightPoint = points[Math.max(0, Math.min(points.length - 1, rightIndex))];

      if (!leftPoint || !rightPoint) {
        return;
      }

      const mix = Math.max(0, Math.min(1, positionOnSeries - leftIndex));
      const cursorX = paddingX + normalizedX * chartWidth;
      const cursorY = leftPoint.y + (rightPoint.y - leftPoint.y) * mix;
      const interpolatedValue = leftPoint.value + (rightPoint.value - leftPoint.value) * mix;
      const nearestPoint = points[Math.max(0, Math.min(points.length - 1, nearestIndex))];

      tooltip.innerHTML = `
        <strong>${Math.round(interpolatedValue)}%</strong>
        <span>${formatTooltipDateTime(nearestPoint?.time || "")}</span>
      `;

      hoverLine.setAttribute("x1", String(cursorX));
      hoverLine.setAttribute("x2", String(cursorX));
      hoverDot.setAttribute("cx", String(cursorX));
      hoverDot.setAttribute("cy", String(cursorY));

      const tooltipRect = tooltip.getBoundingClientRect();
      let left = event.clientX - frameRect.left + 14;
      let top = event.clientY - frameRect.top - tooltipRect.height - 14;

      if (left + tooltipRect.width > frameRect.width - 8) {
        left = frameRect.width - tooltipRect.width - 8;
      }
      if (left < 8) {
        left = 8;
      }
      if (top < 8) {
        top = event.clientY - frameRect.top + 14;
      }

      tooltip.style.left = `${left}px`;
      tooltip.style.top = `${top}px`;
    });

    hoverLayer.addEventListener("mouseleave", () => {
      tooltip.hidden = true;
      hoverLine.setAttribute("hidden", "");
      hoverDot.setAttribute("hidden", "");
    });
  }

  const peak = Math.max(...values);
  const average = values.reduce((sum, value) => sum + value, 0) / Math.max(values.length, 1);
  elements.chartCaption.textContent = t("chart.captionLocation", { title });
  elements.chartSummary.innerHTML = `
    <p>${t("chart.summaryPeak", { value: Math.round(peak) })}</p>
    <p>${t("chart.summaryAverage", { value: Math.round(average) })}</p>
    <p>${t("chart.summaryInterval", { value: values.length })}</p>
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
        <circle class="weather-scene__glow" cx="80" cy="76" r="42"></circle>
        <circle class="weather-scene__sun-disc" cx="80" cy="76" r="24"></circle>
        <g class="weather-scene__rays">
          <path d="M80 26v14"></path>
          <path d="M80 112v14"></path>
          <path d="M130 76h-14"></path>
          <path d="M44 76H30"></path>
          <path d="m116 40-10 10"></path>
          <path d="m54 102-10 10"></path>
          <path d="m116 112-10-10"></path>
          <path d="M54 50 44 40"></path>
        </g>
        <circle class="weather-scene__twinkle" cx="36" cy="42" r="3"></circle>
        <circle class="weather-scene__twinkle weather-scene__twinkle--late" cx="122" cy="50" r="2.5"></circle>
        <circle class="weather-scene__twinkle" cx="118" cy="112" r="3"></circle>
      </svg>
    </div>
  `;
}

function clearNightScene() {
  return `
    <div class="weather-scene weather-scene--clear-night">
      <svg viewBox="0 0 160 160" fill="none" aria-hidden="true">
        <circle class="weather-scene__glow weather-scene__glow--moon" cx="94" cy="70" r="34"></circle>
        <circle class="weather-scene__moon-disc" cx="90" cy="72" r="24"></circle>
        <circle class="weather-scene__moon-cut" cx="102" cy="62" r="22"></circle>
        <circle class="weather-scene__twinkle" cx="42" cy="42" r="3"></circle>
        <circle class="weather-scene__twinkle weather-scene__twinkle--late" cx="122" cy="38" r="2.5"></circle>
        <circle class="weather-scene__twinkle" cx="118" cy="104" r="2.5"></circle>
        <circle class="weather-scene__twinkle weather-scene__twinkle--late" cx="56" cy="114" r="2"></circle>
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
            <circle class="weather-scene__glow" cx="58" cy="56" r="30"></circle>
            <circle class="weather-scene__sun-disc" cx="58" cy="56" r="19"></circle>
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
            <circle class="weather-scene__glow weather-scene__glow--moon" cx="62" cy="58" r="28"></circle>
            <circle class="weather-scene__moon-disc" cx="62" cy="58" r="20"></circle>
            <circle class="weather-scene__moon-cut" cx="72" cy="50" r="18"></circle>
            <circle class="weather-scene__twinkle" cx="112" cy="40" r="2.5"></circle>
          `}
        <path class="weather-scene__cloud-shape weather-scene__cloud-shape--soft weather-scene__float-slow" d="M50 110c-10 0-18-7-18-17 0-8 6-15 14-17 3-15 16-25 32-25 13 0 24 5 31 15 3-1 6-2 10-2 12 0 22 10 22 22 0 13-10 24-24 24H50Z"></path>
      </svg>
    </div>
  `;
}

function cloudyScene() {
  return `
    <div class="weather-scene weather-scene--cloudy">
      <svg viewBox="0 0 160 160" fill="none" aria-hidden="true">
        <path class="weather-scene__cloud-shape weather-scene__cloud-shape--back weather-scene__float-slow" d="M40 102c-8 0-15-6-15-15 0-7 5-13 12-15 4-15 17-25 33-25 13 0 24 5 31 15 3-1 6-2 9-2 12 0 21 9 21 21 0 12-10 21-22 21H40Z"></path>
        <path class="weather-scene__cloud-shape weather-scene__cloud-shape--front weather-scene__float-fast" d="M54 118c-9 0-16-6-16-15 0-7 5-13 12-15 3-12 15-20 29-20 11 0 21 4 27 12 2-1 5-1 8-1 11 0 20 8 20 19s-8 20-20 20H54Z"></path>
      </svg>
    </div>
  `;
}

function rainScene() {
  return `
    <div class="weather-scene weather-scene--rain">
      <svg viewBox="0 0 160 160" fill="none" aria-hidden="true">
        <path class="weather-scene__cloud-shape weather-scene__cloud-shape--dark weather-scene__float-slow" d="M42 104c-9 0-16-7-16-16 0-7 5-14 12-16 4-15 17-25 33-25 13 0 24 5 31 15 3-1 6-2 10-2 12 0 22 10 22 22 0 12-10 22-22 22H42Z"></path>
        <path class="weather-scene__rain-line" style="animation-delay:0s" d="M56 110l-8 24"></path>
        <path class="weather-scene__rain-line" style="animation-delay:.3s" d="M82 114l-8 24"></path>
        <path class="weather-scene__rain-line" style="animation-delay:.6s" d="M108 110l-8 24"></path>
      </svg>
    </div>
  `;
}

function snowScene() {
  return `
    <div class="weather-scene weather-scene--snow">
      <svg viewBox="0 0 160 160" fill="none" aria-hidden="true">
        <path class="weather-scene__cloud-shape weather-scene__float-slow" d="M44 104c-9 0-16-7-16-16 0-7 5-14 12-16 4-15 17-25 33-25 13 0 24 5 31 15 3-1 6-2 10-2 12 0 22 10 22 22 0 12-10 22-22 22H44Z"></path>
        <g class="weather-scene__flake" style="animation-delay:0s">
          <path d="M54 114v16"></path>
          <path d="M46 122h16"></path>
          <path d="m48 116 12 12"></path>
          <path d="m60 116-12 12"></path>
        </g>
        <g class="weather-scene__flake" style="animation-delay:.45s">
          <path d="M82 118v16"></path>
          <path d="M74 126h16"></path>
          <path d="m76 120 12 12"></path>
          <path d="m88 120-12 12"></path>
        </g>
        <g class="weather-scene__flake" style="animation-delay:.9s">
          <path d="M110 114v16"></path>
          <path d="M102 122h16"></path>
          <path d="m104 116 12 12"></path>
          <path d="m116 116-12 12"></path>
        </g>
      </svg>
    </div>
  `;
}

function stormScene() {
  return `
    <div class="weather-scene weather-scene--storm">
      <svg viewBox="0 0 160 160" fill="none" aria-hidden="true">
        <path class="weather-scene__cloud-shape weather-scene__cloud-shape--storm weather-scene__float-slow" d="M40 102c-9 0-16-7-16-16 0-8 5-14 12-16 4-16 18-27 35-27 13 0 25 6 32 16 3-1 6-2 10-2 13 0 23 10 23 23 0 12-10 22-23 22H40Z"></path>
        <path class="weather-scene__bolt" d="m86 100-12 24h14l-9 23 30-36H94l10-11Z"></path>
        <path class="weather-scene__rain-line weather-scene__rain-line--storm" style="animation-delay:.1s" d="M56 112l-8 22"></path>
        <path class="weather-scene__rain-line weather-scene__rain-line--storm" style="animation-delay:.5s" d="M112 112l-8 22"></path>
      </svg>
    </div>
  `;
}

function fogScene() {
  return `
    <div class="weather-scene weather-scene--fog">
      <svg viewBox="0 0 160 160" fill="none" aria-hidden="true">
        <path class="weather-scene__cloud-shape weather-scene__cloud-shape--soft weather-scene__float-slow" d="M44 100c-9 0-16-7-16-16 0-7 5-14 12-16 4-15 17-25 33-25 13 0 24 5 31 15 3-1 6-2 10-2 12 0 22 10 22 22 0 12-10 22-22 22H44Z"></path>
        <path class="weather-scene__mist-band" d="M34 110h92"></path>
        <path class="weather-scene__mist-band weather-scene__mist-band--late" d="M46 124h76"></path>
        <path class="weather-scene__mist-band" d="M38 138h84"></path>
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
    elements.historyList.innerHTML = `<p class="history-empty">${t("history.empty")}</p>`;
    return items;
  }

  elements.historyList.innerHTML = "";
  items.forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "history-item";
    button.innerHTML = `
      <strong>${escapeHTML(item.location_name)}</strong>
      <span>${escapeHTML(item.display_name)}</span>
    `;

    button.addEventListener("click", async () => {
      scrollToTopSmooth();
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
    if (shouldAutoUseGeolocation()) {
      markGeoFirstVisitHandled();
      const loadedFromGeo = await useCurrentLocation({ auto: true });
      if (loadedFromGeo) {
        return;
      }
    }

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

    const defaultQuery = t("defaults.cityQuery");
    const defaults = await searchLocations(defaultQuery);
    if (defaults.length) {
      const first = defaults[0];
      elements.input.value = first.display_name || first.name;
      await fetchForecast(first, { query: defaultQuery, save: false });
      return;
    }

    showError(new Error(t("errors.upstreamInvalidResponse")));
  } catch (error) {
    showError(error);
  }
}

function showError(error) {
  state.lastError = error;
  state.lastForecastPayload = null;
  state.lastForecastMeta = {};
  state.archiveDays = [];
  state.activeArchiveDate = "";
  closeArchiveModal();
  const message = getDisplayErrorMessage(error);
  elements.currentPlace.textContent = t("errors.loadDataTitle");
  elements.currentSummary.textContent = message;
  elements.currentIcon.innerHTML = "";
  elements.currentTemp.textContent = "--";
  elements.feelsLike.textContent = `${t("current.feelsLikePrefix")} --`;
  elements.currentPrecip.textContent = "--";
  elements.currentHumidity.textContent = "--";
  elements.currentWind.textContent = "--";
  elements.currentTimezone.textContent = "--";
  renderPanelEmpty(elements.forecastGrid, t("errors.forecastEmpty"));
  renderPanelEmpty(elements.detailsGrid, t("errors.detailsEmpty"));
  elements.chartCaption.textContent = t("errors.chartFailed");
  elements.chartSummary.innerHTML = `<p>${escapeHTML(t("errors.chartEmpty"))}</p>`;
  elements.chart.innerHTML = `
    <div class="chart-empty">
      <p>${escapeHTML(message)}</p>
    </div>
  `;
  renderMapEmpty();
  renderArchiveSection();
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
      throw new Error(t("errors.locationNotFound"));
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

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && state.isArchiveModalOpen) {
    closeArchiveModal();
  }
});

if (elements.geoButton) {
  elements.geoButton.addEventListener("click", async () => {
    await useCurrentLocation();
  });
}

if (elements.archiveOpenButton) {
  elements.archiveOpenButton.addEventListener("click", () => {
    openArchiveModal();
  });
}

if (elements.archiveModalClose) {
  elements.archiveModalClose.addEventListener("click", () => {
    closeArchiveModal();
  });
}

if (elements.archiveModal) {
  elements.archiveModal.addEventListener("click", (event) => {
    if (event.target instanceof HTMLElement && event.target.hasAttribute("data-archive-close")) {
      closeArchiveModal();
    }
  });
}

elements.languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const nextLanguage = button.dataset.langSwitch;
    if (!nextLanguage || nextLanguage === state.currentLanguage) {
      return;
    }

    applyLanguage(nextLanguage);
  });
});

applyLanguage(state.currentLanguage, { skipHistoryRefresh: true });
bootstrap();
