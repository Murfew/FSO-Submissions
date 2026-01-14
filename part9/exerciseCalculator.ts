interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const analyze = (exerciseData: number[], target: number): Result => {
  const periodLength = exerciseData.length
  const trainingDays = exerciseData.filter((day) => day !== 0).length
  const average = exerciseData.reduce((acc, cur) => acc + cur) / periodLength
  const success = average >= target
  const rating = average < target - 0.5 * target ? 1 : !success ? 2 : 3
  const ratingDescription =
    rating === 3 ? 'good' : rating === 2 ? 'okay' : 'bad'

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  }
}

console.log(analyze([3, 0, 2, 4.5, 0, 3, 1], 2))
