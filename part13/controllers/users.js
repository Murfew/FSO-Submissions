import { Router } from 'express'
import { User, Blog } from '../models/index.js'
import { httpError } from '../util/httpError.js'
import bcrypt from 'bcrypt'

const router = Router()

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] },
    },
  })
  return res.json(users)
})

router.post('/', async (req, res) => {
  const { username, name, password } = req.body

  if (!username || !name || !password) {
    throw httpError('username, name and password are required', 400)
  }

  if (username.trim() === '' || name.trim() === '') {
    throw httpError('username and name must not be empty', 400)
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = await User.create({ username, name, passwordHash })
  return res.status(201).json(user)
})

router.put('/:username', async (req, res) => {
  const { username: newUsername } = req.body

  if (!newUsername || newUsername.trim() === '') {
    throw httpError('new username is required', 400)
  }

  const user = await User.findOne({ where: { username: req.params.username } })

  if (!user) {
    throw httpError('user not found', 404)
  }

  user.username = req.body.username
  await user.save()

  return res.json(user)
})

export default router
