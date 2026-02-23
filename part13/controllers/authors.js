import { Router } from 'express'
import { Blog } from '../models/index.js'
import { sequelize } from '../util/db.js'

const router = Router()

router.get('/', async (req, res) => {
  const authors = await Blog.findAll({
    attributes: [
      'author',
      [sequelize.fn('COUNT', sequelize.col('id')), 'blogs'],
      [sequelize.fn('SUM', sequelize.col('likes')), 'likes'],
    ],
    group: 'author',
    order: [['likes', 'DESC']],
  })

  return res.json(authors)
})

export default router
