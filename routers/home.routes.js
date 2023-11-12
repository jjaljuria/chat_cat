import { Router } from 'express'
import verifyExistUser from '../middlewares/verifyExistUser.js'
import * as conversationServices from '../services/conversation.js'
import * as userServices from '../services/user.js'

const router = Router()

router.get('/', verifyExistUser, async (req, res) => {
  const user = await userServices.get(req.session.user)
  const conversations = await conversationServices.getAllOf(user.id)

  res.render('home.handlebars', { conversations, user })
})
export default router
