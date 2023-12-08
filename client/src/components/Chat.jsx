import PropTypes from 'prop-types';
import Message from './Message';
import { useState, useRef, useEffect } from 'react';
import { useSocket } from '../store/Socket.js'
import { useConversations } from "../store/ConversationStore";

export default function Chat() {
  const socket = useSocket((state) => state.socket)
  const currentConversation = useConversations(state => state.currentConversation)
  const [newMessage, setNewMessage] = useState('');
  const messageBox = useRef(null)

  let messagesJSX = null
  if(currentConversation?.messages?.length > 0){
    messagesJSX = currentConversation.messages.map(message => <Message message={message} key={message.id}/>)
  }else{
    messagesJSX = <div>You not have messages yet</div>
  }

  const sendMessageHandler = () =>{
    socket.emit('message', newMessage)
    setNewMessage('')
  }

  // TODO
  // useEffect(()=> {
  //   messageBox.current.scrollTop = messageBox.current.scrollHeight
  // }, [messages])

  return (
    <section
    className="col-12 col-sm-8 border d-none d-sm-flex flex-column h-100 justify-content-between p-0"
    data-currentconversation=""
    id="chat"
    >
    <div
        className="bg-body-secondary flex-grow-1 overflow-y-auto text-break"
        id="messageBox"
        ref={messageBox}
    >
      { messagesJSX }
    </div>
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
        />
    </section>
    </section>
  )
}

Chat.propTypes = {
  messages: PropTypes.array
}