import { isNotNumber } from './utils';

interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

interface ExerciseValues {
  exerciseData: number[]
  target: number
}

const parseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  args.slice(2).forEach((arg) => {
    if (isNotNumber(arg)) throw new Error('Provided values were not numbers');
  });

  return {
    exerciseData: args.slice(3).map((arg) => Number(arg)),
    target: Number(args[2]),
  };
};

const analyze = (exerciseData: number[], target: number): Result => {
  const periodLength = exerciseData.length;
  const trainingDays = exerciseData.filter((day) => day !== 0).length;
  const average = exerciseData.reduce((acc, cur) => acc + cur) / periodLength;
  const success = average >= target;
  const rating = average < target - 0.5 * target ? 1 : !success ? 2 : 3;
  const ratingDescription =
    rating === 3 ? 'good' : rating === 2 ? 'okay' : 'bad';

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { exerciseData, target } = parseArguments(process.argv);
  console.log(analyze(exerciseData, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
