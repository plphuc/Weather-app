import { useEffect, useState } from 'react';
import { BiCurrentLocation } from 'react-icons/bi';

import SearchPlaceModal from 'components/SearchPlaceModal/SearchPlaceModal';
import { keyAPI } from 'components/config';

import styles from './SearchSection.module.css';
import 'index.css';

function Search() {
  const [isSearchPlaceModalActive, setIsSearchPlaceModalActive] =
    useState(false);
  const [isFindCurrentLocation, setIsFindCurrentLocation] = useState(true);
  const [locationInfo, setLocationInfo] = useState();

  // Show/Hide Search Modal
  let searchPlaceModalElement = styles.searchModalContainer;
  if (isSearchPlaceModalActive) {
    searchPlaceModalElement += ' displayItem';
  } else {
    searchPlaceModalElement += ' hideItem';
  }

  function showCurrentLocation() {
    setIsFindCurrentLocation(true);
  }

  // Get current location information
  useEffect(() => {
    function showPosition(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      response(latitude, longitude).then((data) => {
        setLocationInfo(data);
        setIsFindCurrentLocation(false);
        localStorage.setItem('currentLocationInfo', JSON.stringify(data));
      });
    }

    const response = async (latitude, longitude) => {
      const result = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${keyAPI}`
      );
      return result.json();
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }, [isFindCurrentLocation]);

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
          onClick={showCurrentLocation}
        >
          <span className={styles.currentLocationIcon}>
            <BiCurrentLocation size={27} />
          </span>
        </button>
      </div>

      <div className={searchPlaceModalElement}>
        <SearchPlaceModal
          onChooseLocation={setLocationInfo}
          onCloseModal={() => {
            setIsSearchPlaceModalActive(false);
          }}
        />
      </div>
    </div>
  );
}

export default Search;
