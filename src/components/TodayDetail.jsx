import React from 'react';
import moment from 'moment';

export default function TodayDetail({ weather, forecast }) {
  return (
    <div>
      <h3>sunrise <span>{moment.unix(weather.sys.sunrise).format('LT')}</span></h3>
      <h3>sunset <span>{moment.unix(weather.sys.sunset).format('LT')}</span></h3>
      <h3>humidity <span>{weather.main.humidity}%</span></h3>
      <h3>wind <span>{weather.wind.speed}km/h</span></h3>
    </div>
  );
}



