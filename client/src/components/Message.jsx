import PropTypes from 'prop-types';
import { useLoaderData } from "react-router-dom"

export default function Message({message}) {
    const {user} = useLoaderData()
    return (
        <div className="w-100">
            <div className={`p-3 border rounded mb-3 mx-2 fit-content position-relative message ${user.id === message.idUser ? 'bg-success' : 'bg-secondary ms-auto'}`}>
                <div className={`position-absolute message__vineta ${user.id !== message.idUser ? 'message__vineta--right' : ''}`}></div>
                <div className='d-flex flex-column'>
                    <div>
                        {message.text}
                    </div>
                    <div className="text-tiny text-end">
                        {new Date(message.createdAt).toLocaleTimeString()}
                    </div>
                </div>
            </div>
        </div>
    )
}

Message.propTypes = {
    message: PropTypes.object
}
