import { Router } from 'express'
import logger from '../lib/logger.js'
import * as conversationServices from '../services/conversation.js'
import verifyExistUser from '../middlewares/verifyExistUser.js'
const router = Router()

router.post('/conversation', async (req, res) => {
  const myId = req.session.idUser
  const { id: otherId } = req.body

  try {
    const existConversation = await conversationServices.hasConversationWith(myId, otherId)

    if (existConversation) {
      return res.status(200).json(existConversation)
    }
    const newConversation = await conversationServices.create(myId, otherId)

    return res.status(201).json(newConversation)
  } catch (error) {
    logger.error(error.message)
    res.status(500)
  }
})

router.get('/conversation/:id', verifyExistUser, async (req, res) => {
  const { id } = req.params

  const conversation = await conversationServices.get(String(id))

  return res.status(200).json(conversation)
})

export default router
