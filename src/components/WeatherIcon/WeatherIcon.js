import React, { useState, useEffect } from 'react';
import * as fetchApi from 'utils/getRequests';
import styles from './WeatherIcon.module.css';

function WeatherIcon(props) {
  const { iconName } = props;
  const [imageSourceURL, setImageSourceURL] = useState('');

  useEffect(() => {
    const response = fetchApi.getWeatherIcon(iconName);
    response.then((result) => {
      setImageSourceURL(URL.createObjectURL(result));
    })
  }, [iconName]);

  return (
      <img
        className={styles.weatherIcon}
        src={imageSourceURL}
        alt="weather-icon"
      ></img>
  );
}

export default WeatherIcon;
