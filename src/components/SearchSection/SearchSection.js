import { useEffect, useState } from 'react';

import { useUpdateWeather } from 'WeatherInfoProvider';
import SearchPlaceModal from 'components/SearchPlaceModal/SearchPlaceModal';

import styles from './SearchSection.module.css';
import LocateBtn from 'components/LocateBtn/LocateBtn';

function SearchSection(props) {
  const [isSearchPlaceModalActive, setIsSearchPlaceModalActive] = useState(false);
  const [isLocateAvailable, setIsLocateAvailable] = useState(true);
  const updateWeather = useUpdateWeather();

  function showPosition(position) {
    updateWeather(position.coords.longitude, position.coords.latitude);
  }

  function showError() {
    setIsLocateAvailable(false);
  }

  const loadCurrentLocation = function () {
    navigator.geolocation ? navigator.geolocation.getCurrentPosition(showPosition, showError) : setIsLocateAvailable(false);
  };

  // Get default location information
  useEffect(() => loadCurrentLocation(), []);

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

        <LocateBtn onLocateLocation={loadCurrentLocation} isLocateAvailable={isLocateAvailable}/>
      </div>

      {isSearchPlaceModalActive && (
        <div className={styles.searchModalContainer}>
          <SearchPlaceModal
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
