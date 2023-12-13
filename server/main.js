import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import getRandomStreets from './getRandomStreets.js';
import getNodes from './getNodes.js';
import getRandomPointOnStreet from './helpers/getRandomPointOnStreet.js';

dotenv.config();

const app = express();
app.use(
  cors({
    origin: 'http://127.0.0.1:5500',
  }),
);
app.use(express.json());

app.post('/getCars', async (req, reply) => {
  const { coords, radius } = req.body;
  try {
    const roads = await getRandomStreets(coords, radius);
    const roadsNodesPoints = await Promise.all(
      roads.map(async (road) => {
        const nodes = (await getNodes(road.nodes));
        return { ...road, nodes };
      }),
    );

    const randomPoints = roadsNodesPoints.map((road) => getRandomPointOnStreet(road.nodes));
    // console.log(randomPoints);
    const res = randomPoints.map((point) => ({...point , coords: [point.coords[1], point.coords[0]] }))
    reply.json(res);

  } catch (e) {
    console.log(e);
  }
});

app.listen(4000, () => console.log('Server is running on port 4000'));
