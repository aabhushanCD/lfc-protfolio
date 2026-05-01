let searchBtm = document.getElementById("search-btm");
let cityInput = document.getElementById("city-input");
let statusEl = document.getElementById("status");
let weatherResult = document.getElementById("weather-result");
let loading = document.getElementById("loading");
const API_KEY = "f011c8481591a4c6f1f9fd818f62e38c";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

async function featherWeather(city) {
  try {
    loading.style.display = "block";
    statusEl.textContent = "";
    const URL = `${baseUrl}?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(URL);
    const data = await response.json();
    if (!response.ok) {
      document.getElementById("status").textContent = `Error: ${data.message}!`;
      return;
    }
    return data;
  } catch (error) {
    console.log(response.error);
    document.getElementById("status").textContent =
      "Failed to fetch weather data. Please try again.";
  } finally {
    loading.style.display = "none";
  }
}

function renderWeather(data) {
  document.getElementById("location-name").textContent =
    `${data.name}, ${data.sys.country}`;
  document.getElementById("weather-description").textContent =
    data.weather[0].description[0].toUpperCase() +
    data.weather[0].description.slice(1);

  document.getElementById("temperature").textContent = `${data.main.temp} °C`;

  document.getElementById("weather-icon").src =
    `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

  document.getElementById("metric-wind-speed").textContent =
    `${data.wind.speed} m/s`;
  document.getElementById("metric-humidity").textContent =
    `${data.main.humidity}%`;
}

cityInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    searchBtm.click();
  }
});
searchBtm.addEventListener("click", async (e) => {
  e.preventDefault();
  const city = cityInput.value;
  const weatherData = await featherWeather(city);
  renderWeather(weatherData);
});
