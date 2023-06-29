import React from 'react';
import moment from 'moment';
import styles from './TodayWeather.module.scss'

moment.locale('ko');

// 현재 기후, 온도, 위치, 체감온도
export default function TodayWeather({ weather }) {

  return (
    <section className={styles.section}>
      {weather ? (
        <>
          <p className={styles.weather}>it's <br />
            {weather.weather[0].description} <br />
            now
          </p>
          <h1 className={styles.temp}>{Math.round(weather.main.temp)}<small>°</small></h1>
          <div className={styles.desc}>
            <p className={styles.location}>
              {weather.name}, {weather.sys.country}
            </p>
            <p className={styles.feels}>feels like
              <span> {Math.round(weather.main.feels_like)}°</span>
            </p>
          </div>
        </>
      ) : (
        <>
          <p>Loading...</p>
        </>
      )}
    </section>
  );
}

