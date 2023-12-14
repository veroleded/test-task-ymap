import * as turf from '@turf/turf';
import randomItengers from './randomItengers.js';

export default (nodes) => {
  const line = turf.lineString(nodes.map((node) => [node.lat, node.lon]));

  const length = turf.length(line);

  const distance = randomItengers(0, length * 1000) / 1000;

  const point = turf.along(line, distance);

  // const nearestPoints = turf.nearestPointOnLine(line, point.geometry.coordinates);

  let nearestPoint = [];
  line.geometry.coordinates.forEach((coord, i) => {
    if (i === 0) {
      nearestPoint = coord;
    } else {
      const distance = turf.distance(point.geometry.coordinates, coord);
      const oldDistance = turf.distance(point.geometry.coordinates, nearestPoint);
      if (distance > oldDistance) {
        nearestPoint = coord;
      }
    }
  });

  console.log(1, line.geometry.coordinates);
  console.log(2, nearestPoint);

  const direction = calculateBearing(point.geometry.coordinates[0], point.geometry.coordinates[1], nearestPoint[0], nearestPoint[1]);

  return { line, nearestPoint, coords: point.geometry.coordinates, direction };
};


function calculateBearing(lat1, lon1, lat2, lon2) {
  const dLon = (lon2-lon1) * Math.PI / 180;
  lat1 = lat1 * Math.PI / 180;
  lat2 = lat2 * Math.PI / 180;

  const y = Math.sin(dLon) * Math.cos(lat2);
  const x = Math.cos(lat1)*Math.sin(lat2) -
          Math.sin(lat1)*Math.cos(lat2)*Math.cos(dLon);
  const brng = Math.atan2(y, x) * 180 / Math.PI;
  return (brng + 360) % 360;
}
