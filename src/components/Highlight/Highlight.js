import React from 'react';
import { MdAssistantNavigation } from 'react-icons/md';

import { useWeatherInfo } from 'WeatherInfoProvider';
import * as utilsFunc from 'utils/convertFunc';
import HighlightCard from 'components/HighlightCard/HighlightCard';
import ProgressBar from 'components/ProgressBar/ProgressBar';
import styles from './Highlight.module.css';

function WindStatus(props) {
  const { windSpeed, windDirection } = props;
  return (
    <HighlightCard title="Wind Status">
      <span className={styles.valueInfo}>{windSpeed}mps</span>
      <div className={styles.windDirectionWrapper}>
        <div className={styles.windDirectionIcon}>
          <MdAssistantNavigation />
        </div>
        <span>{windDirection}</span>
      </div>
    </HighlightCard>
  );
}

function HumidityStatus(props) {
  const { humidity } = props;
  return (
    <HighlightCard title="Humidity">
      <span className={styles.valueInfo}>{humidity}%</span>
      <div className={styles.humidBarWrapper}>
        <ProgressBar humidityPercentage={humidity} progressBarClass={styles.humidBarContainer} />
      </div>
    </HighlightCard>
  );
}

function SpecifiedHighlightCard(props) {
  const { title, value } = props;
  return (
    <HighlightCard title={title}>
      <span className={styles.valueInfo}>{value}</span>
    </HighlightCard>
  );
}
function Highlight(props) {
  const { current } = useWeatherInfo();
  const windDirection = utilsFunc.convertDegreesToCompass(current.windInfo.deg);
  const visibilityInKm = (current.visibility / 1000).toFixed(1);
  return (
    <div className={styles.todayHighLightWrapper}>
      <span className={styles.todayHighLightTitle}>Today's Highlights</span>

      <div className={styles.todayHighLightContainer}>
        <WindStatus windSpeed={current.windInfo.speed} windDirection={windDirection} />
        <HumidityStatus humidity={current.humidity} />
        <SpecifiedHighlightCard title="Visibility" value={`${visibilityInKm} km`} />
        <SpecifiedHighlightCard title="Air Pressure" value={`${current.airPressure} mb`} />
      </div>
    </div>
  );
}

export default Highlight;
