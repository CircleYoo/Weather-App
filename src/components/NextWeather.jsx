import React from 'react';
import moment from 'moment';

export default function NextWeather({ weather, forecast }) {

  // 5 days / 3 hours 필요한 부분 출력하기 : 12시 기준만
  const renderForecastData = () => {
    if (forecast.length === 0) {
      return <p>Loading...</p>;
    }
    return forecast.map((data, idx) => (
      <div key={idx}>
        <h2>{moment(data.dt_txt).calendar().substring(0, 3)}</h2>
        <p>Temperature Max: {Math.round(data.main.temp_max)}°C</p>
        <p>Temperature Min: {Math.round(data.main.temp_min)}°C</p>
        <p>Weather: {data.weather[0].description}</p>
      </div>
    )
    );
  }

  return (
    <div>
      {renderForecastData()}
    </div>
  );
}

