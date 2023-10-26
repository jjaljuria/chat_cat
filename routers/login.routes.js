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

    if (!userFound) res.status(404).render('500.handlebars', { message: 'User not found' })

    const passwordMatched = await decrypt(password, userFound.password)

    if (!passwordMatched) {
      return res.status(406).render('500.handlebars', { message: 'Password not matched' })
    }

    const millisecondsInADay = 1000 * 60 * 60 * 24

    return res.cookie('chat_nickname', String(userFound.nickname), {
      maxAge: millisecondsInADay * 5,
      sameSite: 'strict'
    }).status(202).redirect('/')
  } catch (error) {
    res.render('500.handlebars', { message: error })
  }
})

export default router
