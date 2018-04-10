import React from 'react';
import ChatList from './chatList';
import ChatCell from './chatCell';
import io from 'socket.io-client';
const socket = io("http://localhost:3000", { rejectUnauthorized: false, 'transports': ['websockets', 'flashsocket', 'polling'] })


class ChatContainer extends React.Component {
  constructor(props){
    super(props);

    this.socket = socket;
    this.state = {
      current_convo: ''
    }

    this.convoSelector = this.convoSelector.bind(this);
    this.convoSetter = this.convoSetter.bind(this);
  }

  convoSelector(event){
    if(this.state.current_convo == ''){
      this.setState({ current_convo: event.target.parentElement.id })
      this.socket.emit('enter conversation', event.target.parentElement.id)
    }
    else {
      this.setState({ current_convo: ''})
      this.socket.emit('leave conversation', event.target.parentElement.id)
    }
  }

  convoSetter(id){
    this.setState({ current_convo: id })
  }


  render(){
    return(
      <div className="chatcontainer">
        <div className="chatlist">
          <ChatList
            convoSelector={this.convoSelector}
            current_user={this.props.current_user}
            socket={this.socket}/>
        </div>
        <div className="chatcell">
          <ChatCell
            convoSetter={this.convoSetter}
            current_user={this.props.current_user}
            current_convo={this.state.current_convo}
            socket={this.socket}/>
         </div>

      </div>

    )
  }
}

export default ChatContainer;
