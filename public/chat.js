const socket = io();

const send = document.getElementById('send');
const text = document.getElementById('text');
const conversations = document.getElementById('conversations');

send.addEventListener('click', ()=>{
	socket.emit('chat', text.value);
	text.value = '';
})

socket.on('chat', (text)=>{
	conversations.innerHTML = conversations.innerHTML + `<p>${text}</p>`;
})