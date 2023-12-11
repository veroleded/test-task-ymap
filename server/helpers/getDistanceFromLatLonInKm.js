const deg2rad = (deg) => deg * (Math.PI / 180);

export default (point1, point2) => {
  const R = 6371; // Радиус Земли в километрах
  const dLat = deg2rad(point2[0] - point1[0]);
  const dLon = deg2rad(point2[1] - point1[1]);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(point1[0])) * Math.cos(deg2rad(point2[0])) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Расстояние в километрах
  // console.log(d);
  return d;
};
