import React from 'react';
import Fetch from '../modules/Fetch';
import Auth from '../modules/Auth';
import PropTypes from 'prop-types';

class AdminPage extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      message: ''
    }

    this.deleteNotes = Fetch.deleteNotes.bind(this);
    this.deleteFiles = Fetch.deleteFiles.bind(this);
    this.deleteProjects = Fetch.deleteProjects.bind(this);
    this.deleteUsers = Fetch.deleteUsers.bind(this);
    this.deleteConvos = Fetch.deleteConvos.bind(this);
    this.deletePings = Fetch.deletePings.bind(this);
    this.deleteMessages = Fetch.deleteMessages.bind(this);

  }

  componentWillMount(){
    if(!Auth.authorizeAdmin()){
      this.context.router.history.push('/')
    }
  }

  componentWillUpdate(){
    if(!Auth.authorizeAdmin()){
      this.context.router.history.push('/')
    }
  }

  render(){
    if(this.state.message !== ''){
      var msgStyle = {
        backgroundColor: 'green',
        color: 'white',
        width: '50vw',
        height: '10vh',
        fontSize: '3em',
        position: 'absolute',
        bottom: '20%',
        left: '40%'
      }
    }
    else {
      var msgStyle = {
        display: 'none'
      }
    }
    return(
      <div className="admin-master">
        <h1> Hello there! This is the admin page </h1>
        <div className="admin-control-holder">
          <h2> Danger!!! </h2>
          <ul>
            <li className="admin-control" >
              <span onClick={this.deleteNotes}>Delete Notes</span>
            </li>
            <li className="admin-control" >
              <span onClick={this.deleteFiles}>Delete Files</span>
            </li>
            <li className="admin-control" >
              <span onClick={this.deleteProjects}>Delete Projects</span>
            </li>
            <li className="admin-control" >
              <span onClick={this.deleteUsers}>Delete Users</span>
            </li>
            <li className="admin-control" >
              <span onClick={this.deleteConvos}>Delete Convos</span>
            </li>
            <li className="admin-control" >
              <span onClick={this.deletePings}>Delete Pings</span>
            </li>
            <li className="admin-control" >
              <span onClick={this.deleteMessages}>Delete Messages</span>
            </li>
          </ul>
        </div>
        <div className="admin-response-msg" style={msgStyle}>
          {this.state.message}
        </div>
      </div>
    )
  }
}


AdminPage.contextTypes = {
  router: PropTypes.object.isRequired
}


export default AdminPage
