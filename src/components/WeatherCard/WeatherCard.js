import WeatherIcon from "components/WeatherIcon/WeatherIcon";
import * as utilsFunc from "utils/convertFunc";

import styles from "./WeatherCard.module.css";
import classNames from "classnames";

function WeatherCard(props) {
  const { weatherForecast } = props;
  const { date, iconName, temperatureMax, temperatureMin } = weatherForecast;
  const formatedDate = utilsFunc.formatDateString(date);
  const convertedTemperatureMax = Math.round(
    utilsFunc.convertKevinToCelcius(temperatureMax),
  );
  const convertedTemperatureMin = Math.round(
    utilsFunc.convertKevinToCelcius(temperatureMin),
  );

  return (
      <div className="card cursor-pointer bg-slate-200 min-w-[130px]">
        <div className="card-body hover:scale-105 duration-300">
          <span className="text-slate-800 text-center">{formatedDate}</span>
          <span className={styles.weatherIcon}>
            <WeatherIcon iconName={iconName} />
          </span>
          <div className={styles.weatherTemperature}>
            <span className="text-slate-600">{convertedTemperatureMax}°C</span>
            <span className="text-slate-600">{convertedTemperatureMin}°C</span>
          </div>
        </div>
      </div>
  );
}

export default WeatherCard;
