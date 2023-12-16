import PropTypes from 'prop-types';
import { useLoaderData } from "react-router-dom"

export default function Message({message}) {
    const {user} = useLoaderData()
    console.log({message});
    return (
        <div className={`p-3 border rounded mb-3 mx-2 fit-content position-relative message ${user.id === message.idUser ? 'bg-danger' : 'bg-success'}`}>
            <div className="position-absolute message__vineta"></div>
            <div className='d-flex flex-column'>
                <div>
                    {message.text}
                </div>
                <div className="text-tiny text-end">
                    {new Date(message.createdAt).toLocaleTimeString()}
                </div>
            </div>
        </div>
    )
}

Message.propTypes = {
    message: PropTypes.object
}
