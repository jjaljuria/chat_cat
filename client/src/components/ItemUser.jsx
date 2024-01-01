import PropTypes from 'prop-types';
import * as ConversationServices from '../services/ConversationServices';
import { useConversations } from '../store/ConversationStore';

export default function ItemUser({user}) {
    const { setCurrentConversation, setConversations } = useConversations(state => ({
        setCurrentConversation: state.setCurrentConversation,
        setConversations: state.setConversations
    }))

    const conversations = useConversations(state => state.conversations)

    const connectTo = async (idUser) =>{
        const newConversation = await ConversationServices.create(idUser)
        setConversations([...new Set(conversations, newConversation)])
        setCurrentConversation(newConversation)
    }

    return (
        <li className="list-group-item list-group-item-action p-0">
            <a className="text-reset text-decoration-none py-2 px-3 d-block" draggable="false" onClick={(e)=> {
                e.preventDefault()
                connectTo(user.id)
            }} >
                {user.nickname}
            </a>
        </li>
    )
}

ItemUser.propTypes = {
    user: PropTypes.object
}
