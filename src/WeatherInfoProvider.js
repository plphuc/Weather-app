import { useContext, createContext, useReducer } from 'react';

import * as fetchApi from 'utils/getRequests';

const isNextDay = (nextDayForecastList, currentDay, date) => {
  if (nextDayForecastList.length === 0) {
    return currentDay.getDate() !== date.getDate();
  }
  return date.getDate() !== nextDayForecastList[nextDayForecastList.length - 1]?.date.getDate();
};

const extractInfoFromWeatherObj = (weatherInfoObj) => {
  const date = new Date(weatherInfoObj.dt_txt || weatherInfoObj.dt * 1000);
  const iconName = weatherInfoObj.weather[0].icon;
  const weatherName = weatherInfoObj.weather[0].main;
  const temperature = weatherInfoObj.main.temp;

  return { date, iconName, weatherName, temperature };
};

const extractWeatherInfoFromFetch = ({ current, nextDays }) => {
  const currentDay = new Date(current.dt * 1000);

  const nextDayForecastList = nextDays.list.reduce((nextDayForecastList, weatherForecastInDay) => {
    const date = new Date(weatherForecastInDay.dt_txt);
    if (!isNextDay(nextDayForecastList, currentDay, date)) {
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
