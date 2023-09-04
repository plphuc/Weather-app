import { useContext, createContext, useReducer } from 'react';

import * as fetchApi from 'utils/getRequests';

const fetchWeather = async (longitude, latitude) => {
  const currentWeatherForecast = await fetchApi.getCurrentWeather(longitude, latitude);

  const nextDaysWeatherForecast = await fetchApi.getNextDaysForecast(longitude, latitude);
  return { currentWeatherForecast, nextDaysWeatherForecast };
};

const WeatherContext = createContext();
const WeatherDispatchContext = createContext();

const initialWeatherInfo = {
  currentWeatherForecast: null,
  nextDaysWeatherForecast: null,
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
  const dispatch = useWeatherInfoDispatch()
  return (lon, lat) => {
    const weatherForecast = fetchWeather(lon, lat);
    weatherForecast.then((data) => {
      dispatch({
        type: 'change',
        data,
      });
    });
  };
}

function weatherInfoReducer(state, action) {
  switch (action.type) {
    case 'change': {
      return {
        ...state,
        currentWeatherForecast: action.data.currentWeatherForecast,
        nextDaysWeatherForecast: action.data.nextDaysWeatherForecast,
      };
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
