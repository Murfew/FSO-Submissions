import { Router } from 'express';
import { Blog } from '../models/index.js'
import blogFinder from '../middleware/blogFinder.js';
import { httpError } from '../util/httpError.js';

const router = Router();

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  return res.json(blogs)
})

router.post('/', async (req, res) => {
  const { author, title, url, likes } = req.body

  if (!title || !url) {
    throw httpError('title and url are required', 400)
  }

  const blog = await Blog.create({ author, title, url, likes })
  res.status(201).json(blog)
})

router.delete('/:id', blogFinder, async (req, res) => {
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
