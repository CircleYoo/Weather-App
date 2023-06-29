import React from 'react';
import moment from 'moment';
import styles from './NextWeather.module.scss'

// 다음 5일간 날씨 정보
export default function NextWeather({ forecast }) {

  // 날짜별로 데이터 그룹화하는 함수
  const groupForecastByDate = (forecast) => {
    return forecast.reduce((groupedData, data) => {
      const date = moment(data.dt_txt).format("YYYY-MM-DD");
      if (!groupedData[date]) {
        groupedData[date] = [];
      }
      groupedData[date].push(data);
      return groupedData;
    }, {});
  }

  // 내일부터 5일 후까지의 데이터 필터링하는 함수
  const filterForecastData = (groupedData) => {
    const tomorrow = moment().add(1, 'day').format("YYYY-MM-DD");
    const fiveDaysLater = moment().add(5, 'day').format("YYYY-MM-DD");

    return Object.entries(groupedData).reduce((filteredData, [date, data]) => {
      if (date >= tomorrow && date <= fiveDaysLater) {
        filteredData[date] = data;
      }
      // console.log([date, data], groupedData)
      return filteredData;
    }, {});
  }

  // 5 days / 3 hours 필요한 부분 출력하기
  const renderForecastData = () => {
    if (forecast.length === 0) {
      return <p>Loading...</p>;
    }

    // 날짜별로 데이터 그룹화
    const groupedData = groupForecastByDate(forecast);

    // 내일부터 5일 후까지의 데이터 필터링
    const filteredData = filterForecastData(groupedData);

    return Object.entries(filteredData).map(([date, data], idx) => {
      /* Object.entries() 메소드
       * 모든 프로퍼티와 값을 배열로 반환
       */
      const dayOfWeek = moment(date).lang("en").format("ddd");
      const dateOfWeek = moment(date).format("D");

      // 최고 기온과 최저 기온 계산
      const maxTemp = Math.round(Math.max(...data.map(item => item.main.temp_max)));
      const minTemp = Math.round(Math.min(...data.map(item => item.main.temp_min)));

      // 날씨 정보 출력: 아이콘으로 대체
      // const weatherInfo = data[0].weather[0].main;

      // 날씨 아이콘
      const weatherIcon = `http://openweathermap.org/img/wn/${data[0].weather[0].icon}.png`;

      return (
        <div key={idx} className={styles.Info_next}>
          <img src={weatherIcon} alt="Weather Icon" className={styles.icon} />
          <h2 className={styles.date}>{dayOfWeek}, {dateOfWeek}</h2>
          <div className={styles.temp}>
            <p>Max Temp: {maxTemp}°C</p>
            <p>Min Temp: {minTemp}°C</p>
          </div>
        </div>
      );
    });
  }

  return (
    <section>
      {renderForecastData()}
    </section>
  );
}
