import { useContext } from 'react';
import { createContext, useReducer } from 'react';

const weatherContext = createContext();
const weatherDispatchContext = createContext();

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
    <weatherContext.Provider value={weather}>
      <weatherDispatchContext.Provider value={dispatch}>
        {children}
      </weatherDispatchContext.Provider>
    </weatherContext.Provider>
  );
}

export function useWeatherInfo() {
  return useContext(weatherContext);
}

export function useWeatherDispatch() {
  return useContext(weatherDispatchContext);
}

function weatherInfoReducer(state, action) {
  switch (action.type) {
    case 'change': {
      return {
        ...state,
        currentWeatherForecast: action.currentWeatherForecast,
        nextDaysWeatherForecast: action.nextDaysWeatherForecast
      }
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
