import { Router } from 'express'
const router = Router()

router.post('/logout', (req, res) => {
  req.session.destroy(error => {
    if (error) {
      return res.status(500)
    }

    return res.status(200).end()
  })
})

export default router
