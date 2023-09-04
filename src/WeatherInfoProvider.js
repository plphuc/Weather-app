import { useContext, createContext, useReducer } from 'react';

import * as fetchApi from 'utils/getRequests';

const extractInfoFromWeatherObj = (weatherInfoObj) => {
  const date = new Date(weatherInfoObj.dt_txt || weatherInfoObj.dt * 1000);
  const iconName = weatherInfoObj.weather[0].icon;
  const weatherName = weatherInfoObj.weather[0].main;
  const temperature = weatherInfoObj.main.temp;

  return { date, iconName, weatherName, temperature };
};

const extractWeatherInfoFromFetch = ({ currentWeatherForecast, nextDaysWeatherForecast }) => {
  const nextDaysForecast = [];
  nextDaysWeatherForecast.list.forEach((weatherForecastInDay) => {
    const date = new Date(weatherForecastInDay.dt_txt);

    // Just add a weather forecast for a day
    if (nextDaysForecast.length === 0 || date.getDate() !== nextDaysForecast[nextDaysForecast.length - 1].date.getDate()) {
      const nextDayForecast = extractInfoFromWeatherObj(weatherForecastInDay);
      nextDaysForecast.push(nextDayForecast);
    }
  });
  const location = currentWeatherForecast.name;

  return { location, current: extractInfoFromWeatherObj(currentWeatherForecast), nextDays: nextDaysForecast };
};

const fetchWeather = async (longitude, latitude) => {
  const currentWeatherForecast = await fetchApi.getCurrentWeather(longitude, latitude);
  const nextDaysWeatherForecast = await fetchApi.getNextDaysForecast(longitude, latitude);

  return { currentWeatherForecast, nextDaysWeatherForecast };
};

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
  return (lon, lat) => {
    const weatherForecast = fetchWeather(lon, lat);
    weatherForecast.then((data) => {
      const extractedWeatherInfo = extractWeatherInfoFromFetch(data);
      dispatch({
        type: 'change',
        data: extractedWeatherInfo,
      });
    });
  };
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
