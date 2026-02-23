import jwt from 'jsonwebtoken'
import { Blog, Session } from '../models/index.js'
import { SECRET } from './config.js'
import { httpError } from './httpError.js'

export const blogFinder = async (req, res, next) => {
  const blog = await Blog.findByPk(req.params.id)

  if (!blog) {
    throw httpError('blog not found', 404)
  }

  req.blog = blog
  return next()
}

export const errorHandler = (err, req, res, next) => {
  console.error(err)

  if (err.status) {
    return res.status(err.status).json({ error: err.message })
  }

  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({ error: err.message })
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    res.status(409).json({ error: err.message })
  }

  return res.status(500).json({ error: 'internal server error' })
}

export const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')

  if (!authorization || !authorization.toLowerCase().startsWith('bearer ')) {
    throw httpError('token missing', 401)
  }

  req.token = authorization.substring(7)

  try {
    req.decodedToken = jwt.verify(req.token, SECRET)
  } catch {
    throw httpError('invalid token', 401)
  }

  next()
}

export const checkSession = async (req, res, next) => {
  const session = await Session.findOne({
    where: {
      token: req.token,
    },
  })

  if (!session) {
    throw httpError('invalid session', 401)
  }

  next()
}
