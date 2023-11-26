// const socket = io()

const sendInput = document.getElementById('send')
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

  const usersHTML = users.map(user => `<li class="list-group-item list-group-item-action p-0"><a class="text-reset text-decoration-none py-2 px-3 d-block" draggable="false" onclick="connectTo('${user.id}')" >${user.nickname}</a></li>`).join('')
  listUsers.innerHTML = usersHTML
})

function changeConversation () {

}

// eslint-disable-next-line no-unused-vars
async function connectTo (idConversation) {
  const res = await fetch(`/conversation/${idConversation}`)
  const conversation = await res.json()
  const messageBox = document.getElementById('messageBox')

  clearMessages(messageBox)
  renderMessage({ messageBox, messages: conversation.messages })
}

function clearMessages (messageBox) {
  messageBox.innerHTML = ''
}

function renderMessage ({ messages, messageBox }) {
  if (messages.length === 0) {
    messageBox.innerHTML = '<div>You not have messages yet</div>'
  }
  console.log(messages)
  messages.forEach(message => {
    messageBox.innerHTML = `<div>${message.text}<small>${new Date(message.createdAt).toLocaleTimeString()}</small></div>`
  })
}

async function sendMessage (idConversation) {
  const text = String(messageInput.value)

  const res = await fetch(`/conversation/${idConversation}/message`, {
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text })
  })

  const message = await res.json()
  console.log({ message })
}

// socket.on('chat', ({ userId, text, nickname }) => {
//   let username = 'you'
//   if (userId !== socket.id && nicknameFile.value !== nickname) {
//     username = nickname
//   }

//   conversations.innerHTML = conversations.innerHTML + `<span class="d-block mb-1"><b>${username}</b>: ${text}</span>`

//   conversations.scrollTop = conversations.scrollHeight
// })
