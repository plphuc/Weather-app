import { useState } from 'react';

import MainSection from 'components/MainSection/MainSection';
// import DetailsSection from 'components/DetailsSection/DetailsSection';
import SearchSection from 'components/SearchSection/SearchSection';

import styles from './App.module.css';

function App() {
  const [weatherForecast, setWeatherForecast] = useState({});

  function setWeatherData(weatherForecastObj) {
    setWeatherForecast(weatherForecastObj);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.mainSectionWrapper}>
        <SearchSection onChangeWeatherData={setWeatherData} />

        {Object.keys(weatherForecast).length !== 0 && (
          <MainSection data={weatherForecast.currentWeather} />
        )}
      </div>

      {/* {Object.keys(weatherForecast).length !== 0 && (
        <div className={styles.detailsSectionWrapper}>
          <DetailsSection data={weatherForecast} />
        </div>
      )} */}
    </div>
  );
}

export default App;
