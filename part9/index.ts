import express from 'express';
import { isNotNumber } from './utils';
import { calculateBmi } from './bmiCalculator';
import { analyzeExercise } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (!height || isNotNumber(height)) {
    return res
      .status(400)
      .json({ error: 'Height must be provided and must be a number' });
  }

  if (!weight || isNotNumber(weight)) {
    return res
      .status(400)
      .json({ error: 'Weight must be provided and must be a number' });
  }

  return res.json({
    weight,
    height,
    bmi: calculateBmi(Number(height), Number(weight)),
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {dailyExercises, target} = req.body;

  if (!dailyExercises || !target) {
    return res.status(400).json({ error: "parameters missing" });
  }

   
  if (Array.isArray(dailyExercises) && dailyExercises.some(ex => isNotNumber(ex))) {
      return res.status(400).json({error: "malformatted parameters"});
  }

  if (isNotNumber(target)) {
    return res.status(400).json({error: "malformatted parameters"});
  }

  const exerciseResult = analyzeExercise(dailyExercises as number[], target as number);
  return res.json(exerciseResult);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
