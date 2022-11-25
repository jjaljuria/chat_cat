const socket = io();

const send = document.getElementById('send');
const text = document.getElementById('text');
const conversations = document.getElementById('conversations');

send.addEventListener('click', ()=>{
	socket.emit('chat', {userId: socket.id, text: text.value});
	text.value = '';
})

socket.on('chat', ({userId, text})=>{
	let username = 'you';
	if(userId !== socket.id){
		username = String(userId).slice(0,4);
	}

	conversations.innerHTML = conversations.innerHTML + `<p><b>${username}</b>: ${text}</p>`;
})