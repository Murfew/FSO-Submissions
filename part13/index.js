import express, { json } from 'express'
import { PORT } from './util/config'
import { connectToDatabase } from './util/db'
import blogsRouter from './controllers/blogs'

const app = express()

app.use(json())

app.use('/api/blogs', blogsRouter)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()
