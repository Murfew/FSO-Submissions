import express, { json } from 'express'
import authorRouter from './controllers/authors.js'
import blogsRouter from './controllers/blogs.js'
import loginRouter from './controllers/login.js'
import logoutRouter from './controllers/logout.js'
import readingListRouter from './controllers/readingList.js'
import userRouter from './controllers/users.js'
import { PORT } from './util/config.js'
import { connectToDatabase } from './util/db.js'
import { errorHandler } from './util/middleware.js'

const app = express()

app.use(json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/authors', authorRouter)
app.use('/api/readinglists', readingListRouter)
app.use('/api/logout', logoutRouter)

app.use(errorHandler)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()
