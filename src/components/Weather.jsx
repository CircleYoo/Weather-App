import React from 'react';
import moment from 'moment';

moment.locale('ko');

export default function CurrentLocation({ weather, forecast }) {


  return (
    <div>
      {weather ? (
        <div>
          <section>
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
          </section>

        </div>
      ) : (
        <div>
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
}

