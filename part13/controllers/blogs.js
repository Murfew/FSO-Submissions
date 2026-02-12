import { Router } from 'express';
import { Blog } from '../models'

const router = Router();

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

router.post('/', async (req, res) => {
  try {
    const blog = await Blog.create(req.body)
    return res.json(blog) 
  } catch (error) {
    return res.statusCode(400).json({error})
  }
})

router.delete('/:id', async (req, res) => {
  const blog = await Blog.destroy({
    where: {
      id: req.params.id
    }
  })
  if (blog) {

  } else {
    res.status(400).end()
  }
})
