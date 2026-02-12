import { Router } from 'express';
import { Blog } from '../models/index.js'

const router = Router();

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  return res.json(blogs)
})

router.post('/', async (req, res) => {
  try {
    const blog = await Blog.create(req.body)
    return res.json(blog) 
  } catch (error) {
    return res.status(400).json({error: error.message})
  }
})

router.delete('/:id', async (req, res) => {
  const deletedCount = await Blog.destroy({
    where: {
      id: req.params.id
    }
  })

  if (deletedCount === 0) {
    return res.status(404).json({ error: 'blog not found' })
  }
  
  return res.status(204).end()
})

router.put('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)

  if (!blog) {
    return res.status(404).end()
  }

  blog.likes = req.body.likes
  await blog.save()

  res.json({ likes: blog.likes })
})

export default router
