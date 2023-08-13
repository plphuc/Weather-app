import { useEffect, useState } from 'react';
import { BiCurrentLocation } from 'react-icons/bi';

import SearchPlaceModal from 'components/SearchPlaceModal/SearchPlaceModal';
import * as fetchApi from 'utils/getRequests';
import styles from './SearchSection.module.css';

function Search() {
  const [isSearchPlaceModalActive, setIsSearchPlaceModalActive] =
    useState(false);
  const [locationInfo, setLocationInfo] = useState();
  const [isLocateAvailable, setIsLocateAvailable] = useState(true);

  const getCurrentLocation = function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      setIsLocateAvailable(false);
    }

    function showPosition(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      const getLocationInfo = async (longitude, latitude) => {
        const result = await fetchApi.getLocationInfo(longitude, latitude);
        setLocationInfo(result);
        localStorage.setItem('currentLocationInfo', JSON.stringify(result));
      };
      getLocationInfo(longitude, latitude);
    }

    function showError() {
      setIsLocateAvailable(false)
    }
  };

  function handleGetCurrentLocation() {
    getCurrentLocation();
  }
  // Get default location information
  useEffect(() => {
    getCurrentLocation();
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
          onClick={handleGetCurrentLocation}
        >
          <span
            className={
              isLocateAvailable
                ? styles.currentLocationIcon
                : styles.disabledLocation
            }
          >
            <BiCurrentLocation size={27} />
          </span>
        </button>
      </div>

      {isSearchPlaceModalActive && (
        <div className={styles.searchModalContainer}>
          <SearchPlaceModal
            onChooseLocation={setLocationInfo}
            onCloseModal={() => {
              setIsSearchPlaceModalActive(false);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default Search;
