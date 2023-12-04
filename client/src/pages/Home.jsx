import '../assets/chat.css'
import { useLoaderData } from "react-router-dom"
import { useState } from 'react'
import Chat from '../components/Chat.jsx';
import ListUser from '../components/ListUser';
import { io } from 'socket.io-client'
import { useSocket } from '../store/Socket.js'

export default function home() {
  const {user, conversations} = useLoaderData()

  const setSocket = useSocket((state) => state.setSocket)
  const socket = useSocket((state) => state.socket)

  const [searchList, setSearchList] = useState([]);
  const [messages, setMessages] = useState([]);

  const searchHandler = async (e) =>{
    const textToFind = String(e.target.value)
    const authorization = localStorage.getItem('authorization')

    if(!textToFind){
      setSearchList([])
      return
    }

    const response = await fetch(`http://localhost:3000/user?find=${textToFind}`,{
      method: 'GET',
      headers: {
        'authorization': authorization
      }
    })

    setSearchList(await response.json())
  }

  
  async function connectTo (idConversation) {
    const authorization = localStorage.getItem('authorization')
    const res = await fetch(`http://localhost:3000/conversation/${idConversation}`, {
      headers: {
      'authorization': authorization
      }
    })
  
    const conversation = await res.json()
    setMessages(conversation.messages)
    const socket = io('http://localhost:3000',{
      auth: {
        idConversation: conversation.id
      }
    })

    socket.on('message', messageHandler)
    setSocket(socket)
  }

  const messageHandler = (message) => {

    setMessages((prevMessages) => [
      ...prevMessages,
      message
    ])
  }
  const conversationsJSX =   conversations.map(conversation => {
    return conversation.users.map(userOfTheConversation => {
      if(userOfTheConversation.id !== user.id){
        return (
          <li key={userOfTheConversation.id} className="list-group-item list-group-item-action rounded-0" onClick={()=> connectTo(conversation.id)}>
        {userOfTheConversation.nickname}
          </li>
      )

      }
    })
  })

  return (
  <div className="container-fluid min-vh-100">
    <header className="row border align-items-center height-header" >
      <section className="cal-12 col-sm-4 col-md-4 border-end">
        <h3 className="text-truncate">{user.nickname}</h3>
      </section>
    </header>

    <div className="row height-chat">
      <aside className="col-12 col-sm-4 col-md-4 border p-0">
        <section className="border-bottom p-2">
          <form className="input-group" id="searchForm">
            <div className="input-group-prepend">
              <span className="input-group-text rounded-end-0 bg-white h-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
            </span>
            </div>
            <input type="search" className="form-control shadow-none border border-start-0 ps-0 rounded-end" placeholder="Username" aria-label="Username" aria-describedby="search" id="search" autoComplete="off" onInput={searchHandler} />
          
          <ListUser userList={searchList} />
          </form>
        </section>

        <ul className="list-group position-relative">
          { conversationsJSX }
        </ul>
      </aside>

      <Chat messages={messages}/>
    </div>
  </div>  
  )
}
