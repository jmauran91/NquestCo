import React from 'react';

class Message extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    const fromMe = this.props.fromMe ? 'from-me' : '';

    return (
        <div className={`message ${fromMe}`}>
          <span className={`message-body`}>
            { this.props.message }
          </span>
        </div>
    );
  }
}

Message.defaultProps = {
  message: '',
  username: ''
};

export default Message;
