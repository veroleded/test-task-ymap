import axios from 'axios';

export default async (nodeIds) => {
  let overpassQuery = '[out:json];\n(';
  nodeIds.forEach((id) => {
    overpassQuery += `node(${id});\n`;
  });
  overpassQuery += ');\nout body;\n>;\nout skel qt;';

  const response = await axios.get('http://overpass-api.de/api/interpreter', {
    params: {
      data: overpassQuery,
    },
  });
  const result = response.data.elements.map((el) => ({ lat: el.lat, lon: el.lon }));

  return result;
};
