const express = require('express');
const app = express();
const socketIo = require('socket.io');
const path = require('path');
const { engine } = require('express-handlebars');
const jwt = require('jsonwebtoken');

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

app.get('/', (req, res)	=>{
	res.render('index.handlebars');
});

app.get('/login', (req, res) =>{
	res.render('login.handlebars');
});

app.post('/login', (req, res) =>{
	const {nickname} = req.body;

	if(!nickname) return res.status(400).send('error en el nickname')
	
	const token = jwt.sign({nickname}, 'secret')

	return res.status(200).json(token)
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