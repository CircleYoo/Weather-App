import React, { useState } from "react";
import moment from "moment";
import "moment/locale/ko";
import "../App";

moment.locale("ko");

export default function SearchLocationWeather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const API_KEY = process.env.REACT_APP_API_KEY;

  const handleChange = (e) => {
    setCity(e.target.value)
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}&lang=kr`;
    const response = await fetch(url);
    const data = await response.json();

    if (city === "") { return };
    setWeather(data);
    setCity("") // 입력 초기화
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            value={city}
            placeholder="Enter city name"
            onChange={handleChange}
          />
        </label>
        <button type="submit">
          검색하기
        </button>
      </form>
      {weather && (
        <div>
          <p>Weather: {weather.weather[0].description}</p>
          <p>온도: {Math.round(weather.main.temp)}°C</p>
          <p>Real Feel: {Math.round(weather.main.feels_like)}°C</p>
          <p>일출: {moment.unix(weather.sys.sunrise).format("LT")}</p>
          <p>일몰: {moment.unix(weather.sys.sunset).format("LT")}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind: {weather.wind.speed} km/h</p>
        </div>
      )}
    </div>
  );
}
