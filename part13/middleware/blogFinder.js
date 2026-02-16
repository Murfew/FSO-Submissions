import { Blog } from '../models/index.js'
import { httpError } from '../util/httpError.js'

const blogFinder = async (req, res, next) => {
  const blog = await Blog.findByPk(req.params.id)

  if (!blog) {
    throw httpError('blog not found', 404)
  }

  req.blog = blog
  return next()
}

export default blogFinder
