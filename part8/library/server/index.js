const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@as-integrations/express5')
const {
  ApolloServerPluginDrainHttpServer,
} = require('@apollo/server/plugin/drainHttpServer')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const express = require('express')
const cors = require('cors')
const http = require('http')
const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/use/ws')
const { DataLoader } = require('dataloader')

require('dotenv').config()

const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')

const User = require('./models/user')
const Book = require('./models/book')

const typeDefs = require('./schema')
const resolvers = require('./resolvers')

// DataLoader batch function for counting books by author
const batchBookCounts = async (authorIds) => {
  // This function receives an array of author IDs that need their book counts
  // It must return an array of results in the same order as the input IDs

  // Use MongoDB aggregation to count books grouped by author in a single query
  const bookCounts = await Book.aggregate([
    { $match: { author: { $in: authorIds } } }, // Filter books by the requested author IDs
    { $group: { _id: '$author', count: { $sum: 1 } } }, // Group by author and count
  ])

  // Create a map for quick lookup: authorId -> count
  const countMap = {}
  bookCounts.forEach((result) => {
    countMap[result._id.toString()] = result.count
  })

  // Return counts in the same order as the input authorIds
  // If an author has no books, return 0
  return authorIds.map((id) => countMap[id.toString()] || 0)
}

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB: ', error.message)
  })

const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/',
  })

  const schema = makeExecutableSchema({ typeDefs, resolvers })
  const serverCleanup = useServer(
    {
      schema,
      context: async (ctx, msg, args) => {
        // For subscriptions, we can access connection params
        const token = ctx.connectionParams?.authorization
        if (token && token.startsWith('Bearer ')) {
          try {
            const decodedToken = jwt.verify(
              token.substring(7),
              process.env.JWT_SECRET
            )
            const currentUser = await User.findById(decodedToken.id)
            return { currentUser }
          } catch (error) {
            return {}
          }
        }
        return {}
      },
    },
    wsServer
  )

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            },
          }
        },
      },
    ],
  })

  await server.start()

  app.use(
    '/',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.startsWith('Bearer ')) {
          const decodedToken = jwt.verify(
            auth.substring(7),
            process.env.JWT_SECRET
          )
          const currentUser = await User.findById(decodedToken.id)
          return {
            currentUser,
            bookCountLoader: new DataLoader(batchBookCounts),
          }
        }
        return {
          bookCountLoader: new DataLoader(batchBookCounts),
        }
      },
    })
  )

  httpServer.listen(process.env.PORT, () =>
    console.log(`Server is now running on http://localhost:${process.env.PORT}`)
  )
}

start()
