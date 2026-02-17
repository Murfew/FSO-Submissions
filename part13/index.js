import express, { json } from 'express'
import { PORT } from './util/config.js'
import { connectToDatabase } from './util/db.js'
import blogsRouter from './controllers/blogs.js'
import errorHandler from './middleware/errorHandler.js'
import userRouter from './controllers/users.js'
import loginRouter from './controllers/login.js'
import authorRouter from './controllers/authors.js'

const app = express()

app.use(json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/authors', authorRouter)

app.use(errorHandler)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()
