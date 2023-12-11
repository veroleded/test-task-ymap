import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
import getAllStreetInRadius from './getStreetInRadius.js';
import getDistanceFromLatLonInKm from './helpers/getDistanceFromLatLonInKm.js';
import getLatLonDiff from './helpers/getLanLonDiff.js';

dotenv.config();

const app = express();
app.use(
  cors({
    origin: 'http://127.0.0.1:5500',
  }),
);
app.use(express.json());

app.post('/getCars', async (req, res) => {
  const { coords, direction, radius } = req.body;

  // const ll = getLatLonDiff(coords, radius);
  // const yMapStreetUrl = `https://geocode-maps.yandex.ru/1.x/?apikey=${process.env.API_KEY}&format=json&geocode=${coords[0]},${coords[1]}&kind=street&results=50&`;

  console.log(coords);
  try {
    const lat = coords[1];
    const lon = coords[0];
    const radiusInM = 1000; // в метрах

    // Создаем запрос
    const query = `
  [out:json];
  way
    ["highway"]
    (around:${radiusInM},${lat},${lon});
  out body;
`;

    // Выполняем запрос
    axios
      .get('https://overpass-api.de/api/interpreter', {
        params: {
          data: query,
        },
      })
      .then((response) => {
        console.log(response.data);
        // Выводим найденные улицы
        const filterRoads = response.data.elements.filter((element) => {
          return element.name;
        });
        console.log(filterRoads);
      })
      .catch((err) => {
        console.error(err);
      });

    // const roads = await getAllStreetInRadius(yMapStreetUrl, coords, radius);

    // console.log(roads);
  } catch (e) {
    console.log(e);
  }
});

app.listen(4000, () => console.log('Server is running on port 4000'));
