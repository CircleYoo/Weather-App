import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from 'moment';
import 'moment/locale/ko';
import Weather from "./Weather";
import "../App";
import NextWeather from "./NextWeather";
import TodayDetail from "./TodayDetail";

moment.locale('ko');

export default function WeatherApp() {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [city, setCity] = useState("");
  const [showToday, setShowToday] = useState(true);

  const API_KEY = process.env.REACT_APP_API_KEY;

  // 현지 위치 가져오기
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  // 현재 위치의 날씨 가져오기
  useEffect(() => {
    if (location.latitude && location.longitude) {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&units=metric&appid=${API_KEY}`)
        .then((response) => {
          setWeather(response.data);
        })
        .catch((error) => {
          console.log('location error', error);
        });
    }
  }, [location]);

  // 5 days / 3 hours 가져오기
  useEffect(() => {
    if (location.latitude && location.longitude) {
      axios
        .get(`https://api.openweathermap.org/data/2.5/forecast?lat=${location.latitude}&lon=${location.longitude}&units=metric&appid=${API_KEY}&lang=kr`)
        .then((response) => {
          const forecastList = response.data.list;
          const dailyData = forecastList.filter(item => item.dt_txt.includes("15:00:00"));
          setForecast(dailyData);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [location]);


  const handleChange = (e) => {
    setCity(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}&lang=kr`;
    const response = await fetch(url);
    const data = await response.json();

    if (city === "") { return; }

    setWeather(data);
    setCity("");
  };

  const handleTodayClick = () => {
    setShowToday(true);
  };

  const handleNextClick = () => {
    setShowToday(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            value={city}
            placeholder="search for place"
            onChange={handleChange}
          />
        </label>
        <button type="submit">
          검색하기
        </button>
      </form>
      <Weather weather={weather} forecast={forecast} />
      <div>
        <button onClick={handleTodayClick}>today</button>
        <button onClick={handleNextClick}>next 5 days</button>
      </div>
      {showToday && weather && forecast? (
        <TodayDetail weather={weather} forecast={forecast} />
      ) : (
          <NextWeather weather={weather} forecast={forecast}  />
      )}
    </div>
  );
}
