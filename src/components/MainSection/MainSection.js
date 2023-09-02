import React from 'react';
import { MdLocationOn } from 'react-icons/md';

import { useWeatherInfo } from 'WeatherInfoProvider';
import WeatherIcon from 'components/WeatherIcon/WeatherIcon';
import * as utilsFunc from 'utils/convertFunc'

import styles from './MainSection.module.css';

function MainSection(props) {
  const weather = useWeatherInfo()
  return (
    <div className={styles.wrapper}>
      <div className={styles.weatherIconWrapper}>
        <WeatherIcon iconName={weather.currentWeatherForecast.weather[0].icon} />
      </div>

      <div className={styles.weatherInfoWrapper}>
        <span className={styles.temperatureInfo}>
          {utilsFunc.convertKevinToCelcius(weather.currentWeatherForecast.main.temp)}°C
        </span>
        <span className={styles.weatherCondition}>
          {weather.currentWeatherForecast.weather[0].main}
        </span>
        <span className={styles.dateInfo}>
          Today • {utilsFunc.convertEpochToDate(weather.currentWeatherForecast.dt)}
        </span>
        <span className={styles.locationInfo}>
          <MdLocationOn />
          {weather.currentWeatherForecast.name}
        </span>
      </div>
    </div>
  );
}

export default MainSection;
