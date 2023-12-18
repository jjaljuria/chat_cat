import PropTypes from 'prop-types';
import MessageBox from './MessageBox.jsx';
import { useState, useEffect } from 'react';
import { useSocket } from '../store/Socket.js'
import { useConversations } from "../store/ConversationStore";

function useMessages(){
  const currentConversation = useConversations(state => state.currentConversation)
  const [messages, setMessages] = useState([]);

  useEffect(()=>{
    if(currentConversation) setMessages(currentConversation.messages)
  },[currentConversation])

  return [messages, setMessages]
}

export default function Chat() {
  const socket = useSocket((state) => state.socket)
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useMessages()

  const sendMessageHandler = () =>{
    socket.emit('message', newMessage)
    setNewMessage('')
  }

  const messageHandler = (message) => {
    setMessages([...messages, message])
  }
  
  if(socket) socket.connect().on('message', messageHandler)
  return (
    <section
    className="col-12 col-sm-8 border d-none d-sm-flex flex-column h-100 justify-content-between p-0"
    id="chat"
    >

    <MessageBox messages={messages} />
    <section className="d-flex py-1 border">
        <button
        className="btn btn-primary rounded-circle mx-1"
        id="send"
        onClick={sendMessageHandler}
        >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            fill="currentColor"
            className="bi bi-send"
            viewBox="0 0 16 16"
        >
            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
        </svg>
        </button>
        <input
        type="text"
        name="message"
        id="messageInput"
        className="form-control w-100 shadow-none rounded rounded-5 mx-1"
        onChange={(e) => setNewMessage(e.target.value)}
        value={newMessage}
        onKeyDown={(e) => {
          if(e.key === 'Enter') sendMessageHandler()
        }}
        />
    </section>
    </section>
  )
}

Chat.propTypes = {
  messages: PropTypes.array
}