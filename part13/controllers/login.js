import bcrypt from 'bcrypt'
import { Router } from 'express'
import jwt from 'jsonwebtoken'
import { Session, User } from '../models/index.js'
import { SECRET } from '../util/config.js'
import { httpError } from '../util/httpError.js'

const router = Router()

router.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({
    where: {
      username,
    },
  })

  const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    throw httpError('invalid username or password', 401)
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, SECRET)

  await Session.create({ token, userId: user.id })

  return response.status(200).json({ token, username: user.username, name: user.name })
})

export default router
