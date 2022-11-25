const express = require('express');
const app = express();
const socketIo = require('socket.io');
const path = require('path');


app.set('PORT', process.env.PORT || 3000);

/** STATICS */
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));


app.get('/', (req, res)	=>{
	res.render('index.html');
});

const server = app.listen(app.get('PORT'), () =>{
	console.log('Server start in PORT ' + app.get('PORT'));
});

const io = socketIo(server)
io.on('connection', (socket)=>{
	console.log('Contected in ' + socket.id);
	socket.on('chat', (text)=>{
		io.sockets.emit('chat', text);
	})
})