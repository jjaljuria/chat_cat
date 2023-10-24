import { Router } from 'express'
import { prisma } from '../database.js'
import encrypt from '../lib/encrypt.js'

const router = Router()

router.get('/user', async (req, res) => {
  res.render('user.handlebars')
})

router.post('/user', async (req, res) => {
  try {
    await prisma.user.create({ data: { ...req.body, password: await encrypt(req.body.password) } })
    res.status(202).send()
  } catch (error) {
    console.trace(error)
    res.status(500).render('500.handlebars', { message: 'Error with create user' })
  }
})

export default router
