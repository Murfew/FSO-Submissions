const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', {
      username: 1,
      name: 1,
    })
    response.json(blogs)
  } catch (error) {
    next(error)
  }
})

blogsRouter.post(
  '/',
  middleware.userExtractor,
  async (request, response, next) => {
    const body = request.body
    const user = request.user

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id,
    })

    try {
      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()

      await savedBlog.populate('user', { username: 1, name: 1 })

      response.status(201).json(savedBlog)
    } catch (error) {
      next(error)
    }
  }
)

blogsRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request, response, next) => {
    const user = request.user

    try {
      const blog = await Blog.findById(request.params.id)
      if (!blog) {
        return response.status(404).end()
      }
      if (blog.user.toString() !== user._id.toString()) {
        return response
          .status(403)
          .json({ error: 'only the creator can delete a blog' })
      }
      await Blog.findByIdAndDelete(request.params.id)
      response.status(204).end()
    } catch (error) {
      next(error)
    }
  }
)

blogsRouter.put(
  '/:id',
  middleware.userExtractor,
  async (request, response, next) => {
    try {
      const { likes } = request.body
      const updatedBlog = await Blog.findByIdAndUpdate(
        request.params.id,
        { likes },
        { new: true, runValidators: true, context: 'query' }
      ).populate('user', { username: 1, name: 1 })
      if (updatedBlog) {
        response.status(200).json(updatedBlog)
      } else {
        response.status(404).end()
      }
    } catch (error) {
      next(error)
    }
  }
)

module.exports = blogsRouter
