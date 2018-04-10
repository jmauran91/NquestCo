import React from 'react';
import Message from './message';

class Messages extends React.Component{
  constructor(props){
    super(props);
  }

  comopnentDidUpdate(){
    const objDiv = document.getElementById('messageList');
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  render(){

    const messages = this.props.message_objects.map((message, i) => {
      var msgFromMe;
      if(message.name === this.props.current_user.name){
        msgFromMe = true
      }
      else {
        msgFromMe = false
      }
      return(
        <Message
          key={i}
          username={message.name}
          message={message.composedMessage}
          fromMe={msgFromMe}
        />
      )
    })

    return(
      <div className="messages" id="messageList">
        {messages}
      </div>
    )
  }
}

Messages.defaultProps = {
  message_objects: []
}

export default Messages;
