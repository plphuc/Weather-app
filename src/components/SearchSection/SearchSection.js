import { useState } from 'react';

import SearchPlaceModal from 'components/SearchPlaceModal/SearchPlaceModal';
import LocateButton from 'components/LocateButton/LocateButton';

import styles from './SearchSection.module.css';

function SearchSection(props) {
  const [isSearchPlaceModalActive, setIsSearchPlaceModalActive] = useState(false);

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

        <LocateButton />
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
