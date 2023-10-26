import express from 'express'
import { Server } from 'socket.io'
import path from 'path'
import { fileURLToPath } from 'node:url'
import { createServer } from 'node:http'
import { engine } from 'express-handlebars'
import cookieParser from 'cookie-parser'
import expressSession from 'express-session'
import { PrismaSessionStore } from '@quixo3/prisma-session-store'
import { prisma } from './database.js'
import userRouter from './routers/user.routes.js'
import loginRouter from './routers/login.routes.js'

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.engine('handlebars', engine({
  defaultLayout: false
}))
app.set('view engine', 'handlebars')
app.set('views', './views')

app.set('PORT', process.env.PORT || 3000)

/** STATICS */
app.use(express.static('public'))
app.use('/css', express.static(path.join(__dirname, './node_modules/bootstrap/dist/css/')))

/** MIDDLEWARES */
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(expressSession({
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000
  },
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  store: new PrismaSessionStore(prisma, {
    dbRecordIdIsSessionId: true
  })
}))
app.use(cookieParser('secret'))

/** ROUTES */
app.use(userRouter)
app.use(loginRouter)

app.get('/', (req, res) => {
  const nickname = req.cookies.chat_nickname
  req.session.name = 'jose'

  if (!nickname) return res.redirect('/login')

  res.render('index.handlebars', { nickname })
})

app.get('/logout', (req, res) => {
  return res.clearCookie('chat_nickname').redirect('/login')
})

const server = createServer(app)
app.listen(app.get('PORT'), () => {
  console.log('Server start in PORT ' + app.get('PORT'))
})

const io = new Server(server)
io.on('connection', (socket) => {
  console.log('Contected in ' + socket.id)
  socket.on('chat', (data) => {
    io.sockets.emit('chat', data)
  })
})

export default app
