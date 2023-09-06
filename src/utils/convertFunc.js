const options = {
  weekday: 'short',
  day: '2-digit',
  month: 'short',
};

export function convertKevinToCelcius(temperature) {
  return temperature - 273.15;
}

export const formatDateString = (dateString) => new Date(dateString).toLocaleDateString(undefined, options);
