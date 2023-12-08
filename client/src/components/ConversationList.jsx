import { useLoaderData } from "react-router-dom"
import { useConversations } from "../store/ConversationStore";

export default function ConversationList() {
    const {user} = useLoaderData()

    const conversations = useConversations(state => state.conversations)

    const conversationsJSX = conversations.map(conversation => {
        return conversation.users.map(userOfTheConversation => {
            if(userOfTheConversation.id !== user.id){
                return (
                  <li key={userOfTheConversation.id} className="list-group-item list-group-item-action rounded-0">
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
