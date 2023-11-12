import { prisma } from '../database.js'
import logger from '../lib/logger.js'

export const get = async (id) => {
  try {
    const user = await prisma.user.findFirst(id)
    return user
  } catch (error) {
    logger.error(error.message)
  }
}
