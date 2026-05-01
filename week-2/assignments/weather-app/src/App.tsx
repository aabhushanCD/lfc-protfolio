import { useState } from "react";
import "./App.css";
import SearchForm from "./components/SearchForm";
type WeatherData = {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
};
type statusType = {
  type: "idle" | "loading" | "success" | "error";
  message?: string;
};

function App() {
  const apiKey = import.meta.env.VITE_API_KEY;

  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [city, setCity] = useState<string>("");
  const [status, setStatus] = useState<statusType>({ type: "idle" });
  const handleSubmit = async () => {
    try {
      if (!city.trim()) {
        setStatus({ type: "error", message: "Please enter a city name" });
        return;
      }
      setStatus({ type: "loading" });
      if (!city) {
        return;
      }
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
      );
      if (!response.ok) {
        setStatus({ type: "error", message: "City not found" });
        return;
      }
      const data = await response.json();
      setWeather(data);
      setStatus({ type: "success" });
    } catch (error) {
      console.log(error);
      setStatus({ type: "error", message: "An error occurred" });
    } finally {
      setCity("");
    }
  };

  return (
    <div className="app-container">
      <div className="weather-card">
        <h1 className="title">Weather App</h1>

        <SearchForm city={city} setCity={setCity} handleSubmit={handleSubmit} />

        {status.type === "loading" && <p className="status" id="loading"></p>}

        {weather && status.type === "success" && (
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
        )}

        {status.type === "error" && <p className="error">{status.message}</p>}
      </div>
    </div>
  );
}

export default App;
