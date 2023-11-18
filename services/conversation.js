import { prisma } from '../database.js'
import logger from '../lib/logger.js'

export const create = async (myId, otherId) => {
  try {
    const newConversation = await prisma.conversation.create({
      data: {
        users: {
          connect: [
            {
              id: myId
            }, {
              id: otherId
            }
          ]
        }
      },
      include: {
        users: true
      }
    })

    return newConversation
  } catch (error) {
    logger.error(error.message)
  }
}

export const getAllOf = async (myId) => {
  try {
    const conversations = await prisma.conversation.findMany({
      where: {
        users: {
          some: {
            id: myId
          }
        }
      },
      include: {
        users: {
          select: {
            id: true,
            nickname: true,
            email: true
          }
        }
      }
    })

    return conversations
  } catch (error) {
    logger.error(error.message)
  }
}

export const hasConversationWith = async (myId, otherId) => {
  try {
    const result = await prisma.conversation.findFirst({
      where: {
        users: {
          some: {
            AND: [
              { idUser: myId },
              { idUser: otherId }
            ]
          }
        }
      }
    })
    return result
  } catch (error) {
    logger.error(error.message)
  }
}
