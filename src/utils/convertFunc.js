export function convertKevinToCelcius(temperature) {
  return temperature - 273.15;
}

export function formatDateString(dateString) {
  const dateObj = new Date(dateString);
  const options = {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
  };
  const formattedDate = dateObj.toLocaleDateString(undefined, options)
  return formattedDate;
}
