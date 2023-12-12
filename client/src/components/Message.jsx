import PropTypes from 'prop-types';

export default function Message({message}) {
    return (
        <div className="p-3 border bg-success rounded mb-3 mx-2 fit-content position-relative message">
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
