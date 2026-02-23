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
    throw httpError('no such user', 404)
  }

  if (!blog) {
    throw httpError('no such blog', 404)
  }

  const readingList = await ReadingList.create({ userId: user.id, blogId: blog.id })

  return res.status(201).json(readingList)
})

router.put('/:id', tokenExtractor, checkSession, async (req, res) => {
  const entryId = Number(req.params.id)
  const userId = Number(req.decodedToken.id)

  const entry = await ReadingList.findByPk(entryId)

  if (!entry) {
    throw httpError('reading list entry not found', 404)
  }

  if (Number(entry.userId) !== userId) {
    throw httpError('can only mark your own reading list entries', 401)
  }

  entry.read = Boolean(req.body.read)
  await entry.save()

  return res.status(200).json(entry)
})

export default router
