import { Router } from 'express'
import verifyExistUser from '../middlewares/verifyExistUser'

const router = Router()

router.get('/', verifyExistUser, (req, res) => {
  const user = req.session.user
  res.render('home.handlebars', { user })
})
export default router
