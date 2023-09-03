import React from 'react';
import { MdLocationOn } from 'react-icons/md';

import { useWeatherInfo } from 'WeatherInfoProvider';
import WeatherIcon from 'components/WeatherIcon/WeatherIcon';
import * as utilsFunc from 'utils/convertFunc';

import styles from './MainSection.module.css';

function MainSection(props) {
  const weatherInfo = useWeatherInfo();
  const { main, weather } = weatherInfo.currentWeatherForecast || {};
  const dateString = weatherInfo.currentWeatherForecast && utilsFunc.formatEpochToDateString(weatherInfo.currentWeatherForecast.dt);
  const temperature = main && Math.round(utilsFunc.convertKevinToCelcius(main.temp));
  return (
    weatherInfo.currentWeatherForecast && (
      <div className={styles.wrapper}>
        <div className={styles.weatherIconWrapper}>
          <WeatherIcon iconName={weather[0].icon} />
        </div>

        <div className={styles.weatherInfoWrapper}>
          <span className={styles.temperatureInfo}>{temperature}°C</span>
          <span className={styles.weatherCondition}>{weather[0].main}</span>
          <span className={styles.dateInfo}>Today • {dateString}</span>
          <span className={styles.locationInfo}>
            <MdLocationOn />
            {weatherInfo.currentWeatherForecast.name}
          </span>
        </div>
      </div>
    )
  );
}

export default MainSection;
