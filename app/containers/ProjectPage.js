import React from 'react';
import ReactDOM from 'react-dom';
import Auth from '../modules/Auth';
import Fetch from '../modules/Fetch';
import Convert from '../modules/Convert';
import {Button, ControlLabel, FormGroup, FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ProjectFiles from '../components/ProjectFiles';
import ProjectNotes from '../components/ProjectNotes';
import ChatBox from '../components/chat/chatBox';
import Autosuggestor from '../components/chat/AutoSuggest';
import {Editor, EditorState, RichUtils } from 'draft-js';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


class ProjectPage extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      project: {},
      current_user: {},
      message: '',
      users: [],
      guest_usernames: [],
      pings: [],
      form_stat: null,
      field: '',
      user_autosugg: '',
      user_message: '',
      response_file: null,
      showEditor: false,
      arrowHide_note: true,
      XOut: false,
      isShowingModal: false,
      isShowingAddEditor: false,
      isShowingAllPings: false
    }

    this.addUserClassSwitcher = this.addUserClassSwitcher.bind(this);
    this.addUserHandler = this.addUserHandler.bind(this);
    this.changeUserHandler = this.changeUserHandler.bind(this);
    this.clearUserForm = this.clearUserForm.bind(this);

    this.toggleModal = this.toggleModal.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.recipCatcher = this.recipCatcher.bind(this);
    this.revokeUser = this.revokeUser.bind(this);
    this.showAllPings = this.showAllPings.bind(this);

    this.loadProject = Fetch.loadProject.bind(this);
    this.addUserFetch = Fetch.AddUserToProject.bind(this);
    this.addNoteFetch = Fetch.submitNote.bind(this);
    this.getCurrentUser = Fetch.GetCurrentUser.bind(this);
    this.getUsers = Fetch.GetUsers.bind(this);
    this.revokeUserFetch = Fetch.removeUserFromProject.bind(this);
    this.getPings = Fetch.getProjectPings.bind(this);
  }

  componentDidMount(){
    this.getUsers();
    const _id = this.props.match.params.id
    if(localStorage.getItem('token') == null){
      this.context.router.history.push('/')
    }
    else {
      this.loadProject(_id).then((projresponse) => {
        var guest_usernames = projresponse.project.usernames
        this.getPings(projresponse.project._id).then((res) => {
          this.setState({ pings: res.pings })
        })
        .catch((err) => { console.log(err) })
        this.getCurrentUser().then((user) => {
          var userThis = (user.name == projresponse.project.ownername) ? true : false
          this.setState({ current_user: user,
                          project: projresponse.project,
                          guest_usernames: guest_usernames,
                          userThis: userThis }, () => {
            if(this.state.current_user.name != this.state.project.ownername && !Convert.isInArr(this.state.current_user.name, this.state.project.usernames)){
              this.context.router.history.push(`/project/${this.state.project._id}/read`)
            }
          })
        })
        .catch((err) => {
          this.context.router.history.push('/')
        })
      })
      .catch((err) => {
        this.context.router.history.push('/')
      })
    }
  }

  revokeUser(user){
    this.revokeUserFetch(this.state.project._id, user)
  }

  addUserClassSwitcher(){
    if(this.state.form_stat == true){
      return `new-user-true`
    }
    else if (this.state.form_stat == false) {
      return `new-user-false`
    }
    else {
      return `new-user-null`
    }
  }

  addUserHandler(event){
    event.preventDefault()
    this.addUserFetch(this.state.project._id, this.state.user_autosugg);
  }



  recipCatcher(value){
    this.setState({ user_autosugg: value })
  }

  changeUserHandler(event){
    this.setState({ add_user: event.target.value })
  }

  clearUserForm(){
    this.setState({ add_user: '' });
  }

  toggleEdit(){
    this.setState({
      showEditor: !this.state.showEditor,
      arrowHide_note: !this.state.arrowHide_note,
      isShowingAddEditor: !this.state.isShowingAddEditor
    })
  }

  toggleModal(){
    this.setState({
      isShowingModal: !this.state.isShowingModal
    })
  }

  showAllPings(){
    this.setState({
       isShowingAllPings: !this.state.isShowingAllPings
    })
  }

  render(){
    if(this.state.userThis){
      var userThisStyle = {

      }
    }
    else {
      var userThisStyle = {
        display: 'none'
      }
    }
    if(this.state.isShowingAllPings){
      var fullPingBackdrop = {
        display: 'block',
        position: 'fixed',
        height: '100vh',
        width: '100vw',
        top: '50%',
        left: '50%',
        marginTop: '-50vh',
        marginLeft: '-50vw',
        backgroundColor: 'black',
        zIndex: '10'
      }
      var fullPingModal = {
        display: 'block',
        position: 'fixed',
        height: '90vh',
        width: '80vw',
        top: '50%',
        left: '50%',
        marginTop: '-45vh',
        marginLeft: '-40vw',
        backgroundColor: 'white',
        zIndex: '11',
        overflow: 'auto'
      }
      var fullPing = {
        display: 'block',
        position: 'relative',
        zIndex: '12'
      }
    }
    else {
      var fullPingBackdrop = {
        display: 'none'
      }
      var fullPing = {
        display: 'none'
      }
      var fullPingModal = {
        display: 'none'
      }
    }

    if(this.state.XOut == true){
      display: 'none'
    }
    else {

    }

    var revokeStyle = {
      position: 'absolute',
      right: '25px',
      color: 'red',
      backgroundColor: '#ff8080',
      padding: '2px',
      borderRadius: '2px',
      cursor: 'pointer',
      maxHeight: '26px',
      textAlign: 'right'

    }
    if(!Convert.isArrEmpty(this.state.pings)){
      var sortedPings = Convert.dateSort(this.state.pings, 'ping')
      var renderProjPings = sortedPings.map((ping, i) => {
        var date = Convert.prettifyDate(ping.createdAt)
        return(
          <li
            key={i}
            className="ping-cell"
          >
            <span>{ping.text}</span>
            <span className="profile-ping-createdat">{date}</span>
          </li>
        )
      })

      var renderProjPingsShort = renderProjPings.slice(0, 14)
    }
    else {
      var date = new Date().toString().split(' ')
      date = date[1] + '/' + date[2] + '/' + date[3]
      var renderProjPings = (<li className="ping-cell-empty"><span> hasn't done anything yet </span><span className="empty-ping-date">{date}</span></li>)
    }
    if(!Convert.isArrEmpty(this.state.guest_usernames)){
      var print_users = this.state.guest_usernames.map((user, i) => {
        return(
          <li key={i} className="permitted-user-tile">
             {user}
             <span
               style={revokeStyle}
               onClick={ () => { this.revokeUser(user) }}>
               &#10006;
             </span>
          </li>
        )
      })
    }
    else {
      var print_users = (<p> none </p>)
    }
    if(!Convert.isArrEmpty(this.state.users)){
      var users = this.state.users
    }
    else {
      var users = [];
    }

    return(
      <div className="project-show" >
        <div className="project-header-container">
          <h1 className="project-header ">
            {this.state.project.title}
          </h1>
          <div className="project-title ">
            {this.state.project.description}
          </div>
        </div>




        <div className="project-user-area">
          <div className="project-user-area-owner">
            Owner: {this.state.project.ownername}
          </div>
          <div className="project-user-area-users">
            Guest Contributors:
            <ul>
              {print_users}
            </ul>
          </div>
          <div className="project-add-user-form" style={userThisStyle}>
            <div className={this.addUserClassSwitcher()}>
              <div> {this.state.user_message}</div>
            </div>
            <form onSubmit={this.addUserHandler}>
                <label> New User </label>
                <div className="add-user-autosuggest-container" onChange={() => { }}>
                  <Autosuggestor
                  recipCatcher={this.recipCatcher}
                  users={users}
                  />
                </div>
              <button type="submit"> Add user </button>
            </form>
          </div>
        </div>




        <div className="project-main-area">
          <div className="page-bisector"> </div>
          <div className="projectfiles-big-container">
            <div id="projectfiles-container">
              <ProjectFiles
                project={this.state.project}
                fileExpand={this.state.fileExpand}
                noteExpand={this.state.noteExpand}
                userThis={this.state.userThis}
              />
            </div>
          </div>




          <div className="projectnotes-big-container">
            <div id="projectnotes-container">
              <ProjectNotes
                project={this.state.project}
                fileExpand={this.state.fileExpand}
                noteExpand={this.state.noteExpand}
                isShowingModal={this.state.isShowingModal}
                toggleModal={this.toggleModal}
                userThis={this.state.userThis}
              />
            </div>
          </div>

          <div className="projectpage-chatbox">
            <ChatBox
              project={this.state.project}
              current_user={this.state.current_user}
            />
          </div>

          <div className="projectpage-pings">
            <ol className="projping-list">
              {renderProjPingsShort}
            </ol>
            <span onClick={this.showAllPings}
            className="seeall-projpings no-select">See all...</span>

            <div
              style={fullPingBackdrop}
              className="projping-full-backdrop"
              onClick={this.showAllPings}
            >
            </div>

            <div style={fullPingModal} className="projping-full-modal">
              <ol style={fullPing} className="projping-list-full">
                {renderProjPings}
              </ol>
            </div>

          </div>

          <div className="project-main-area">
            <div className="clear"> </div>
          </div>

        </div>

      </div>
    )
  }
}

ProjectPage.contextTypes = {
  router: PropTypes.object.isRequired
}

export default ProjectPage;
