import { useState } from 'react';
import { IoClose, IoSearch } from 'react-icons/io5';

import styles from './SearchPlaceModal.module.css';
import * as fetchApi from 'utils/getRequests';
import debouncedFunc from 'utils/debouncedFunc';

function SearchPlaceModal(props) {
  const { onCloseModal, onChooseLocation } = props;
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState();
  const [isLoading, setIsLoading] = useState(false);

  // Choose item from list
  function handleChooseItem(location) {
    setSearchResult([]);
    setSearchValue('');
    onChooseLocation(location);
  }

  // Query locations from trimmed search input
  const queryLocations = async(trimmedSearchText) => {
    setIsLoading(true);
    const results = await fetchApi.getLocationCoordinates(
      trimmedSearchText
    );
    setSearchResult(results);
    setIsLoading(false);
  }

  // handle when input search location
  function handleSearchInput(e) {
    const searchText = e.target.value;
    const trimmedSearchText = searchText?.trim() ?? '';
    setSearchValue(searchText);
    
    if (trimmedSearchText.length === 0) {
      return;
    }
    const debouncedQueryLocations = debouncedFunc(() => queryLocations(trimmedSearchText), 500);
    debouncedQueryLocations();
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.closeModal}>
        <span className={styles.closeIcon} onClick={onCloseModal}>
          <IoClose size={24} />
        </span>
      </div>

      <div className={styles.searchBarWrapper}>
        <div className={styles.searchBar}>
          {!isLoading ? (
            <span className={styles.searchIcon}>
              <IoSearch size={24} />
            </span>
          ) : (
            <span className={styles.loadingIcon}></span>
          )}

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

        {Array.isArray(searchResult) && (
          <div id="locationList" className={styles.locationList}>
            {searchResult.length > 0 ? (
              searchResult.map((location, idx) => {
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
                      <span>{location.name}</span>
                      <span>{location.state && ` - ${location.state}`} </span>
                      <span>
                        {location.country && ` - ${location.country}`}
                      </span>
                    </span>
                  </div>
                );
              })
            ) : (
              <div className={styles.notFoundNoti}>No Results Found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchPlaceModal;
