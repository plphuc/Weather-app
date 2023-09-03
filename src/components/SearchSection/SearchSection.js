import { useEffect, useState } from 'react';
import { BiCurrentLocation } from 'react-icons/bi';

import * as fetchApi from 'utils/getRequests';
import { useWeatherDispatch } from 'WeatherInfoProvider';
import SearchPlaceModal from 'components/SearchPlaceModal/SearchPlaceModal';

import styles from './SearchSection.module.css';

const fetchWeather = async (longitude, latitude) => {
  const currentWeatherForecast = await fetchApi.getCurrentWeather(
    longitude,
    latitude
  );

  const nextDaysWeatherForecast = await fetchApi.getNextDaysForecast(
    longitude,
    latitude
  );
  return { currentWeatherForecast, nextDaysWeatherForecast };
};

function SearchSection(props) {
  const [isSearchPlaceModalActive, setIsSearchPlaceModalActive] =
    useState(false);
  const [isLocateAvailable, setIsLocateAvailable] = useState(true);
  const dispatch = useWeatherDispatch();
  const isLocateAvailableClass = isLocateAvailable
    ? styles.currentLocationIcon
    : styles.disabledLocation;

  function onChooseLocation(location) {
    dispatchWeatherInfo(location.lon, location.lat);
    setIsSearchPlaceModalActive(false);
  }

  function showPosition(position) {
    dispatchWeatherInfo(position.coords.longitude, position.coords.latitude);
  }

  function dispatchWeatherInfo(lon, lat) {
    const weatherForecast = fetchWeather(lon, lat);
    weatherForecast.then((data) => {
      dispatch({
        type: 'change',
        data,
      });
    });
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
