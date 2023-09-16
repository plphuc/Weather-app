import { useContext, createContext, useReducer } from 'react';

import * as fetchApi from 'utils/getRequests';

const isNextDay = (nextDayForecastList, currentDay, dateString) => {
  const date = new Date(dateString);
  if (nextDayForecastList.length === 0) {
    return currentDay.getDate() !== date.getDate();
  }
  return date.getDate() !== nextDayForecastList[nextDayForecastList.length - 1]?.date.getDate();
};

const extractInfoFromWeatherObj = (weatherInfoObj) => {
  console.log(weatherInfoObj);
  return {
    date: new Date(weatherInfoObj.dt_txt || weatherInfoObj.dt * 1000),
    iconName: weatherInfoObj.weather[0].icon,
    weatherName: weatherInfoObj.weather[0].main,
    temperature: weatherInfoObj.main.temp,
    temperatureMax: weatherInfoObj.main.temp_max,
    temperatureMin: weatherInfoObj.main.temp_min,
    windInfo: weatherInfoObj.wind,
    humidity: weatherInfoObj.main.humidity,
    visibility: weatherInfoObj.visibility,
    airPressure: weatherInfoObj.main.pressure,
  };
};

const extractWeatherInfoFromFetch = ({ current, nextDays }) => {
  const currentDay = new Date(current.dt * 1000);

  const nextDayForecastList = nextDays.list.reduce((nextDayForecastList, weatherForecastInDay) => {
    if (!isNextDay(nextDayForecastList, currentDay, weatherForecastInDay.dt_txt)) {
      return nextDayForecastList;
    }
    const nextDayForecast = extractInfoFromWeatherObj(weatherForecastInDay);
    return [...nextDayForecastList, nextDayForecast];
  }, []);

  return { location: current.name, current: extractInfoFromWeatherObj(current), nextDays: nextDayForecastList };
};

const fetchWeather = async (longitude, latitude) => ({
  current: await fetchApi.getCurrentWeather(longitude, latitude),
  nextDays: await fetchApi.getNextDaysForecast(longitude, latitude),
});

const WeatherContext = createContext();
const WeatherDispatchContext = createContext();

const initialWeatherInfo = {
  location: null,
  current: null,
  nextDays: null,
};

export function WeatherInfoProvider({ children }) {
  const [weather, dispatch] = useReducer(weatherInfoReducer, initialWeatherInfo);

  return (
    <WeatherContext.Provider value={weather}>
      <WeatherDispatchContext.Provider value={dispatch}>{children}</WeatherDispatchContext.Provider>
    </WeatherContext.Provider>
  );
}

export function useWeatherInfo() {
  return useContext(WeatherContext);
}

function useWeatherInfoDispatch() {
  return useContext(WeatherDispatchContext);
}

export function useUpdateWeather() {
  const dispatch = useWeatherInfoDispatch();
  return (lon, lat) =>
    fetchWeather(lon, lat).then((data) => {
      dispatch({
        type: 'change',
        data: extractWeatherInfoFromFetch(data),
      });
    });
}

function weatherInfoReducer(state, action) {
  switch (action.type) {
    case 'change': {
      return {
        ...state,
        location: action.data.location,
        current: action.data.current,
        nextDays: action.data.nextDays,
      };
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
