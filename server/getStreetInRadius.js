import axios from 'axios';
import getDistanceFromLatLonInKm from './helpers/getDistanceFromLatLonInKm.js';

export default async (url, coords, radius = 1) => {
  let nextPageUrl = url;
  let allResults = [];

  while (nextPageUrl) {
    const response = await axios.get(nextPageUrl);
    const data = response.data;

    allResults = allResults.concat(data.response.GeoObjectCollection.featureMember);

    // Получаем ссылку на следующую страницу
    const nextPage =
      data.response.GeoObjectCollection.metaDataProperty.GeocoderResponseMetaData.SearchResponse?.page?.find(
        (p) => p.name === 'nextPage',
      );
    nextPageUrl = nextPage ? nextPage.url : null;
  }
  const roads = allResults.map((res) => res.GeoObject);
  const filterRoads = roads.filter((road) => {
    const coordinates = road.Point.pos.split(' ').map(Number);
    return getDistanceFromLatLonInKm(coords, coordinates) <= radius;
  })

  return roads;
};
