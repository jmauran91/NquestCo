import React from 'react';
import Messages from './messages';
import Auth from '../../modules/Auth';
import Convert from '../../modules/Convert';
import Fetch from '../../modules/Fetch';
import { animateScroll } from "react-scroll";
import io from 'socket.io-client';
const socket = io( { rejectUnauthorized: false, 'transports': ['websockets', 'flashsocket', 'polling'] })


class ChatBox extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      users: [],
      message_objects: [],
      message: '',
      paused: true,


    }

    this.socket = socket
    this.socket.on('ping', (data) => {
      this.socket.emit('pong', data, () => {
      });
    })

    this.socket.on('refresh chatbox', (chatbox) => {

      if(this.state.message_objects.length < 40){
        this.setState({ message_objects: chatbox.messages})
      } else {
        var slid_msgs = this.slideArray(chatbox.messages, chatbox.messages[chatbox.messages.length - 1]);
        this.setState({ message_objects: slid_msgs })
      }
    })



    this.handleSubmitToChatBox = this.handleSubmitToChatBox.bind(this);
    this.slideArray = this.slideArray.bind(this);
    this.addMessageObj = this.addMessageObj.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
    this.pauseChatbox = this.pauseChatbox.bind(this);
    this.periodicallySaveChatbox = this.periodicallySaveChatbox.bind(this);

    this.fetchChatbox = Fetch.getChatbox.bind(this);
    this.saveChatbox = Fetch.updateChatbox.bind(this);
  }


  componentWillReceiveProps(nextProps){
    if(typeof nextProps.project._id != 'undefined'){
      var chat_pass = `"chatbox ${nextProps.project._id}"`
      this.socket.emit('enter chatbox', chat_pass)
      this.fetchChatbox(nextProps.project._id)
      .then((result) => {
        var message_objects = result.chatbox.messages.map((msg) => {
          var time = msg.split(" ")[0]
          let n_ame = msg.split(":")[2]
          var name = n_ame.split("Z")[1]
          var body = msg.split(":")[3]
          return {
            composedMessage: body,
            createdAt: time,
            username: name,
            isRead: true,
            fromMe: false
          }
        })
        this.setState({ message_objects: message_objects }, () => {
          console.log('State set to chatbox fetch')
        })
      })
      .catch((err) => {
        console.log(err)
      })

    }
  }

  componentWillUnmount(){
    var chat_pass = `chatbox ${this.props.project._id}`
    this.socket.emit('leave chatbox', this.props.project._id)
  }

  slideArray(array, item){
    array.push(item)
    array.shift();
    return array
  }

  handleSubmitToChatBox(event){
    event.preventDefault();
    const messageObject = {
      username: this.props.current_user.name,
      composedMessage: this.state.message
    }
    messageObject.fromMe = true;
    messageObject.isRead = false;
    var raw_date = new Date();
    messageObject.createdAt = Convert.changeDate(raw_date);
    this.addMessageObj(messageObject);
  }

  addMessageObj(messageObj){
    var chatbox = {
       messages: [...this.state.message_objects, messageObj],
       _id: `"chatbox ${this.props.project._id}"`
    }
    this.socket.emit('new message chatbox', chatbox)
    this.setState({ message: '' })
  }

  handleInput(event){
    this.setState({ message: event.target.value })
  }


  pauseChatbox(){
    this.setState({ paused: !this.state.paused})
  }

  scrollToBottom(){
    this.messagesEnd.parentNode.scrollTop = this.messagesEnd.offsetTop;
  }


  componentDidUpdate() {
    if(!this.state.paused){
      this.scrollToBottom();
    }
  }

  periodicallySaveChatbox(){
    if(!this.state.paused){
      setTimeout(() => {
        if(typeof this.props.project._id != 'undefined' && !Convert.isArrEmpty(this.state.message_objects)){
          this.saveChatbox(this.props.project._id, this.state.message_objects)
          .then((response) => {
            console.log("chatbox saved");
          })
          .catch((error) => {
            console.log("Error")
          })
          this.periodicallySaveChatbox();
        }
        else {
          console.log('nothing to send back')
          this.periodicallySaveChatbox();
        }
      }, 20000)
    }
  }


  render(){

    this.periodicallySaveChatbox();

    var renderChat = this.state.message_objects.map((obj, i) => {
      if(Convert.isStrExist(obj.author)){
        var user = obj.author
      }
      else {
        var user = obj.username
      }
      let time = Convert.returnTime(obj.createdAt)
      return(
        <li
          className="chat-li"
          key={i}
        >
          <span>{time}</span>
          <span>{user}: </span>
          <span>{obj.composedMessage}</span>
        </li>
      )
    })
    if(this.state.paused){
      var pauseSwitch = "Unpause Chatbox"
    }
    else {
      var pauseSwitch = "Pause Chatbox"
    }
    return(
      <div className="chatbox-master">
        <div className="chatbox-sub" >
          <ol id="list">
            {renderChat}
            <li id="message-clearer" style={{display: 'block'}}
                ref={(el) => { this.messagesEnd = el; }}
            ></li>
          </ol>
        </div>
          <form className="chatbox-form" onSubmit={this.handleSubmitToChatBox}>
            <input
              value={this.state.message}
              onChange={this.handleInput}
            />
            <input type="submit" style={{display: 'none'}} />
          </form>
          <button className="pause-button" onClick={this.pauseChatbox}>{pauseSwitch}</button>
      </div>
    )
  }
}

export default ChatBox;
