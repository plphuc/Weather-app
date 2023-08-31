import { createContext, useState } from 'react';

import MainSection from 'components/MainSection/MainSection';
// import DetailsSection from 'components/DetailsSection/DetailsSection';
import SearchSection from 'components/SearchSection/SearchSection';

import styles from './App.module.css';
export const weatherDataContext = createContext();

function App() {
  const [weatherForecast, setWeatherForecast] = useState({});

  return (
    <weatherDataContext.Provider value={weatherForecast}>
      <div className={styles.wrapper}>
        <div className={styles.mainSectionWrapper}>
          <SearchSection onChangeWeatherData={setWeatherForecast} />

          {Object.keys(weatherForecast).length !== 0 && (
            <MainSection />
          )}
        </div>

        {/* {Object.keys(weatherForecast).length !== 0 && (
          <div className={styles.detailsSectionWrapper}>
            <DetailsSection data={weatherForecast} />
          </div>
        )} */}
      </div>
    </weatherDataContext.Provider>
  );
}

export default App;
