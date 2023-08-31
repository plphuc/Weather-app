import React, { useContext } from 'react';
import { MdLocationOn } from 'react-icons/md';

import WeatherIcon from 'components/WeatherIcon/WeatherIcon';
import { weatherDataContext } from 'App';
import * as utilsFunc from 'utils/convertFunc'
import styles from './MainSection.module.css';

function MainSection(props) {
  const currentWeather = useContext(weatherDataContext).currentWeather
  return (
    <div className={styles.wrapper}>
      <div className={styles.weatherIconWrapper}>
        <WeatherIcon iconName={currentWeather.weather[0].icon} />
      </div>

      <div className={styles.weatherInfoWrapper}>
        <span className={styles.temperatureInfo}>
          {utilsFunc.convertKevinToCelcius(currentWeather.main.temp)}°C
        </span>
        <span className={styles.weatherCondition}>
          {currentWeather.weather[0].main}
        </span>
        <span className={styles.dateInfo}>
          Today • {utilsFunc.convertEpochToDate(currentWeather.dt)}
        </span>
        <span className={styles.locationInfo}>
          <MdLocationOn />
          {currentWeather.name}
        </span>
      </div>
    </div>
  );
}

export default MainSection;
