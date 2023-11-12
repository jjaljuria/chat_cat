import { prisma } from '../database'
import logger from '../lib/logger'

export const create = async (myId, otherId) => {
  try {
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

    return newConversation
  } catch (error) {
    logger.error(error.message)
  }
}

export const getAllOf = async (myId, otherId) => {
  try {
    const conversations = await prisma.conversation.findMany({
      where: {
        users: {
          some: {
            idUser: myId
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
    return conversations
  } catch (error) {
    logger.error(error.message)
  }
}
