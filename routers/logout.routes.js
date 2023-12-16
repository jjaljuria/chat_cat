import { Router } from 'express'
const router = Router()

router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    console.error(err)
  })
  return res.status(200).end()
})

export default router
