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

function App() {
  const apiKey = import.meta.env.VITE_API_KEY;

  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [city, setCity] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const handleSubmit = async () => {
    try {
      setStatus("loading");
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
      );

      const data = await response.json();
      setWeather(data);
      setStatus("success");
    } catch (error) {
      console.log(error);
      setStatus("error");
    }
  };

  return (
    <div className="app-container">
      <div className="weather-card">
        <h1 className="title">Weather App</h1>

        <SearchForm city={city} setCity={setCity} handleSubmit={handleSubmit} />

        {status === "loading" && <p className="status">Loading...</p>}

        {weather && status === "success" && (
          <div className="weather-info">
            <h2 className="city">{weather.name}</h2>

            <div className="temp">{Math.round(weather.main.temp)}°C</div>

            <p className="desc">{weather.weather[0].description}</p>

            <div className="meta">
              <span>Humidity: {weather.main.humidity}%</span>
              <span>Wind: {weather.wind.speed} m/s</span>
            </div>
          </div>
        )}

        {status === "error" && <p className="error">City not found 😢</p>}
      </div>
    </div>
  );
}

export default App;
