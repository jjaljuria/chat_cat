import express from 'express'
import { Server } from 'socket.io'
import { join, dirname } from 'path'
import { createServer } from 'node:http'
import { engine } from 'express-handlebars'
import cookieParser from 'cookie-parser'
import userRouter from './routers/user.routes.js'

const app = express()
const __dirname = dirname(import.meta.url)

app.engine('handlebars', engine({
  defaultLayout: false
}))
app.set('view engine', 'handlebars')
app.set('views', './views')

app.set('PORT', process.env.PORT || 3000)

/** STATICS */
app.use(express.static(join(__dirname, 'public')))
app.use('/css', express.static(join(__dirname, '/node_modules/bootstrap/dist/css')))

/** MIDDLEWARES */
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser('secret'))

/** ROUTES */
app.use(userRouter)

app.get('/', (req, res) => {
  const nickname = req.cookies.chat_nickname

  if (!nickname) return res.redirect('/login')

  res.render('index.handlebars', { nickname })
})

app.get('/login', (req, res) => {
  res.render('login.handlebars')
})

app.post('/login', (req, res) => {
  const { nickname } = req.body
  const millisecondsInADay = 1000 * 60 * 60 * 24

  if (!nickname) return res.status(400).send('error en el nickname')

  return res.cookie('chat_nickname', String(nickname), {
    maxAge: millisecondsInADay * 5,
    sameSite: 'strict'
  }).redirect('/')
})

app.get('/logout', (req, res) => {
  return res.clearCookie('chat_nickname').redirect('/login')
})

const server = createServer(app)
server.listen(app.get('PORT'), () => {
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
