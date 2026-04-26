let searchBtm = document.getElementById("search-btm");
let cityInput = document.getElementById("city-input");
let statusEl = document.getElementById("status");
let weatherResult = document.getElementById("weather-result");

const API_KEY = "f011c8481591a4c6f1f9fd818f62e38c";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

async function featherWeather(city) {
  const URL = `${baseUrl}?q=${city}&appid=${API_KEY}&units=metric`;
  const response = await fetch(URL);
  return await response.json();
}

function renderWeather(data) {
  weatherResult.innerHTML = `
    <h1>${data.name} </h1>
    <p>Temperature: ${data.main.temp}°C </p>
    <p>Humidity: ${data.main.humidity}% </p>
    <p>Weather: ${data.weather[0].description} </p>
    `;
}

searchBtm.addEventListener("click", async (e) => {
  e.preventDefault();
  const city = cityInput.value;
  const weatherData = await featherWeather(city);
  renderWeather(weatherData);
});
