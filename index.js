const express = require('express');
const app = express();
const socketIo = require('socket.io');
const path = require('path');


app.set('PORT', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res)	=>{
	res.render('index.html');
});

const server = app.listen(app.get('PORT'), () =>{
	console.log('Server start in PORT ' + app.get('PORT'));
});

const io = socketIo(server)
io.on('connection', (socket)=>{
	console.log('Contected in ' + socket.id);
	console.log(socket)
	socket.on('chat', (text)=>{
		io.sockets.emit('chat', text);
		
	})
})