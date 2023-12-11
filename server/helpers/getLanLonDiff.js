export default function getLatLonDiff(point, radius) {
  // const R = 6371; // Радиус земли в километрах
  // const d = radius / R; // Переводим радиус в градусы

  // const lat1 = deg2rad(point[0]);
  // const lon1 = deg2rad(point[1]);

  // const latMin = deg2rad(point[0] - d * 180 / Math.PI);
  // const latMax = deg2rad(point[0] + d * 180 / Math.PI);

  // const lonMin = deg2rad(point[1] - d * 180 / Math.PI / Math.cos(lat1));
  // const lonMax = deg2rad(point[1] + d * 180 / Math.PI / Math.cos(lat1));

  // console.log([rad2deg(latMax - latMin), rad2deg(lonMax - lonMin)])

  // return [rad2deg(latMax - latMin), rad2deg(lonMax - lonMin)];


  const lat1 = point[0] * Math.PI / 180;
  const lon1 = point[1] * Math.PI / 180;

  // Радиус Земли в км
  const R = 6371.0;

  // Разница между максимальной и минимальной долготой
  const dLon = 2 * Math.atan2(Math.sqrt(Math.pow(Math.sin(radius / (2 * R)), 2) / Math.pow(Math.cos(lat1), 2)), Math.sqrt(1 - (Math.pow(Math.sin(radius / (2 * R)), 2) / Math.pow(Math.cos(lat1), 2))));

  // Разница между максимальной и минимальной широтой
  const dLat = radius / R;
  // console.log([dLon, dLat])
  return [dLon, dLat];
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function rad2deg(rad) {
  return rad * (180 / Math.PI);
}