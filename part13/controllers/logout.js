import { Router } from 'express'
import { Session } from '../models/index.js'
import { tokenExtractor } from '../util/middleware.js'

const router = Router()

router.delete('/', tokenExtractor, async (req, res) => {
  await Session.destroy({
    where: {
      token: req.token,
    },
  })

  return res.status(204).end()
})

export default router
