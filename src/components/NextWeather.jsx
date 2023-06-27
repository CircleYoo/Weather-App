import React from 'react';
import moment from 'moment';

// 다음 5일간 날씨 정보
export default function NextWeather({ forecast }) {

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
      const dayOfWeek = moment(date).lang("en").format("ddd");
      const dateOfWeek = moment(date).lang("en").format("YY");

      // 최고 기온과 최저 기온 계산
      const maxTemp = Math.round(Math.max(...data.map(item => item.main.temp_max)));
      const minTemp = Math.round(Math.min(...data.map(item => item.main.temp_min)));

      // 날씨 정보 출력
      const weatherInfo = data[0].weather[0].main;

      return (
        <div key={idx}>
          <p>Weather: {weatherInfo}</p>
          <h2>{dayOfWeek}, {dateOfWeek}</h2>
          <div>
            <p>Max Temp: {maxTemp}°C</p>
            <p>Min Temp: {minTemp}°C</p>
          </div>
        </div>
      );
    });
  }

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
      return filteredData;
    }, {});
  }

  return (
    <section>
      {renderForecastData()}
    </section>
  );
}
