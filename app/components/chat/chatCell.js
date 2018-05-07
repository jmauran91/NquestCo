import React from 'react';
import Messages from './messages';
import Auth from '../../modules/Auth';
import Convert from '../../modules/Convert';
import Fetch from '../../modules/Fetch';
import Autosuggestor from './AutoSuggest';


class ChatCell extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      users: [],
      message_objects: [],
      message: '',
      recipient: '',
      check: null
    }

    this.socket = this.props.socket;
    var msg_status = 'message-read'

    this.socket.on('refresh messages', (conversation) => {
      this.setState({ message_objects: conversation.message_objects }, () => {

        if(conversation.message_objects.length > 0){
          var new_msgs = conversation.message_objects.filter(obj => !this.props.message_objects_old.includes(obj));
          var new_tally = this.props.total_unread.length + new_msgs.length
          this.props.notiTallyUpdater(new_tally);
        }
        else {
          this.props.notiTallyUpdater(1)
        }
        this.socket.emit('got message', (msg_status))
      })
    })

    this.socket.on('message sent', (conv_user_id) => {
      var message_element = document.getElementsByClassName('message')[-1]
      var element_className = message_element.className + ` ${msg_status}`
      message_element.setAttribute('class', element_className)
    })

    this.sendHandler = this.sendHandler.bind(this);
    this.addMessageObj = this.addMessageObj.bind(this);
    this.addMessageObjConvo = this.addMessageObjConvo.bind(this);
    this.textHandler = this.textHandler.bind(this)
    this.socketCatcher = this.socketCatcher.bind(this);
    this.persistMessage = Fetch.PatchConvo.bind(this);
    this.persistConvo = Fetch.PostToConvos.bind(this);
    this.getUsers = Fetch.GetUsers.bind(this);
    this.startNewHandler = this.startNewHandler.bind(this);
    this.recipCatcher = this.recipCatcher.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(this.state.message_objects.length < nextProps.message_objects_old.length){
      this.setState({ message_objects: nextProps.message_objects_old },
        () => {  })
    }
  }

  componentDidMount(){
    this.getUsers();
  }

  recipCatcher(value){
    this.setState({ recipient: value })
  }

  socketCatcher(data){
    this.setState({ message_objects: data })
  }

  textHandler(event){
    this.setState({ message: event.target.value})
  }


  sendHandler(event){
    event.preventDefault();
    const messageObject = {
      username: this.props.current_user.firstName + " " + this.props.current_user.lastName,
      composedMessage: this.state.message,
      convo_id: this.props.current_convo,
    }
    messageObject.fromMe = true;
    messageObject.isRead = false;
    var raw_date = new Date();
    messageObject.createdAt = Convert.changeDate(raw_date);
    messageObject.recipient = this.state.message_objects[(this.state.message_objects.length - 1)].recipient
    this.addMessageObj(messageObject)
    this.persistMessage(messageObject)
  }

  addMessageObj(messageObj){
    var messages = [...this.state.message_objects, messageObj]
    this.props.convoMsgsSetter(messages)
    this.setState({ message: ''})
  }


  startNewHandler(event){
    event.preventDefault();
    const messageObject = {
      username: this.props.current_user.firstName + " " + this.props.current_user.lastName,
      composedMessage: this.state.message,
      recipient: this.state.recipient,
    }
    messageObject.fromMe = true;
    messageObject.isRead = false;
    var raw_date = new Date();
    messageObject.createdAt = Convert.changeDate(raw_date);
    this.props.convoMsgsSetter([messageObject])
    this.addMessageObjConvo(messageObject);
  }

  addMessageObjConvo(obj){
    this.setState({ message_objects: [obj]},
    () => {
      this.persistConvo(this.props.current_user._id, obj)
      .then((res) => {
        var convo_id = res.conversation._id
        this.persistMessage(obj, convo_id)
        .then((response) => {
          var msg_pers = response
          const convoObject = {
            message_objects: this.state.message_objects,
            convo_id: convo_id
          }
          this.props.socket.emit('enter conversation', convo_id)
          this.props.socket.on('user joined', (room_name) => {
            this.props.socket.emit('new message', convoObject)
          })
          this.props.convoSetter(convo_id)
          this.setState({ message: '' })
        })
        .catch((err) => {
          console.log(err)
        })
      })
    })
  }


  render(){
    var message_objects = []
    if(this.state.message_objects){
      var header;
      var myStyle;
      if(this.props.current_convo == ''){
         myStyle= {
          display: 'none'
        }
      }
      else if(this.props.current_convo !== 'conv-list-new-message'){
        if(this.state.message_objects.length != 0){
          let textindex = this.state.message_objects.length - 1
          let text = `Chatting with: ${this.state.message_objects[textindex].recipient}`
          message_objects = this.state.message_objects
          header = text;
          myStyle = {};
        }
      }
      else {
        header = 'New Message';
        myStyle = {};
      }

      if(this.props.current_convo !== 'conv-list-new-message'){
        return(
          <div className="chatcell-container">
            <div className="chatcell-header" style={myStyle}>
              <h5>
                {header}
              </h5>
            </div>
            <div className="chatcell-messages">
              <Messages
              current_user={this.props.current_user}
              message_objects={message_objects}
              notificationArrayUpdater={this.props.notificationArrayUpdater}/>
            </div>
            <div className="chat-input-holder">
              <form className="chat-input" onSubmit={this.sendHandler}>
                <input type="text"
                onChange={this.textHandler}
                value={this.state.message}
                placeholder="...message..."
                />
              </form>
            </div>
          </div>
        )
      }
      else {
        return(
          <div className="chatcell-container">
            <div className="chatcell-header" style={myStyle}>
              <h5>
                {header}
              </h5>
            </div>
            <div className="chatcell-messages">
              <Messages
              current_user={this.props.current_user}
              message_objects={message_objects}
              notificationArrayUpdater={this.props.notificationArrayUpdater}/>
            </div>
            <div className="chat-input-holder">
              <form className="chat-input" onSubmit={this.startNewHandler}>
                <input type="text"
                onChange={this.textHandler}
                value={this.state.message}
                placeholder="...message..."
                />
                <Autosuggestor
                  recipCatcher={this.recipCatcher}
                  users={this.state.users}
                  current_user={this.props.current_user}
                  current_convo={this.props.current_convo}
                />
                <button type="submit"> Submit</button>
              </form>
            </div>
          </div>
        )
      }
    }
  }
}

export default ChatCell;
