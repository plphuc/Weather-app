import CurrentLocation from 'components/CurrentLocation/CurrentLocation';
import styles from './Search.module.css';
import SearchPlace from 'components/SearchPlace/SearchPlace';
import { useState } from 'react';
import ModalSearchPlace from 'components/ModalSearchplace/ModalSearchPlace';

function Search() {
  const [currentLocation, setCurrentLocation] = useState('undefined');
  // const [isSearchPlaceActive, setIsSearchPlaceActive] = useState(true)
  function handleFindCurrentLocation() {
    // Do something to find location
    setCurrentLocation('vietnam');
  }
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.searchContainer}>
          <SearchPlace />
          <CurrentLocation handleClicked={handleFindCurrentLocation} />
        </div>

        <div className={styles.searchModalContainer}>
          <ModalSearchPlace />
        </div>

        {/* For test */}
        <span style={{ color: 'red' }}>{currentLocation}</span>
      </div>
    </>
  );
}

export default Search;
