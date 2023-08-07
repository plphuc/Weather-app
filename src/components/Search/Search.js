import CurrentLocation from 'components/CurrentLocation/CurrentLocation';
import styles from './Search.module.css';
import locationStyles from '../ModalSearchplace/ModalSearchPlace.module.css';
import { useState } from 'react';
import ModalSearchPlace from 'components/ModalSearchplace/ModalSearchPlace';

function Search() {
  const [currentLocation, setCurrentLocation] = useState('undefined');
  const [findLocationName, setFindLocationName] = useState('');
  // const [isSearchPlaceActive, setIsSearchPlaceActive] = useState(true)

  function activeFindLocationModal() {
    const modalSearchElement = document.querySelector(`.${styles.searchModalContainer}`);
    const inputSearchElement = document.querySelector('#searchInput');
    const locationElements = document.querySelector('#locationList').querySelectorAll(`div[class='${locationStyles.locationItem}']`);

    modalSearchElement.style.display = 'block';
    inputSearchElement.value = '';
    for (let i = 0; i < locationElements.length; i++) {
      locationElements[i].style.display = '';
    }
  }

  function deactiveFindLocationModal() {
    const modalSearchElement = document.querySelector(`.${styles.searchModalContainer}`);

    modalSearchElement.style.display = 'none';
  }

  function handleFindCurrentLocation() {
    // Do something to find location
    setCurrentLocation('vietnam');
  }

  function handleFindLocation(e) {
    setFindLocationName(e.target.innerText);

    const modalSearchElement = document.querySelector(`.${styles.searchModalContainer}`);
    modalSearchElement.style.display = 'none';
  }

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.searchContainer}>
          <button
            className={styles.searchPlaceBtn}
            onClick={activeFindLocationModal}
          >
            <span>Search For Places</span>
          </button>

          <CurrentLocation handleClicked={handleFindCurrentLocation} />
        </div>

        <div className={styles.searchModalContainer}>
          <ModalSearchPlace
            handleFindLocation={handleFindLocation}
            handleClose={deactiveFindLocationModal}
          />
        </div>
      </div>
    </>
  );
}

export default Search;
