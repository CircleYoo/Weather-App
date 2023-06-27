import React, { useState, useEffect } from "react";
import axios from "axios";
import Weather from "./Weather";
import "../App";
import NextWeather from "./NextWeather";
import TodayDetail from "./TodayDetail";
import Ootd from "./Ootd";

// 전체 큰 틀
export default function WeatherApp() {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [city, setCity] = useState("");

  const [showToday, setShowToday] = useState(true); // 디테일 정보

  const [currentTemp, setCurrentTemp] = useState(null); // 현재 온도

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
          setCurrentTemp(response.data.main.temp)
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
        .get(`https://api.openweathermap.org/data/2.5/forecast?lat=${location.latitude}&lon=${location.longitude}&units=metric&appid=${API_KEY}`)
        .then((response) => {
          const forecastList = response.data.list;
          setForecast(forecastList);
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

    if (city === "") { return; }

    try {
      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      )
      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
      );

      setWeather(weatherRes.data);
      setForecast(forecastRes.data.list)
      setCurrentTemp(weatherRes.data.main.temp)
      
      setCity("");
    } catch (error) {
      console.log(error)
    }

  };
  
  const handleTodayClick = () => {
    setShowToday(true);
  };

  const handleNextClick = () => {
    setShowToday(false);
  };

  return (
    <>
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
      <section>
        <button onClick={handleTodayClick}>today</button>
        <button onClick={handleNextClick}>next 5 days</button>
      </section>
      {showToday && weather && forecast? (
        <TodayDetail weather={weather} forecast={forecast} />
      ) : (
          <NextWeather weather={weather} forecast={forecast}/>
      )}
      <Ootd temp={ currentTemp } />
    </>
  );

}
