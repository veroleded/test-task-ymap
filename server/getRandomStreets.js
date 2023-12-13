import axios from 'axios';
import randomItengers from './helpers/randomItengers.js';

const footWays = ['footway', 'bridleway', 'steps', 'corridor', 'path', 'via_ferrata'];

export default async (point, radius = 1000) => {
  const overpassQuery = `
    [out:json];
    (
      way["highway"](around:${radius},${point[1]},${point[0]});
      way["highway"~"motorway|trunk|primary|secondary|tertiary|unclassified|residential|living_street|service|track|path|cycleway|footway|bridleway|steps|pedestrian|corridor|platform|raceway"](around:${radius},${point[1]},${point[0]});
    );
    out body;
  `;

  const response = await axios.get('http://overpass-api.de/api/interpreter', {
    params: {
      data: overpassQuery,
    },
  });
  const streets = response.data.elements.filter((element) => element.type === 'way');

  const filterStreet = streets.filter((street) => {
    const hasName = street.tags.name
    const isForCar = footWays.every((way) => way !== street.tags.highway);

    return isForCar && hasName;
  });

  const randomStreets = randomItengers(0, filterStreet.length - 1, 5).map((num) => filterStreet[num]);
  return randomStreets;
};
