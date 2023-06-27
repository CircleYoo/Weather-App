import React from 'react';
import moment from 'moment';

// 오늘날씨 상세정보
export default function TodayDetail({ weather, forecast }) {
  // 오늘의 날짜를 가져오기
  const today = moment().format('YYYY-MM-DD');

  // 오늘의 최고 기온과 최저 기온을 계산
  const todayForecast = forecast.filter(item => item.dt_txt.includes(today));
  const maxTemp = Math.max(...todayForecast.map(item => item.main.temp_max));
  const minTemp = Math.min(...todayForecast.map(item => item.main.temp_min));

  return (
    <div>
      <div>
        <h3>max temperature <span>{Math.round(maxTemp)}°C</span></h3>
        <h3>min temperature <span>{Math.round(minTemp)}°C</span></h3>
      </div>
      <h3>sunrise <span>{moment.unix(weather.sys.sunrise).format('LT')}</span></h3>
      <h3>sunset <span>{moment.unix(weather.sys.sunset).format('LT')}</span></h3>
      <h3>humidity <span>{weather.main.humidity}%</span></h3>
      <h3>wind <span>{weather.wind.speed}km/h</span></h3>
    </div>
  );
}
