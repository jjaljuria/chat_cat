import { Router } from 'express'
import verifyExistUser from '../middlewares/verifyExistUser.js'
import * as conversationServices from '../services/conversation.js'
import * as userServices from '../services/user.js'

const router = Router()

router.get('/home', verifyExistUser, async (req, res) => {
  const user = await userServices.get(req.session.idUser)
  const conversations = await conversationServices.getAllOf(user.id)
  res.json({ conversations, user })
})
export default router
