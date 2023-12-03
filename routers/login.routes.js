import { Router } from 'express'
import { prisma } from '../database.js'
import decrypt from '../lib/decrypt.js'

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

    req.session.user = userFound.id
    res.status(202).end()
  } catch (error) {
    res.status(500).json({ message: error })
  }
})

export default router
