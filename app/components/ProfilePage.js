import React from 'react';
import Fetch from '../modules/Fetch';
import Auth from '../modules/Auth';
import Convert from '../modules/Convert';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';


class ProfilePage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      _user: {},
      current_user: {},
      pings: [],
      add_file: '',
      isEditing: false,
      quillText: '',
      new_about: null,
      isShowingAllPings: false
    }

    this.picSubmit = this.picSubmit.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.editProfileHandle = this.editProfileHandle.bind(this);
    this.handleSubmitEdition = this.handleSubmitEdition.bind(this);
    this.quillHandleChange = this.quillHandleChange.bind(this);
    this.cancelAboutEdit = this.cancelAboutEdit.bind(this);
    this.dateSort = Convert.dateSort.bind(this);
    this.showAllPings = this.showAllPings.bind(this);


    this.getUser = Fetch.GetUser.bind(this);
    this.getCurrentUser = Fetch.GetCurrentUser.bind(this);
    this.getPings = Fetch.GetPings.bind(this);
    this.uploadAvatarFetch = Fetch.uploadAvatar.bind(this);
    this.editUser = Fetch.editUser.bind(this);
  }

  editProfileHandle(){
    this.setState({ isEditing: !this.state.isEditing })
  }


  cancelAboutEdit(){
    this.setState({ isEditing: false })
  }

  handleSubmitEdition(event){
    event.preventDefault();
    this.editUser(this.state._user._id, this.state.quillText)
    this.editProfileHandle();
  }

  quillHandleChange(event){
    this.setState({ quillText: event })
  }

  showAllPings(){
    this.setState({
      isShowingAllPings: !this.state.isShowingAllPings
    })
  }


  componentDidMount(){
    this.getCurrentUser().then((response) => {
      this.setState({ current_user: response})
    })
    .catch((err) => {this.context.router.history.push('/') } )
    var u_id = this.context.router.history.location.pathname.split('/')[2]
    this.getUser(u_id).then((response) => {
      console.log(response.msg)
      this.setState({ _user: response.user }, () => {
        this.getPings().then((pings) => {
           this.setState({ pings: pings })
        })
      })
    })
  }

  onDrop(files){
    var file = files[0]
    this.setState({ add_file: file })
  }

  picSubmit(event){
    event.preventDefault();
    this.uploadAvatarFetch(this.state._user._id, this.state.add_file);
  }


  render(){
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


    if( this.state.current_user._id == this.state._user._id ){
      var avStyle = {
        display: 'block'
      }
    }
    else {
      var avStyle = {
        display: 'none'
      }
    }
    if(this.state.isEditing){
      var abtMeStyle = {
        display: 'block'
      }
    }
    else {
      var abtMeStyle = {
        display: 'none'
      }
    }


    if(!Convert.isArrEmpty(this.state._user.guest_projects)){
      var guestnames = this.state._user.guest_projects.map((pro, i) => {
        if(i == this.state._user.guest_projects.length - 1){
          var spacer = ""
          if(this.state._user.guest_projects.length > 1){
            var prespacer = " and "
          }
          else {
            var prespacer = ""
          }
        }
        else {
          var spacer = ", "
          var prespacer = ""
        }
        var url = `/project/${pro._id}`
        var title = pro.title
        return(
          <a key={i} href={url}>{(i ? ", " : "") + title}</a>
        )
      })
    }
    else {
      var guestnames = ""
    }
    if(!Convert.isArrEmpty(this.state._user.owned_projects)){
      var projnames = this.state._user.owned_projects.map((pro, i) => {
        if(i == this.state._user.owned_projects.length - 1){
          var spacer = ""
          if(this.state._user.owned_projects.length > 1){
            var prespacer = " and "
          }
          else {
            var prespacer = ""
          }
        }
        else {
          var spacer = ", "
          var prespacer = ""
        }
        var url = `/project/${pro._id}`
        var title = pro.title
        return(
          <a key={i} href={url}> {(i ? ", " : "") + title} </a>
        )
      })
    }
    else {
      var projnames = ""
    }
    if (this.state._user._id){
      var _id = this.state._user._id;
      var name = this.state._user.name;
      var email = this.state._user.email;
      if(Convert.isStrExist(this.state.new_about)){
        var aboutMe = this.state.new_about.replace(/<(?:.|\n)*?>/gm, '');
      }
      else if (Convert.isStrExist(this.state._user.about)){
        var aboutMe = this.state._user.about.replace(/<(?:.|\n)*?>/gm, '');
      }
      else {
        var aboutMe = ''
      }
    }
    else {
      var _id, name, email = "";
    }
    if(!Convert.isArrEmpty(this.state.pings)){
      var new_pingset = this.dateSort(this.state.pings, 'note');
      var render_pings = new_pingset.map((ping, i) => {
        var date = Convert.prettifyDate(ping.createdAt);
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
      var render_pings_short = render_pings.slice(0,14)
    }
    else {
      var date = new Date().toString().split(' ')
      date = date[1] + '/' + date[2] + '/' + date[3]
      var render_pings = (<li className="ping-cell-empty"> <span>{this.state._user.name} hasn't done anything yet </span><span className="empty-ping-date">{date}</span></li>)
    }
    return(
      <div className= "profile-container">
        <div className="profile-body" >
          <div className="prof-pic-container" >
            <img className="prof-pic" src={this.state._user.profpic} />
            <form className="avatar-upload" onSubmit={this.picSubmit} style={avStyle}>
              <label className="upload-label"> Add / Edit Profile Picture </label>
              <Dropzone className="dropzone" onDrop={this.onDrop}>
                <p> Drag file or click to upload </p>
              </Dropzone>
              <button className="button" type="submit"> Upload </button>
            </form>
          </div>
          <div className="profile-body-text">
            <span
            onClick={this.editProfileHandle}
            className="profile-edit"
            > Edit...
            </span>
            <p className="profile-name">{name}</p>
            <p className="profile-email">{email}</p>
            <p className="profile-projects"> Projects: {projnames}</p>
            <p className="profile-guestprojects"> Contributing to: {guestnames} </p>
            <p className="profile-about-me"> About: {aboutMe} </p>
            <div className="profile-aboutme-editor" style={abtMeStyle}>
              <form>
                <ReactQuill

                  value={this.state.quillText}
                  onChange={this.quillHandleChange}
                />
                <button onClick={this.handleSubmitEdition}>Save</button>
                <button onClick={this.cancelAboutEdit}> Cancel </button>
              </form>
            </div>
          </div>
          <div className="clearer"></div>
        </div>
        <div className="profile-events">
          <div className="events-header"> ACTIVITY FEED </div>
          <ul className="profile-event-pings">
            {render_pings_short}
          </ul>
          <span onClick={this.showAllPings}
          className="seeall-projpings no-select"
          style={{marginLeft: '12px', marginBottom: '4px'}}> See all...</span>

          <div
          style={fullPingBackdrop}
          className="projping-full-backdrop"
          onClick={this.showAllPings}
          >
          </div>

          <div style={fullPingModal} className="projping-full-modal">
            <ol style={fullPing} className="projping-list-full">
              {render_pings}
            </ol>
          </div>
        </div>
      </div>
    )
  }
}

ProfilePage.contextTypes = {
  router: PropTypes.object.isRequired
};


export default ProfilePage;
