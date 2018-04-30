import React from 'react';
import Message from './message';

class Messages extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      updated: false
    }

    this.vetMessage = this.vetMessage.bind(this);
    this.moderateNotiSetter = this.moderateNotiSetter.bind(this);
  }

  componentDidUpdate(){
    const objDiv = document.getElementsByClassName('messages')[0];
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  componentWillReceiveProps(nextProps){
    if(this.props.message_objects == nextProps.message_objects){
      this.setState({ updated: true })
    }
    else {

    }
  }

  moderateNotiSetter(messages){

    if(this.state.updated == false){
      this.props.notificationArrayUpdater(messages)
    }
  }


  vetMessage(message, i){
    var user = this.props.current_user
    var username = message.author ? message.author.name : message.username
    var textbody = message.body ? message.body : message.composedMessage
    var msgFromMe;
    if(message.fromMe){
      msgFromMe = true
    }
    else if (username == user.name) {
      msgFromMe = true
    }
    else {
      msgFromMe = false
    }
    var util_obj = {}
    util_obj.username = username
    util_obj.textbody = textbody
    util_obj.msgFromMe = msgFromMe
    util_obj.isRead = true;
    return util_obj
  }

  render(){
    var messages = this.props.message_objects.map((message, i) => {
      return this.vetMessage(message, i)
    })
    var message_comps = messages.map((vettedMsg, i) => {
      return(
        <Message
          key={i}
          username={vettedMsg.username}
          message={vettedMsg.textbody}
          fromMe={vettedMsg.msgFromMe}
          isRead={vettedMsg.isRead}
        />
      )
    })
    if(this.props.message_objects && this.props.message_objects.length > 1){
      if(this.props.message_objects[0].createdAt > this.props.message_objects[1].createdAt){
      var messages = this.props.message_objects.sort((a, b) => {a.createdAt - b.createdAt}).reverse().map((message, i) => {
        return this.vetMessage(message, i)
      })
      var message_comps = messages.map((vettedMsg, i) => {
        return(
          <Message
            key={i}
            username={vettedMsg.username}
            message={vettedMsg.textbody}
            fromMe={vettedMsg.msgFromMe}
            isRead={vettedMsg.isRead}
          />
        )
      })
    }
  }

    return(
      <div className="messages" id="messageList">
        {message_comps}

      </div>
    )
  }
}

Messages.defaultProps = {
  message_objects: []
}

export default Messages;
