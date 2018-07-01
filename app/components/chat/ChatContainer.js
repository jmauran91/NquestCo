import React from 'react';
import ChatList from './chatList';
import ChatCell from './chatCell';
import io from 'socket.io-client';
import Auth from '../../modules/Auth';
import Fetch from '../../modules/Fetch';
import Convert from '../../modules/Convert';
const socket = io( { rejectUnauthorized: false, 'transports': ['websockets', 'flashsocket', 'polling'] })



class ChatContainer extends React.Component {
  constructor(props){
    super(props);

    this.socket = socket;
    this.socket.on('ping', (data) => {
      this.socket.emit('pong', data);
    })

    this.state = {
      current_convo: '',
      conversations: null,
      current_convo_msgs: []
    }

    this.convoSelector = this.convoSelector.bind(this);
    this.convoSetter = this.convoSetter.bind(this);
    this.convoMsgsSetter = this.convoMsgsSetter.bind(this);
    this.funcOnConvSelect = this.funcOnConvSelect.bind(this);
    this.meltConvosTogether = this.meltConvosTogether.bind(this);


    this.getConvos = Fetch.GetConvos.bind(this);
    this.persistMessage = Fetch.PatchConvo.bind(this);
  }

  componentDidMount(){
    this.getConvos()
    .then((response) => {
      if(response.message == "no conversations for this user yet"){
        this.setState({ conversations: null})
      }
      else {
        var conv_array = response.conversations_array
        for( var n = 0, len = conv_array.length; n < len - 1; n++){
          for( var j = 1; j < len ; j++){
            /// IF THERE ARE TWO CONVERSATIONS WITH REVERSED
            /// AUTHOR / RECIPIENT AND RECIPIENT / AUTHOR
            /// THEN MELT THEM TOGETHER
            try{
              if(conv_array[n][0].author.name == conv_array[j][0].recipient && conv_array[j][0].author.name == conv_array[n][0].recipient){
                conv_array[n] = this.meltConvosTogether(conv_array[n], conv_array[j])
                conv_array.splice(j, 1)
              }
            }
            catch(err){
              console.log(err)
            }
          }
        }
        this.setState({ conversations: conv_array })
      }
    })
    .catch((err) => {
      console.log(err)
    })
  }

  meltConvosTogether(conv1, conv2){
    var utiConvo = conv1.concat(conv2)
    var meltedConvo = Convert.dateSort(utiConvo, 'msg')
    return meltedConvo;
  }


  funcOnConvSelect(id){
    var right_convo = this.state.conversations.find(conv => conv[0].conversationId === id)
    // find the conversation that matches with the convo_id given
    // from clicking on the convo element
    var convo_unread = 0
    // set up counter
    right_convo = right_convo.map((msg, i) => {
      if(msg.isRead == false){
        convo_unread += 1
        msg.isRead = true;
        this.persistMessage(msg)
      }
      return msg;
    })
    // sort through the array of msg objects for the right conversation
    // count how many haven't been read, and then mark them as read.
    // Save the quantum of unread messages to the counter.
    var new_unread = this.props.total_unread - convo_unread
    // Subtract the quantum of unread messages from the total unread.
    // Implying that they have now been read.
    this.setState({ current_convo: id, current_convo_msgs: right_convo},
    () => {
      this.socket.emit('enter conversation', id)
      this.props.notiTallyUpdater(new_unread)
    })
  }


  convoSelector(event){
    if (event.target.id){
      var id = event.target.id
    }
    else {
      var id = event.target.parentElement.id
    }
    if(this.state.current_convo != id){
      if(id == "conv-list-new-message"){
        this.setState({
          current_convo: id
        })
      }
      else {
        this.funcOnConvSelect(id)
      }
    }
    else {
      this.setState({ current_convo: '', current_convo_msgs: [] },
       () => { this.socket.emit('leave conversation', id) })
    }
  }

  convoSetter(id){
    this.setState({ current_convo: id }, () => {
      this.getConvos();
    })
  }

  convoMsgsSetter(msgs){
    this.setState({ current_convo_msgs: msgs }, () => {
      const convoObject = {
        message_objects: this.state.current_convo_msgs,
        convo_id: this.state.current_convo,
      }
      this.socket.emit('new message', convoObject)
    })
  }


  render(){

    // if the id from the selector matches with
    // one of the conversations fetched to the state
    // then pass that conversation's message contents
    // to the child as a prop
    var message_objects_old = [];
    var conversations = this.state.conversations;
    if(this.state.current_convo != ''){
      var chatCellStyle = {
        display: 'block'
      }
      if(!Convert.isArrEmpty(this.state.conversations)){
        if(!Convert.isArrEmpty(this.state.conversations[0])){
          this.state.conversations.forEach((conversation) => {
            if(this.state.current_convo == conversation[0].conversationId){
              var convo_user = conversation[0].author.name;
                if(this.state.current_convo_msgs[0].username ){
                  var selected_convo_user = this.state.current_convo_msgs[0].username
                }
                else {
                  var selected_convo_user = this.state.current_convo_msgs[0].author.name;
                }
                if( selected_convo_user == convo_user ){
                  message_objects_old = this.state.current_convo_msgs;
                }
              }
            }, this)
          }
        else {
          conversations = []
        }
      }
    }
    else {
      var chatCellStyle = {
        display: 'none'
      }
    }
    return(
      <div className="chatcontainer">
        <div className="chatlist">
          <ChatList
            convoSelector={this.convoSelector}
            current_user={this.props.current_user}
            conversations={conversations}
            socket={this.socket}/>
        </div>
        <div className="chatcell" style={chatCellStyle}>
          <ChatCell
            convoMsgsSetter={this.convoMsgsSetter}
            convoSetter={this.convoSetter}
            current_user={this.props.current_user}
            current_convo={this.state.current_convo}
            message_objects_old={message_objects_old}
            notiTallyUpdater={this.props.notiTallyUpdater}
            total_unread={this.props.total_unread}
            socket={this.socket}/>
        </div>
      </div>
    )
  }
}

export default ChatContainer;
