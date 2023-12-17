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
          every: {
            id: {
              in: [myId, otherId]
            }
          }
        }
      },
      include: {
        users: {
          select: {
            id: true,
            nickname: true
          }
        }
      }
    })
    return result
  } catch (error) {
    logger.error(error.message)
  }
}

export const get = async (idConversation) => {
  try {
    const conversation = await prisma.conversation.findFirst({
      where: {
        id: idConversation
      },
      include: {
        messages: {
          orderBy: {
            createdAt: 'asc'
          }
        }
      }
    })

    return conversation
  } catch (error) {
    logger.error(error.message)
    return null
  }
}

export const createMessage = async ({ idConversation, text, idUser }) => {
  if (!idConversation || !text) throw new Error('less idConversation or text')
  try {
    return prisma.message.create({
      data: {
        text,
        conversation: {
          connect: {
            id: idConversation
          }
        },
        user: {
          connect: {
            id: idUser
          }
        }
      }
    })
  } catch (error) {
    logger.error(error.message)
    return null
  }
}
