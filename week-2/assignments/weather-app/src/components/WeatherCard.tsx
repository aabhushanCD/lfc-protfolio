import type { WeatherData } from "../App";

const WeatherCard = ({ weather }: { weather: WeatherData }) => {
  return (
    <div className="weather-info">
      {weather && (
        <img
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
          alt={weather.weather[0].description}
          width={100}
        />
      )}
      <h2 className="city">{weather.name}</h2>

      <div className="temp">{Math.round(weather.main.temp)}°C</div>

      <p className="desc">{weather.weather[0].description}</p>

      <div className="meta">
        <span>Humidity: {weather.main.humidity}%</span>
        <span>Wind: {weather.wind.speed} m/s</span>
      </div>
    </div>
  );
};

export default WeatherCard;
