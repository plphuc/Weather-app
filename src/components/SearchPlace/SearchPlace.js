import styles from './SearchPlace.module.css'
function SearchPlace() {
  return (
    <>
      <button className={styles.searchPlaceBtn}>
        <span>Search For Places</span>
      </button>
    </>
  );
}

export default SearchPlace;
