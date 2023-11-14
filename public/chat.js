// const socket = io()

// const send = document.getElementById('send')
// const text = document.getElementById('text')
// const conversations = document.getElementById('conversations')
// const nicknameFile = document.getElementById('nickname')
const search = document.getElementById('search')
const listUsers = document.getElementById('listUsers')

search.addEventListener('input', async (e) => {
  const textToFind = String(e.target.value)
  if (!textToFind) {
    listUsers.innerHTML = ''
    return
  }
  const response = await fetch(`/user?find=${textToFind}`)
  const users = await response.json()

  const usersHTML = users.map(user => `<li class="list-group-item list-group-item-action">${user.nickname}</li>`).join('')
  listUsers.innerHTML = usersHTML
})

// send.addEventListener('click', () => {
//   socket.emit('chat', {
//     userId: socket.id,
//     text: text.value,
//     nickname: nicknameFile.value
//   })
//   text.value = ''
// })

// socket.on('chat', ({ userId, text, nickname }) => {
//   let username = 'you'
//   if (userId !== socket.id && nicknameFile.value !== nickname) {
//     username = nickname
//   }

//   conversations.innerHTML = conversations.innerHTML + `<span class="d-block mb-1"><b>${username}</b>: ${text}</span>`

//   conversations.scrollTop = conversations.scrollHeight
// })
