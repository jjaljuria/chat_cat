import { Router } from 'express'
import { prisma } from '../database.js'
import decrypt from '../lib/decrypt.js'
import jwt from 'jsonwebtoken'

const router = Router()

router.get('/login', (req, res) => {
  res.render('login.handlebars')
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    const userFound = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (!userFound) res.status(406).json({ message: 'User not found' })

    const passwordMatched = await decrypt(password, userFound.password)

    if (!passwordMatched) {
      return res.status(406).json({ message: 'Password not matched' })
    }

    const token = jwt.sign(userFound.id, 'secret')
    res.status(202).json(token)
  } catch (error) {
    res.status(500).json({ message: error })
  }
})

export default router
