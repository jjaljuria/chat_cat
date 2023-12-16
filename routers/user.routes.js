import { Router } from 'express'
import { prisma } from '../database.js'
import encrypt from '../lib/encrypt.js'
import logger from '../lib/logger.js'
import verifyExistUser from '../middlewares/verifyExistUser.js'

const router = Router()

router.post('/user', async (req, res) => {
  try {
    await prisma.user.create({ data: { ...req.body, password: await encrypt(req.body.password) } })
    res.status(202).send()
  } catch (error) {
    logger.error(error.message)
    res.status(500).json({ message: 'Error with create user' })
  }
})

router.get('/user', verifyExistUser, async (req, res) => {
  const { find } = req.query
  const { user: userId } = req.session

  try {
    const usersFound = await prisma.user.findMany({
      where: {
        nickname: {
          contains: find
        }
      },
      select: {
        id: true,
        nickname: true
      }
    })

    return res.json(usersFound.filter(user => user.id !== userId))
  } catch (error) {
    logger.error(error)
  }
  return res.json([])
})

export default router
