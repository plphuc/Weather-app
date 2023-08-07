import { BiCurrentLocation } from 'react-icons/bi';

import styles from './CurrentLocation.module.css';

function CurrentLocation({handleClicked}) {
  return (
    <>
      <button 
          className={styles.currentLocationBtn} 
          onClick={handleClicked}
      >
        <span className={styles.currentLocationIcon}>
          <BiCurrentLocation size={27} />
        </span>

      </button>
    </>
  );
}

export default CurrentLocation;
