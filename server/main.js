import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

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


  console.log(coords);
  try {
    const response = await axios.get(
      `https://geocode-maps.yandex.ru/1.x/?apikey=${process.env.API_KEY}=${coords[0]},${coords[1]}&kind=street`,
    );
    const roads = response.data.response.GeoObjectCollection.featureMember;
    // console.log(roads)
    roads.forEach((road) => console.log(road.GeoObject));
  } catch (e) {
    console.log(e);
  }
  // const roads = data.response.GeoObjectCollection.featureMember;
  // const cars = Array.from({length: 5}, () => ({
  //     lat: roads[0].GeoObject.Point.pos.split(' ')[1] + (Math.random() - 0.5) / 10,
  //     lng: roads[0].GeoObject.Point.pos.split(' ')[0] + (Math.random() - 0.5) / 10,
  // }));
  // res.json(cars);

  //  console.log(req.body);
});

app.listen(4000, () => console.log('Server is running on port 4000'));
