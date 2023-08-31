export function convertKevinToCelcius(tempDegree) {
  return Math.round(tempDegree - 273.15)
}

export function convertEpochToDate(epochTime) {
  const date = new Date(epochTime * 1000);
  const convertedDate = date.toString().split(' ');
  return convertedDate[0] + ', ' + convertedDate[2] + ' ' + convertedDate[1];
}