import { Router } from 'express'
import { prisma } from '../database.js'

const router = Router()

router.get('/user', async (req, res) => {
  res.render('user.handlebars')
})

router.post('/user', async (req, res) => {
  try {
    await prisma.user.create({ data: req.body })
    res.status(202).send()
  } catch (error) {
    res.status(500).send(error.message)
  }
})

export default router
