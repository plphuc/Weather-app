import React from "react";

import { useWeatherInfo } from "WeatherInfoProvider";
import WeatherCard from "components/WeatherCard/WeatherCard";
import Highlight from "components/Highlight/Highlight";

function DetailsSection(props) {
  const { current, nextDays } = useWeatherInfo();
  if (!current || !nextDays) {
    return;
  }
  return (
    <>
      <div className="w-full flex justify-center items-center pb-[30px]">
        <div className="overflow-x-scroll flex gap-5">
          {nextDays.map((weatherForecastInDay) => (
            <WeatherCard weatherForecast={weatherForecastInDay} />
          ))}
        </div>
      </div>
      <Highlight />
    </>
  );
}

export default DetailsSection;
