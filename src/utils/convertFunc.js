export function convertKevinToCelcius(temperature) {
  return temperature - 273.15;
}

export function convertEpochToDateObj(epochTime) {
  const date = new Date(epochTime * 1000);
  return date;
}

export function formatEpochToDateString(epochTime) {
  const convertedDate = convertEpochToDateObj(epochTime);
  const options = {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
  };
  const formattedDate = convertedDate.toLocaleDateString(undefined, options)
  return formattedDate;
}
