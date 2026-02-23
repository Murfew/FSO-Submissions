import { Router } from 'express'
import { Blog, ReadingList, User } from '../models/index.js'
import { httpError } from '../util/httpError.js'
import { checkSession, tokenExtractor } from '../util/middleware.js'

const router = Router()

router.post('/', async (req, res) => {
  if (!req.body.userId || !req.body.blogId) {
    throw httpError('userId and blogId are required', 400)
  }

  const user = await User.findByPk(req.body.userId)
  const blog = await Blog.findByPk(req.body.blogId)

  if (!user) {
    throw httpError('invalid userId', 400)
  }

  if (!blog) {
    throw httpError('invalid blogId', 400)
  }

  const readingList = await ReadingList.create({ userId: user.id, blogId: blog.id })

  return res.status(201).json(readingList)
})

router.put('/:id', tokenExtractor, checkSession, async (req, res) => {
  const entry = await ReadingList.findOne({
    where: {
      id: req.params.id,
      userId: req.decodedToken.id,
    },
  })

  if (!entry) {
    throw httpError('reading list entry not found', 400)
  }

  entry.hasRead = req.body.hasRead
  await entry.save()

  res.json(entry)
})

export default router
