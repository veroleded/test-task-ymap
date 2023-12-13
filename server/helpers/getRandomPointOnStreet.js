import * as turf from '@turf/turf';
import randomItengers from './randomItengers.js';

export default (nodes) => {
  const line = turf.lineString(nodes.map((node) => [node.lat, node.lon]));

  const length = turf.length(line);

  let distance = Math.random() * length;
  while (distance > length) {
    distance = Math.random() * length;
  }
  const point = turf.along(line, distance);

  const nearestPoints = turf.nearestPointOnLine(line, point.geometry.coordinates);

  const direction = turf.bearing(point.geometry.coordinates, nearestPoints.geometry);


  return { coords: point.geometry.coordinates, direction };
};
