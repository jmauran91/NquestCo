import React from 'react';
import Fetch from '../modules/Fetch';
import Auth from '../modules/Auth';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';

class ProfilePage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      _user: {},
      current_user: {},
      pings: [],
      add_file: ''
    }

    this.getUser = Fetch.GetUser.bind(this);
    this.getCurrentUser = Fetch.GetCurrentUser.bind(this);
    this.getPings = Fetch.GetPings.bind(this);
    this.picSubmit = this.picSubmit.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  componentDidMount(){
    try{
      this.getCurrentUser()
      .then((response) => {
        this.setState({ current_user: response})
      })
      var u_id = this.context.router.history.location.pathname.split('/')[2]
      this.getUser(u_id)
      .then((response) => {
        this.setState({ _user: response.user }, () => {
          this.getPings().then((pings) => {
             this.setState({ pings: pings })
          })
        })
      })
    }
    catch(error){
      console.log(error)
      console.log("You shouldn't be here")
      this.context.router.history.push("/")
    }
  }

  onDrop(files){
    var file = files[0]
    this.setState({ add_file: file })
  }

  picSubmit(event){
    event.preventDefault();
    var url = `http://localhost:3000/api/users/${this.state._user._id}`;
    var new_file = this.state.add_file
    var payload = `file=${new_file}`
    const data = new FormData();
    data.append('file', this.state.add_file)
    data.append('filename', this.state.add_file.name)
    data.append('u_id', this.state._user._id)
    fetch(url, {
      method: 'PATCH',
      headers: {
        'Authorization' : `bearer ${Auth.getToken()}`
      },
      body: data
    })
    .then(response => response.json())
    .then((response) => {
      debugger
      console.log(response)
      this.setState({
        add_file: null,
        msg: response.msg,
        _user: response.user
      })
      this.forceUpdate();
    })
    .catch((error) => {
      console.log(error)
    })
  }


  render(){
    if( this.state.current_user._id == this.state._user._id ){
      var avStyle = {
        display: 'block'
      }
      var abtMeStyle = {
        display: 'block'
      }
    }
    else {
      var avStyle = {
        display: 'none'
      }
      var abtMeStyle = {
        display: 'none'
      }
    }
    if (this.state._user._id){
      var _id = this.state._user._id;
      var name = this.state._user.name;
      var email = this.state._user.email;
      var projnames = ""
      this.state._user.projects.map((proj) => {
         projnames += (proj.title + ", ")
      })
      if(projnames.length==0){
        projnames = name + " currently has no projects"
      }
    }
    else {
      var _id, name, email = "";
    }
    if(this.state.pings.length > 0){
      var pings = this.state.pings.sort((a, b) => {
        return a.createdAt - b.createdAt
      }).reverse()
      pings = this.state.pings.map((ping, i) => {
        return(
          <li
            key={i}
            className="ping-cell"
          >
            <span>{ping.text}</span>
            <div>{ping.createdAt}</div>
          </li>
        )
      })
    }
    else {
      var date = new Date().toString().split(' ')
      date = date[1] + '/' + date[2] + '/' + date[3]
      var pings = (<li className="ping-cell-empty"> <span>{this.state._user.name} hasn't done anything yet </span><span className="empty-ping-date">{date}</span></li>)
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
            <p className="profile-name">{name}</p>
            <p className="profile-email">{email}</p>
            <p className="profile-projects"> Projects: {projnames}</p>
            <p className="profile-about-me"> </p>
            <div className="edit-profile-about" style={abtMeStyle}> </div>
          </div>
          <div className="clearer"></div>
        </div>
        <div className="profile-events">
          <div className="events-header"> ACTIVITY FEED </div>
          <ul className="profile-event-pings">
            {pings}
          </ul>
        </div>
      </div>
    )
  }
}

ProfilePage.contextTypes = {
  router: PropTypes.object.isRequired
};


export default ProfilePage;
