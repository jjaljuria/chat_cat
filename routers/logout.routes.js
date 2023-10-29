import { Router } from 'express'
const router = Router()

router.get('/logout', (req, res) => {
  req.session.destroy()
  return res.redirect('/login')
})

export default router
