import PropTypes from 'prop-types';
import * as ConversationServices from '../services/ConversationServices';
import { useConversations } from '../store/ConversationStore';

export default function ItemUser({user}) {
    const setCurrentConversation = useConversations(state => state.setCurrentConversation)

    const connectTo = async (idUser) =>{
        setCurrentConversation(await ConversationServices.create(idUser))
    }

    return (
        <li className="list-group-item list-group-item-action p-0">
            <a className="text-reset text-decoration-none py-2 px-3 d-block" draggable="false" onClick={()=> connectTo(user.id)} >
                {user.nickname}
            </a>
        </li>
    )
}

ItemUser.propTypes = {
    user: PropTypes.object
}
