import React from 'react';
import Messages from './messages';
import Auth from '../../modules/Auth';
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
      this.setState({ message_objects: conversation.message_objects })
      this.socket.emit('got message', (msg_status))
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
    this.persistMessage = this.persistMessage.bind(this);
    this.startNewHandler = this.startNewHandler.bind(this);
    this.recipCatcher = this.recipCatcher.bind(this);
  }

  componentDidMount(){
    var user_id = this.props.current_user._id
    if(this.state.message_objects.length == 0){
      if(this.props.current_convo != 'no-convo' && this.props.current_convo != 'conv-list-new-message'){
        var convo_id = this.props.current_convo
        var url = `http://localhost:3000/chat/users/${user_id}/conversations/${convo_id}`
        fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `bearer ${Auth.getToken()}`
          }
        })
        .then(response => response.json())
        .then((response) => {
          if(response.conversation){
            console.log(response)
            this.setState({ message_objects: response.conversation })
          }
          else if (response.message) {
            console.log(response.message)
            this.setState({ response_msg: response.message })
          }
        })
        .catch((err) => {
          console.log(err)
        })
      }
    }
  }

  componentWillMount(){
    let users_url = `http://localhost:3000/api/users`
    fetch(users_url, {
      method: 'GET',
      headers: {
        Authorization: `bearer ${Auth.getToken()}`
      }
    })
    .then(response => response.json())
    .then((response) => {
      this.setState({ users: response.users })
    })
    .catch((err) => {
      console.log(err)
    })
  }


  componentWillUnmount(){
    var user_id = this.props.current_user._id
    var convo_id = this.props.current_convo
    if(this.state.message_objects.length != 0){
      var load = this.state.message_objects
      load = JSON.stringify(load)

      var url = `http://localhost:3000/chat/users/${user_id}/conversations/${convo_id}`
      fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': "application/json",
          Authorization: `bearer ${Auth.getToken()}`
        },
        body: load
      })
      .then((response) => {
        console.log(response)
      })
      .catch((err) => {
        console.log(err)
      })
    }
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
      username: this.props.current_user.name,
      composedMessage: this.state.message,
      convo_id: this.props.current_convo
    }
    messageObject.fromMe = true;
    this.persistMessage(messageObject)
    this.addMessageObj(messageObject)
  }

  addMessageObj(messageObj){
    this.setState({
      message_objects: [...this.state.message_objects, messageObj]},
      () => {
        const convoObject = {
          message_objects: this.state.message_objects,
          convo_id: this.props.current_convo,
        }
        this.props.socket.emit('new message', convoObject)
        this.setState({ message: ''})

      });
  }

  startNewHandler(event){
    event.preventDefault();
    const messageObject = {
      username: this.props.current_user.name,
      composedMessage: this.state.message,
      recipient: this.state.recipient,
    }
    messageObject.fromMe = true;
    this.addMessageObjConvo(messageObject);
  }

  addMessageObjConvo(obj){
    this.setState({ message_objects: [...this.state.message_objects, obj]},
    () => {
      var convo_id = this.persistConvo(obj);
      this.props.convoSetter(convo_id)
      const convoObject = {
        message_objects: this.state.message_objects,
        convo_id: convo_id
      }
      this.props.socket.emit('enter conversation', convo_id)
      this.props.socket.on('user joined', (room_name) => {
        this.props.socket.emit('new message', convoObject)
      })
      this.setState({ message: '' })

    })
  }



  persistConvo(obj){
    var user_id = this.props.current_user._id
    var convo_id = this.props.current_convo
    var data = JSON.stringify(obj)
    var url = `http://localhost:3000/chat/users/${user_id}/conversations`
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': "application/json",
        Authorization: `bearer ${Auth.getToken()}`
      },
      body: data
    })
    .then((response) => {
      console.log(response)
      return response._id
    })
    .catch((err) => {
      console.log(response)
    })
  }

  persistMessage(obj){
    var user_id = this.props.current_user._id
    var convo_id = this.props.current_convo
    var data = JSON.stringify(obj)
    var url = `http://localhost:3000/chat/users/${user_id}/conversations/${convo_id}`
    fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': "application/json",
        Authorization: `bearer ${Auth.getToken()}`
      },
      body: data
    })
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
  }


  render(){

    if(this.props.current_convo !== 'conv-list-new-message'){
      return(
        <div className="chatcell-container">
          <div>
            <Messages
            current_user={this.props.current_user}
            message_objects={this.state.message_objects}/>
          </div>
          <div>
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
          <div>
            <Messages
            current_user={this.props.current_user}
            message_objects={this.state.message_objects}/>
          </div>
          <div>
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

export default ChatCell;
