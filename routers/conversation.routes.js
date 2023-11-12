import { Router } from 'express'
import logger from '../lib/logger.js'
import { prisma } from '../database.js'
const router = Router()

router.post('/conversation', async (req, res) => {
  try {
    const myId = req.session.user
    const otherId = req.body.id
    const newConversation = await prisma.conversation.create({
      data: {
        users: {
          create: [
            {
              user: {
                connect: {
                  id: myId
                }
              }
            },
            {
              user: {
                connect: {
                  id: otherId
                }
              }
            }
          ]
        }
      },
      include: {
        users: true
      }
    })
    res.status(201).json(newConversation)
  } catch (error) {
    logger.error(error.message)
    return res.status(500)
  }
})

router.get('/conversation', async (req, res) => {
  const user = req.session.user
  try {
    const conversations = await prisma.conversation.findMany({
      where: {
        users: {
          some: {
            idUser: user
          }
        }
      },
      include: {
        users: {
          select: {
            user: {
              select: {
                id: true,
                nickname: true,
                email: true
              }
            }
          }
        }
      }
    })
    res.json(conversations)
  } catch (error) {
    logger.error(error.message)
    res.status(500)
  }
})

export default router
