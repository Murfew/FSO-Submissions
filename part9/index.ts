import express from 'express'
import { isNotNumber } from './utils'
import { calculateBmi } from './bmiCalculator'
const app = express()

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height)
  const weight = Number(req.query.weight)

  if (isNotNumber(height) || isNotNumber(weight)) {
    res.status(400).json({ error: 'height and weight must be numbers' })
  }

  res.send({ weight, height, bmi: calculateBmi(height, weight) })
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
