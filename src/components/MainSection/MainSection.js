import React, { useState } from 'react';
import { MdLocationOn } from 'react-icons/md';

import WeatherIcon from 'components/WeatherIcon/WeatherIcon';

import styles from './MainSection.module.css';

function convertKevinToCelcius(tempDegree) {
  return Math.round(tempDegree - 273.15)
}

function convertDate(epochTime) {
  let d = new Date(epochTime * 1000);
  d = d.toString().split(' ');
  return d[0] + ', ' + d[2] + ' ' + d[1];
}

function MainSection(props) {
  const { data } = props;
  return (
    <div className={styles.wrapper}>
      <div className={styles.weatherIconWrapper}>
        <WeatherIcon iconName={data.weather[0].icon} />
      </div>

      <div className={styles.weatherInfoWrapper}>
        <span className={styles.temperatureInfo}>
          {convertKevinToCelcius(data.main.temp)}°C
        </span>
        <span className={styles.weatherCondition}>
          {data.weather[0].main}
        </span>
        <span className={styles.dateInfo}>
          Today • {convertDate(data.dt)}
        </span>
        <span className={styles.locationInfo}>
          <MdLocationOn />
          {data.name}
        </span>
      </div>
    </div>
  );
}

export default MainSection;
