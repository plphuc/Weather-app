import React, { useState, useEffect } from 'react';
import * as fetchApi from 'utils/getRequests';
import styles from './WeatherIcon.module.css';
const fetchIcon = async (iconName) => {
  const result = await fetchApi.getWeatherIcon(iconName);
  return result;
};
function WeatherIcon(props) {
  const { iconName } = props;
  const [imageSourceURL, setImageSourceURL] = useState('');

  useEffect(() => {
    fetchIcon(iconName).then((data) => {
      setImageSourceURL(URL.createObjectURL(data));
    });
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
