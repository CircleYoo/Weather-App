import React from 'react';
import moment from 'moment';

moment.locale('ko');

// 현재 기후, 온도, 위치, 체감온도
export default function Weather({ weather }) {

  return (
    <section>
      {weather ? (
        <>
            <p>it's <br />
              {weather.weather[0].description} <br />
              now</p>
            <h1>{Math.round(weather.main.temp)}°C</h1>
            <div>
              <p>
                {weather.name}, {weather.sys.country}
              </p>
              <p>feels like <span>{Math.round(weather.main.feels_like)}°</span></p>
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

