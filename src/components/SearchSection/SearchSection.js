import { useEffect, useState } from 'react';
import { BiCurrentLocation } from 'react-icons/bi';

import SearchPlaceModal from 'components/SearchPlaceModal/SearchPlaceModal';
import * as fetchApi from 'utils/getRequests';
import styles from './SearchSection.module.css';

const fetchWeather = async (longitude, latitude) => {
  const weatherObj = {}
  weatherObj.currentWeather = await fetchApi.getCurrentWeather(longitude, latitude);
  localStorage.setItem('currentLocationInfo', JSON.stringify(weatherObj.currentWeather));

  weatherObj.nextDaysWeather = await fetchApi.getNextDaysForecast(longitude, latitude);
  return weatherObj;
};

function SearchSection(props) {
  const {onChangeWeatherData} = props

  const [isSearchPlaceModalActive, setIsSearchPlaceModalActive] =
    useState(false);
  const [isLocateAvailable, setIsLocateAvailable] = useState(true);
  const isLocateAvailableClass = isLocateAvailable
    ? styles.currentLocationIcon
    : styles.disabledLocation;

  function setWeatherForecast(data) {
    onChangeWeatherData(data)
  }

  function onChooseLocation(location) {
    const weatherForecast = fetchWeather(location.lon, location.lat);
    weatherForecast.then(data => {
      setWeatherForecast(data)
    })
    setIsSearchPlaceModalActive(false);
  }

  function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const weatherForecast = fetchWeather(longitude, latitude);
    weatherForecast.then(data => {
      setWeatherForecast(data)
    })
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
  useEffect(() => {
    loadCurrentLocation();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchContainer}>
        <button
          className={styles.searchPlaceBtn}
          onClick={() => {
            setIsSearchPlaceModalActive(true);
          }}
        >
          <span>Search For Places</span>
        </button>

        <button
          className={styles.currentLocationBtn}
          onClick={loadCurrentLocation}
        >
          <span className={isLocateAvailableClass}>
            <BiCurrentLocation size={27} />
          </span>
        </button>
      </div>

      {isSearchPlaceModalActive && (
        <div className={styles.searchModalContainer}>
          <SearchPlaceModal
            onChooseLocation={onChooseLocation}
            onCloseModal={() => {
              setIsSearchPlaceModalActive(false);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default SearchSection;
