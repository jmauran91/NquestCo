import React from 'react';
import io from 'socket.io-client';
import Auth from '../../modules/Auth';


class ChatList extends React.Component{
  constructor(props){
    super(props);
    this.socket = this.props.socket;

    this.state = {

    }
  }


  render(){
    var chatListStyle = {}
    if(this.props.conversations){
      if(typeof this.props.conversations !== 'undefined' &&
                        this.props.conversations.length != 0 &&
                          this.props.conversations[0].length != 0){
        var renderConvos = this.props.conversations.map((conversation, i) => {
          /// choosing the first message of the conversation
          /// recipients should be the same for all msgs in conversation
          if(conversation[0].recipients){
            var conv_recipients = ``;
            conversation[0].recipients.map((recip) => {
              conv_recipients + `${recip}, `
            })
          }
          else if (conversation[0].recipient){
            var conv_recipients = conversation[0].recipient
          }
          // setting the recipients to be 1 recipient in the event
          // of a 1-on-1 conversation or all of the recipients in the event
          // of a 1-on-many conversation
          conversation.forEach((msg) => {
            if(msg.isRead == false){
              chatListStyle = {
                fontWeight: 'bold'
              }
            }
          })
          // Setting the chatList element to be Bold if there
          // are any unread messages within the conversation
          return(
            <li
              key={i+1}
              className="convo-tile"
              onClick={this.props.convoSelector}
              id={conversation[0].conversationId}
            >
              <div className="convo-recipients" style={chatListStyle}>
                {conv_recipients}
              </div>
            </li>
          )
        })
      }
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
