const express = require('express');
const app = express();
const socketIo = require('socket.io');
const path = require('path');
const { engine } = require('express-handlebars');
const cookieParser = require('cookie-parser');

app.engine('handlebars', engine({
	defaultLayout: false
}))
app.set('view engine', 'handlebars')
app.set('views', './views')


app.set('PORT', process.env.PORT || 3000);

/** STATICS */
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));


/** MIDDLEWARES */
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cookieParser('secret'))

app.get('/', (req, res)	=>{
	const nickname = req.cookies['chat_nickname'];
	
	if(!nickname) return res.redirect('/login')

	res.render('index.handlebars', {nickname});
});

app.get('/login', (req, res) =>{
	res.render('login.handlebars');
});

app.post('/login', (req, res) =>{
	const {nickname} = req.body;
	

	if(!nickname) return res.status(400).send('error en el nickname')
	

	return res.cookie('chat_nickname', String(nickname), {
		maxAge: 1000 * 60 * 60 * 24 * 5,
		sameSite: 'strict'
	}).redirect('/')
})

app.get('/logout', (req,res) =>{
	return res.clearCookie('chat_nickname').redirect('/login')
})


const server = app.listen(app.get('PORT'), () =>{
	console.log('Server start in PORT ' + app.get('PORT'));
});

const io = socketIo(server)
io.on('connection', (socket)=>{
	console.log('Contected in ' + socket.id);
	socket.on('chat', (data)=>{
		io.sockets.emit('chat', data);
	})
})