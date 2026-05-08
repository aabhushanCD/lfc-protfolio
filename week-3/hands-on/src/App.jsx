import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [weather, setWeather] = useState();
  const apiKey = "f011c8481591a4c6f1f9fd818f62e38c";
  const [city, setCity] = useState("London");

  async function fetchWeather() {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
    );
    const data = await response.json();
    setWeather(data);
  }
  console.log(weather);

  useEffect(() => {
    fetchWeather();
  }, []);

  // const handleChange = (e) => {
  //   console.log(e);
  //   setCity(e.target.value);
  //   setInterval(() => {
  //     fetchWeather(city);
  //   }, 3000);
  // };

  // useEffect(() => {
  //   handleChange();
  //   return clearInterval();
  // }, []);

  return (
    <div>
      <h1>London Weather</h1>
      {weather && <p>{weather.main?.temp}°C</p>}
      <label htmlFor="">Search:</label>
      <input type="text" />
      <button onClick={(e) => fetchWeather(e.target.value)}>Search</button>
    </div>
  );
}

export default App;
