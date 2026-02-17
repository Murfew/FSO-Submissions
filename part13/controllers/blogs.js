import { Router } from 'express'
import { Blog, User } from '../models/index.js'
import blogFinder from '../middleware/blogFinder.js'
import { httpError } from '../util/httpError.js'
import tokenExtractor from '../middleware/tokenExtractor.js'
import { Op } from 'sequelize'

const router = Router()

router.get('/', async (req, res) => {
  const where = {}

  if (req.query.search) {
    where.title = {
      [Op.iLike]: `%${req.query.search}%`,
    }
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name'],
    },
    where,
  })
  return res.json(blogs)
})

router.post('/', tokenExtractor, async (req, res) => {
  const { author, title, url, likes } = req.body

  if (!title || !url) {
    throw httpError('title and url are required', 400)
  }

  const user = await User.findByPk(req.decodedToken.id)
  const blog = await Blog.create({ author, title, url, likes, userId: user.id })

  return res.status(201).json(blog)
})

router.delete('/:id', tokenExtractor, blogFinder, async (req, res) => {
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
