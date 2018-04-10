import React from 'react';
import io from 'socket.io-client';
import Auth from '../../modules/Auth';


class ChatList extends React.Component{
  constructor(props){
    super(props);
    this.socket = this.props.socket;

    this.state = {
      conversations: [],
      response_msg: ''
    }
  }

  componentWillMount(){
    var _id = this.props.current_user._id
    var url = `http://localhost:3000/chat/users/${_id}/conversations`
    if(this.state.conversations.length == 0 || this.state.response_msg == ''){
      fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `bearer ${Auth.getToken()}`
        }
      })
      .then(response => response.json())
      .then((response) => {
        if(response.message){
          console.log(response.message)
          this.setState({ response_msg: response.message })
        }
        else{
          this.setState({ conversations: response.conversations_array })
          console.log(response.conversations_array)
          console.log(response.conversations_array[0])

        }
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }

  render(){

    if(this.state.conversations.length != 0){
      var renderConvos = this.state.conversations.map((conversation, i) => {
        if(conversation.recipients){
          var conv_recipients = ``;
          conversation.recipients.map((recip) => {
            conv_recipients + `${recip}, `
          })
        }
        else if (conversation.recipient){
          var conv_recipients = conversation.recipient
        }
        return(
          <li
            key={i+1}
            className="convo-tile"
            onClick={this.props.convoSelector}
            id={conversation.conversationId}
          >
            <div className="convo-avatar">
              <img />
            </div>
            <div className="convo-recipients">
              {conv_recipients}
            </div>
          </li>
        )
      })
    }
    else {
      var renderConvos = <li id="no-convo" className="convo-tile-no-convos">No convos yet</li>
    }

    return(
      <div>
        <div className="conv-list-container">
          <ul className="conv-list">
            <li
              key={0}
              onClick={this.props.convoSelector}
              className="conv-list-new-message"
              id="conv-list-new-message"
            >
            New Message
            </li>
            {renderConvos}
          </ul>
        </div>
       </div>
    )
  }
}



export default ChatList;
