import { useState, useEffect } from 'react';
import { IoClose, IoSearch } from 'react-icons/io5';

import { keyAPI } from 'components/config';
import useDebounce from 'hooks/useDebounce';

import styles from './SearchPlaceModal.module.css';

function SearchPlaceModal(props) {
  const { handleCloseModal, handleChooseLocation } = props;
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const debounced = useDebounce(searchValue, 500);

  function handleChooseItem(data) {
    setSearchResult([]);
    setSearchValue('');
    handleChooseLocation(data);
    handleCloseModal();
  }

  function handleSearchInput(e) {
    const searchWords = e.target.value;

    if (!searchWords.startsWith(' ')) {
      setSearchValue(searchWords);
    }
  }

  useEffect(() => {
    if (!debounced.trim()) {
      setSearchResult([]);
      return;
    }

    const response = async () => {
      const result = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${searchValue}&limit=5&appid=${keyAPI}`
      );
      return result.json();
    };

    try {
      response().then((data) => {
        setSearchResult(data);
      });
    } catch {
      alert("Can't find location");
    }
    // eslint-disable-next-line
  }, [debounced]);
  return (
    <div className={styles.wrapper}>
      <div className={styles.closeModal}>
        <span className={styles.closeIcon} onClick={handleCloseModal}>
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
            value={searchValue}
            onInput={handleSearchInput}
          />
        </div>
      </div>

      <div className={styles.locationWrapper}>
        <div className={styles.locationHeader}>Location</div>

        <div id="locationList" className={styles.locationList}>
          {searchResult.map((location, idx) => {
            return (
              <div
                className={styles.locationItem}
                key={idx}
                onClick={() => handleChooseItem(location)}
              >
                <span className={styles.searchIcon}>
                  <IoSearch size={24} />
                </span>
                <span className={styles.locationName}>
                  {location.name} {location.state && `- ${location.state}`}{' '}
                  {location.country && `- ${location.country}`}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SearchPlaceModal;
