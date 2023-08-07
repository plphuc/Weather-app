import { IoClose, IoSearch } from 'react-icons/io5';
// import { IoIosArrowForward } from "react-icons/io";

import styles from './ModalSearchPlace.module.css';

const locationSelect = ['LonDon', 'Barcelona', 'Long Beach'];

function ModalSearchPlace() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.closeModal}>
        <IoClose size={24} />
      </div>

      <div className={styles.searchBarWrapper}>
        <div className={styles.searchBar}>
          <span className={styles.searchIcon}>
            <IoSearch size={24} />
          </span>
          <input className={styles.inputSearch} placeholder="search location" />
        </div>

        <div className={styles.searchBtnWrapper}>
          <button className={styles.searchBtn}>Search</button>
        </div>
      </div>

      <div className={styles.locationWrapper}>
        <div className={styles.locationHeader}>Location</div>
        <div className={styles.locationList}>
          {locationSelect.map((location) => {
            return (
              <div className={styles.locationItem}>
                <span className={styles.searchIcon}><IoSearch size={24} /></span>
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
