import WeatherIcon from 'components/WeatherIcon/WeatherIcon';
import * as utilsFunc from 'utils/convertFunc';

import styles from './WeatherCard.module.css';

function WeatherCard(props) {
  const { weatherForecast } = props;
  const { date, iconName, temperatureMax, temperatureMin } = weatherForecast;
  const formatedDate = utilsFunc.formatDateString(date);
  const convertedTemperatureMax = Math.round(utilsFunc.convertKevinToCelcius(temperatureMax));
  const convertedTemperatureMin = Math.round(utilsFunc.convertKevinToCelcius(temperatureMin));

  return (
    <div className={styles.wrapper}>
      <span className={styles.dateInfo}>{formatedDate}</span>
      <span className={styles.weatherIcon}>
        <WeatherIcon iconName={iconName} />
      </span>
      <div className={styles.weatherTemperature}>
        <span className={styles.maxTemperature}>{convertedTemperatureMax}°C</span>
        <span className={styles.minTemperature}>{convertedTemperatureMin}°C</span>
      </div>
    </div>
  );
}

export default WeatherCard;
