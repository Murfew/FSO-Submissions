import { Router } from 'express'
import { Op } from 'sequelize'
import { Blog, User } from '../models/index.js'
import { httpError } from '../util/httpError.js'
import { blogFinder, checkSession, tokenExtractor } from '../util/middleware.js'

const router = Router()

router.get('/', async (req, res) => {
  const where = {}

  if (req.query.search) {
    where[Op.or] = {
      title: { [Op.iLike]: `%${req.query.search}%` },
      author: { [Op.iLike]: `%${req.query.search}%` },
    }
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name'],
    },
    where,
    order: [['likes', 'DESC']],
  })

  return res.json(blogs)
})

router.post('/', tokenExtractor, checkSession, async (req, res) => {
  if (!req.body.title || !req.body.url) {
    throw httpError('title and url are required', 400)
  }

  const user = await User.findByPk(req.decodedToken.id)
  const blog = await Blog.create({ ...req.body, userId: user.id })

  return res.status(201).json(blog)
})

router.delete('/:id', tokenExtractor, checkSession, blogFinder, async (req, res) => {
  if (req.blog.userId !== req.decodedToken.id) {
    throw httpError('forbidden', 403)
  }

  await req.blog.destroy()
  return res.status(204).end()
})

router.put('/:id', blogFinder, async (req, res) => {
  const { likes } = req.body

  if (typeof likes !== 'number') {
    throw httpError('likes must be a number', 400)
  }

  req.blog.likes = likes
  await req.blog.save()

  return res.json(req.blog)
})

export default router
