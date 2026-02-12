import { Blog } from "../models/index.js"

const blogFinder = async (req, res, next) => {
  const blog = await Blog.findByPk(req.params.id)

  if (!blog) {
    const err = new Error('blog not found')
    err.status = 404
    throw err
  }

  req.blog = blog
  return next()
}

export default blogFinder
