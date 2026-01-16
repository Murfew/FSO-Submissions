import express from 'express';
import { isNotNumber } from './utils';
import { calculateBmi } from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (!height || isNotNumber(height)) {
    res
      .status(400)
      .send({ error: 'Height must be provided and must be a number' });
  }

  if (!weight || isNotNumber(weight)) {
    res
      .status(400)
      .send({ error: 'Weight must be provided and must be a number' });
  }

  res.send({
    weight,
    height,
    bmi: calculateBmi(Number(height), Number(weight)),
  });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
