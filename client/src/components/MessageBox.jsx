import PropTypes from 'prop-types';
import Message from './Message';
import { useEffect, useRef } from 'react';

export default function MessageBox({messages}) {
    const messageBox = useRef(null)

    useEffect(()=>{
        messageBox.current.scrollTop = messageBox.current.scrollHeight
    },[messages])


    let messagesJSX = null
    if(messages.length > 0){
        messagesJSX = messages.map(message => <Message message={message} key={message.id}/>)
    }else{
        messagesJSX = <div>You not have messages yet</div>
    }

    return (
        <div
        className="bg-body-secondary flex-grow-1 overflow-y-auto text-break"
        id="messageBox"
        ref={messageBox}
    >
      { messagesJSX }
    </div>
    )
}

MessageBox.propTypes = {
    messages: PropTypes.array
}