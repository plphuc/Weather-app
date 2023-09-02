import MainSection from 'components/MainSection/MainSection';
// import DetailsSection from 'components/DetailsSection/DetailsSection';
import SearchSection from 'components/SearchSection/SearchSection';
import { useWeatherInfo } from 'WeatherInfoProvider';

import styles from './App.module.css';

function App() {
  const weatherInfo = useWeatherInfo();
  return (
    <div className={styles.wrapper}>
      <div className={styles.mainSectionWrapper}>
        <SearchSection />

        {weatherInfo.currentWeatherForecast && weatherInfo.nextDaysWeatherForecast && <MainSection />}
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
