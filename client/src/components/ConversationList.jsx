import { useLoaderData } from "react-router-dom"
import { useConversations } from "../store/ConversationStore";
import * as ConversationServices from '../services/ConversationServices.js';
import { io } from 'socket.io-client'
import { useSocket } from '../store/Socket.js'

function connectToSocket(idConversation){

    const socket = io('http://localhost:3000',{
      auth: {
          idConversation: idConversation
      },
      autoConnect: false
    })

    return socket
}

export default function ConversationList() {
    const {user} = useLoaderData()
    const {setSocket} = useSocket()

    const setCurrentConversation =useConversations(state => state.setCurrentConversation)

    async function connectToConversation (idConversation) {
        const conversation = await ConversationServices.find(idConversation)
        
        setCurrentConversation(conversation)
        setSocket(connectToSocket(conversation.id))
    }



    const conversations = useConversations(state => state.conversations)

    const conversationsJSX = conversations.map(conversation => {
        return conversation.users.map(userOfTheConversation => {
            if(userOfTheConversation.id !== user.id){
                return (
                  <li key={userOfTheConversation.id} className="list-group-item list-group-item-action rounded-0" onClick={()=> connectToConversation(conversation.id)}>
                        {userOfTheConversation.nickname}
                  </li>
                )
            }
        })
    })
    return (
        <ul className="list-group position-relative">
            {conversationsJSX}
        </ul>
    )
    
}
