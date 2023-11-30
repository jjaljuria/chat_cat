let socket = null

const search = document.getElementById('search')
const listUsers = document.getElementById('listUsers')
const messageBox = document.getElementById('messageBox')

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

// eslint-disable-next-line no-unused-vars
async function connectTo (idConversation) {
  const res = await fetch(`/conversation/${idConversation}`)
  const conversation = await res.json()

  const chat = document.getElementById('chat')
  chat.dataset.currentConversation = conversation.id
  socket = io({
    auth: {
      idConversation: conversation.id
    }
  })

  socket.on('message', (message) => {
    if (!message) {
      messageBox.innerHTML += '<div>fail message</div>'
    }

    messageBox.innerHTML += _styleMessage(message)

    // bajar al fondo de la pantalla
    messageBox.scrollTop = messageBox.scrollHeight
  })

  clearMessageBox(messageBox)
  renderMessage({ messageBox, messages: conversation.messages })
}

function clearMessageBox (messageBox) {
  messageBox.innerHTML = ''
}

function renderMessage ({ messages, messageBox }) {
  if (messages.length === 0) {
    messageBox.innerHTML = '<div>You not have messages yet</div>'
  }

  messages.forEach(message => {
    messageBox.innerHTML += _styleMessage(message)
  })
}

function _styleMessage (message) {
  return `<div class="p-3 border bg-success rounded mb-3 mx-2 fit-content position-relative message"><div class="position-absolute message__vineta"></div><small>${new Date(message.createdAt).toLocaleTimeString()}</small> : ${message.text}</div>`
}

async function sendMessage () {
  const messageInput = document.getElementById('messageInput')
  const text = String(messageInput.value)

  socket.emit('message', text)
  messageInput.value = ''
}

function sendMessageOnPressEnter (e) {
  if (e.key === 'Enter') {
    sendMessage()
  }
}
