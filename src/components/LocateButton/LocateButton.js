import React, { useState, useEffect }  from 'react';
import { BiCurrentLocation } from 'react-icons/bi';

import { useUpdateWeather } from 'WeatherInfoProvider';

import styles from './LocateButton.module.css';

function LocateButton(props) {
  const [isLocateAvailable, setIsLocateAvailable] = useState(true);
  const updateWeather = useUpdateWeather();

  const isLocateAvailableClass = isLocateAvailable 
  ? styles.currentLocationIcon 
  : styles.disabledLocation;

  function showPosition(position) {
    updateWeather(position.coords.longitude, position.coords.latitude);
  }

  function showError() {
    setIsLocateAvailable(false);
  }

  const loadCurrentLocation = function () {
    navigator.geolocation 
    ? navigator.geolocation.getCurrentPosition(showPosition, showError) 
    : setIsLocateAvailable(false);
  };

  // Get default location information
  useEffect(() => loadCurrentLocation(), []);

  return (
    <button className={styles.currentLocationBtn} onClick={loadCurrentLocation}>
      <span className={isLocateAvailableClass}>
        <BiCurrentLocation size={27} />
      </span>
    </button>
  );
}

export default LocateButton;
