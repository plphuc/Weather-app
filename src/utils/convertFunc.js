const options = {
  weekday: 'short',
  day: '2-digit',
  month: 'short',
};

export function convertKevinToCelcius(temperature) {
  return temperature - 273.15;
}

export const formatDateString = (dateString) => new Date(dateString).toLocaleDateString(undefined, options);

export function convertDegreesToCompass(degrees) {
  const directions = ["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
  const index = Math.floor((degrees*2 / 45)+0.5) % 8;
  return directions[index];
}