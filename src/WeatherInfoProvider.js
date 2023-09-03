import { useContext, createContext, useReducer } from 'react';

const WeatherContext = createContext();
const WeatherDispatchContext = createContext();

const initialWeatherInfo = {
  currentWeatherForecast: null,
  nextDaysWeatherForecast: null,
};

export function WeatherInfoProvider({ children }) {
  const [weather, dispatch] = useReducer(
    weatherInfoReducer,
    initialWeatherInfo
  );

  return (
    <WeatherContext.Provider value={weather}>
      <WeatherDispatchContext.Provider value={dispatch}>
        {children}
      </WeatherDispatchContext.Provider>
    </WeatherContext.Provider>
  );
}

export function useWeatherInfo() {
  return useContext(WeatherContext);
}

export function useWeatherDispatch() {
  return useContext(WeatherDispatchContext);
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
