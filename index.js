import express from 'express'
import { Server } from 'socket.io'
import path from 'path'
import { fileURLToPath } from 'node:url'
import { createServer } from 'node:http'
import cookieParser from 'cookie-parser'
import expressSession from 'express-session'
import { PrismaSessionStore } from '@quixo3/prisma-session-store'
import { prisma } from './database.js'
import { env } from './config.js'
import userRouter from './routers/user.routes.js'
import loginRouter from './routers/login.routes.js'
import logoutRouter from './routers/logout.routes.js'
import homeRouter from './routers/home.routes.js'
import conversationRouter from './routers/conversation.routes.js'
import morgan from 'morgan'
import logger from './lib/logger.js'
import * as conversationServices from './services/conversation.js'
import cors from 'cors'

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.set('PORT', process.env.PORT || 3000)

/** STATICS */
app.use(express.static('public'))
app.use('/css', express.static(path.join(__dirname, './node_modules/bootstrap/dist/css/')))
app.use('/js', express.static(path.join(__dirname, './node_modules/bootstrap/dist/js/')))
app.use('/js', express.static(path.join(__dirname, './node_modules/@popperjs/core/dist/umd/')))

/** MIDDLEWARES */
app.use(cors({
  methods: ['GET', 'POST'],
  credentials: true,
  origin: 'http://localhost:5173'
}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(expressSession({
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000
  },
  secret: env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new PrismaSessionStore(prisma, {
    dbRecordIdIsSessionId: true
  })
}))
app.use(cookieParser('secret'))
app.use(morgan('dev'))

/** ROUTES */
app.use(userRouter)
app.use(loginRouter)
app.use(logoutRouter)
app.use(homeRouter)
app.use(conversationRouter)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

const server = createServer(app)
server.listen(app.get('PORT'), () => {
  logger.info('Server start in PORT ' + app.get('PORT'))
})

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
})

io.on('connection', (socket) => {
  console.log(socket.id)
  const { idConversation, idUser } = socket.handshake.auth
  socket.join(idConversation)

  socket.on('message', async (text) => {
    try {
      const newMessage = await conversationServices.createMessage({ idConversation, text, idUser })
      io.to(idConversation).emit('message', newMessage)
    } catch (error) {
      logger.error(error.message)
      io.to(idConversation).emit('message', null)
    }
  })
})

app.io = io

export default app
