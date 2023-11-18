import { Router } from 'express'
import logger from '../lib/logger.js'
import * as conversationServices from '../services/conversation.js'
const router = Router()

router.post('/conversation', async (req, res) => {
  const myId = req.session.user
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

export default router
