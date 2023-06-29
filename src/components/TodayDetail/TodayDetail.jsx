import React from 'react';
import moment from 'moment';
import styles from './TodayDetail.module.scss'
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";

// 오늘날씨 상세정보
export default function TodayDetail({ weather, forecast }) {
  // 오늘의 날짜를 가져오기
  const today = moment().format('YYYY-MM-DD');

  // 오늘의 최고 기온과 최저 기온을 계산
  const todayForecast = forecast.filter(item => item.dt_txt.includes(today));
  const maxTemp = Math.max(...todayForecast.map(item => item.main.temp_max));
  const minTemp = Math.min(...todayForecast.map(item => item.main.temp_min));

  return (
    <section className={styles.section}>
      <div className={styles.temp}>
        <h3>
          <AiOutlineArrowUp />
          <span>{Math.round(maxTemp)}°</span>
        </h3>
        <h3>
          <AiOutlineArrowDown />
          <span>{Math.round(minTemp)}°</span>
        </h3>
      </div>
      <div className={styles.detail}>
        <p>
          <span>sunrise</span>
          <b>{moment.unix(weather.sys.sunrise).format('LT')}</b>
        </p>
        <p>
          <span>humidity</span>
          <b>{weather.main.humidity}%</b>
        </p>
        <p>
          <span>sunset</span>
          <b>{moment.unix(weather.sys.sunset).format('LT')}</b>
        </p>
        <p>
          <span>wind</span>
          <b>{weather.wind.speed}km/h</b>
        </p>
      </div>
    </section>
  );
}
