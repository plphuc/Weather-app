import { IoClose, IoSearch } from 'react-icons/io5';

import styles from './ModalSearchPlace.module.css';

const locationSelect = ['LonDon', 'Barcelona', 'Long Beach'];

function ModalSearchPlace({ handleFindLocation, handleClose }) {
  function getSearchedLocationItems(inputValue) {
    const locationElements = document.querySelector('#locationList').querySelectorAll(`div[class='${styles.locationItem}']`);
    for (let i = 0; i < locationElements.length; i++) {
      if (locationElements[i].innerText.toLowerCase().indexOf(inputValue) > -1) {
        locationElements[i].style.display = '';
      } else {
        locationElements[i].style.display = 'none';
      }
    }
  }
  
  function handleSearch(e) {
    const searchWords = e.target.value.toLowerCase();
    getSearchedLocationItems(searchWords);
  }

  function handleClickSearchBtn() {
    const inputSearchElement = document.querySelector('#searchInput');
    getSearchedLocationItems(inputSearchElement.value);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.closeModal}>
        <span className={styles.closeIcon} onClick={handleClose}>
          <IoClose size={24} />
        </span>
      </div>

      <div className={styles.searchBarWrapper}>
        <div className={styles.searchBar}>

          <span className={styles.searchIcon}>
            <IoSearch size={24} />
          </span>

          <input
            id="searchInput"
            className={styles.inputSearch}
            placeholder="search location"
            onKeyUp={handleSearch}
          />

        </div>

        <div className={styles.searchBtnWrapper}>
          <button className={styles.searchBtn} onClick={handleClickSearchBtn}>
            Search
          </button>
        </div>
      </div>

      <div className={styles.locationWrapper}>
        
        <div className={styles.locationHeader}>Location</div>

        <div id="locationList" className={styles.locationList}>
          {locationSelect.map((location, idx) => {
            return (
              <div
                className={styles.locationItem}
                key={idx}
                onClick={handleFindLocation}
              >
                <span className={styles.searchIcon}>
                  <IoSearch size={24} />
                </span>
                <span className={styles.locationName}>{location}</span>
                {/* <span className={styles.forwardLocation}><IoIosArrowForward /></span> */}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ModalSearchPlace;
