import { Router } from 'express'
import { sequelize } from '../util/db.js'

const router = Router()

router.post('/', async (req, res) => {
  await sequelize.sync({ force: true })

  res.json({ message: 'Database reset (all tables recreated)' })
})

export default router
