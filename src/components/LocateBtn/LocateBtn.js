import React from 'react';
import { BiCurrentLocation } from 'react-icons/bi';

import styles from './LocateBtn.module.css';

function LocateBtn(props) {
  const { onLocateLocation, isLocateAvailable } = props;
  const isLocateAvailableClass = isLocateAvailable ? styles.currentLocationIcon : styles.disabledLocation;

  return (
    <button className={styles.currentLocationBtn} onClick={onLocateLocation}>
      <span className={isLocateAvailableClass}>
        <BiCurrentLocation size={27} />
      </span>
    </button>
  );
}

export default LocateBtn;
