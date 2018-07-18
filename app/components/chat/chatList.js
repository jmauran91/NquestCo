import React from 'react';
import io from 'socket.io-client';
import Auth from '../../modules/Auth';
import Convert from '../../modules/Convert';


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
        var renderConvosUnsorted = this.props.conversations.map((conversation, i) => {
          /// choosing the first message of the conversation
          /// recipients should be the same for all msgs in conversation
          if( conversation[0].author._id == this.props.current_user._id ){
            if(conversation[0].recipients){
              var profpic = "/assets/images/question_mark_PNG.png"
              var conv_recipients = ``;
              conversation[0].recipients.map((recip) => {
                conv_recipients + `${recip}, `
              })
            }
            else if (conversation[0].recipient){
              var conv_recipients = conversation[0].recipient
              if(Convert.isStrExist(conversation[0].profpic)){
                var profpic = conversation[0].profpic
              }
              else {
                var profpic = "/assets/images/question_mark_PNG.png"
              }
            }
          }
          else {
            if(conversation[0].recipient){
              var conv_recipients = conversation[0].author.name
              var profpic = conversation[1].profpic
            }
            else if (conversation[0].recipients){
              var profpic = "/assets/images/question_mark_PNG.png"
              var conv_recipients = conversation[0].author.name
              conversation[0].recipients.map((recip) => {
                conv_recipients + `, ${recip}`
              })
            }
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
          let lastMsg = conversation.length - 1
          var lastCreatedAt = conversation[0].createdAt
          return(
            <li
              key={i+1}
              className="convo-tile no-select"
              onClick={this.props.convoSelector}
              id={conversation[0].conversationId}
              createdat={lastCreatedAt}
            >
              <img style={{
                width: '38px', height: '45px',
                borderRadius:'50%', float: 'left',
                marginRight: '16px',
              }}
                src={profpic} />
              <div className="convo-recipients" style={chatListStyle}>
                {conv_recipients}
              </div>
            </li>
          )
        })
        var renderConvos = Convert.dateSort(renderConvosUnsorted, 'convo')
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
              className="conv-list-new-message no-select"
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
