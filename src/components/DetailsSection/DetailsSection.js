import React from 'react';

import { useWeatherInfo } from 'WeatherInfoProvider';
import WeatherCard from 'components/WeatherCard/WeatherCard';
import Highlight from 'components/Highlight/Highlight';

import styles from './DetailsSection.module.css';
function DetailsSection(props) {
  const { current, nextDays } = useWeatherInfo();
  return (
    <>
      {current && nextDays && <div className={styles.detailsSectionWrapper}>
        <div className={styles.nextDaysForecastWrapper}>
          {nextDays.map((weatherForecastInDay) => {
            return <WeatherCard weatherForecast = {weatherForecastInDay}/>
          })}
        </div>
        <Highlight />
      </div>}
    </>
  );
}

export default DetailsSection;
