const socket = io();

const send = document.getElementById('send');
const text = document.getElementById('text');
const conversations = document.getElementById('conversations');
const nickname = document.getElementById('nickname')

send.addEventListener('click', ()=>{
	
	socket.emit('chat', {
		userId: socket.id, 
		text: text.value,
		nickname: nickname.value
	});
	text.value = '';
})

socket.on('chat', ({userId, text, nickname})=>{
	let username = 'you';console.log({nickname})
	if(userId !== socket.id){
		username = nickname
	}

	conversations.innerHTML = conversations.innerHTML + `<span class="d-block mb-1"><b>${username}</b>: ${text}</span>`;

	conversations.scrollTop = conversations.scrollHeight;
})