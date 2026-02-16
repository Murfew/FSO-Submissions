import { SECRET } from '../util/config.js'
import { httpError } from '../util/httpError.js'
import jwt from 'jsonwebtoken'

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')

  if (!authorization || !authorization.toLowerCase().startsWith('bearer ')) {
    throw httpError('token missing', 401)
  }

  try {
    req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
  } catch {
    throw httpError('invalid token', 401)
  }

  next()
}

export default tokenExtractor
