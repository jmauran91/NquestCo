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
      isCategories: false,
      quillText: '',
      new_about: null,
      isShowingAllPings: false,
      categories: ''
    }

    this.picSubmit = this.picSubmit.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.editProfileHandle = this.editProfileHandle.bind(this);
    this.handleSubmitEdition = this.handleSubmitEdition.bind(this);
    this.quillHandleChange = this.quillHandleChange.bind(this);
    this.cancelAboutEdit = this.cancelAboutEdit.bind(this);
    this.dateSort = Convert.dateSort.bind(this);
    this.showAllPings = this.showAllPings.bind(this);
    this.editCategories = this.editCategories.bind(this);
    this.cancelCtgEdit = this.cancelCtgEdit.bind(this);
    this.handleSubmitCategories = this.handleSubmitCategories.bind(this);


    this.getUser = Fetch.GetUser.bind(this);
    this.getCurrentUser = Fetch.GetCurrentUser.bind(this);
    this.getPings = Fetch.GetPings.bind(this);
    this.uploadAvatarFetch = Fetch.uploadAvatar.bind(this);
    this.editUser = Fetch.editUser.bind(this);
    this.updateCategories = Fetch.updateCategories.bind(this);
  }

  editProfileHandle(){
    this.setState({ isEditing: !this.state.isEditing })
  }

  editCategories(){
    this.setState({ isCategories: !this.state.isCategories })
  }

  cancelCtgEdit(event){
    event.preventDefault();
    this.setState({ isCategories: false })
  }

  handleSubmitCategories(){
    var categ_arr = this.state.categories.split(', ')
    this.updateCategories(this.state._user._id, categ_arr)
  }


  cancelAboutEdit(event){
    event.preventDefault();
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

    if(this.state.isCategories){
      var ctgStyle = {
        display: 'block'
      }
    }
    else {
      var ctgStyle = {
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
      var guestnames = "not currently contributing to any projects"
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
      var categories = this.state._user.categories.map((category, i) => {
        var catelink = `/categories/${category}`
        if( (this.state._user.categories.length -1) - i == 0){
           return(<a key={i} href={catelink}>{category}</a>)
        }
        else {
           return(<a key={i} href={catelink}>{category}</a> + ", ")
        }
      })
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
        let titletxt = ping.text.split('[').pop().split(']').shift();
        let txtsplit = ping.text.split(" has").pop().split("[")[0]
        let usertxt = ping.text.split(' has')[0]
        let p_id = ping.projectId._id.toString();
        let u_id = ping.userId._id.toString();
        let href_str = `/project/${p_id}`
        let href_str_u = `/profile/${u_id}`
        var date = Convert.prettifyDate(ping.createdAt);
        return(
          <li
            key={i}
            className="ping-cell"
          >
            <span><a href={href_str_u}>{usertxt}</a> has{txtsplit} <a href={href_str}>[{titletxt}]</a></span>
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
    if(this.state._user._id == this.state.current_user._id){
      return(
        <div className= "profile-container">
          <div className="profile-body" >
            <div className="prof-pic-container" >
              <img className="prof-pic" src={this.state._user.profpic} />
              <form className="avatar-upload" onSubmit={this.picSubmit} style={avStyle}>
                <label className="upload-label"> Add / Edit Profile Picture </label>
                <Dropzone className="dropzone" onDrop={this.onDrop}>
                  <span className="no-select"> Drag file or click to upload </span>
                </Dropzone>
                <button className="button" type="submit"> Upload </button>
              </form>
            </div>
            <div className="profile-body-text">
              <div className="profile-name">{name} </div>
              <div className="profile-email">{email} </div>
              <br />
              <div className="profile-body-row">
                <div className="profile-categories profile-body-column profbody-column-left"> {name}'s topics: </div>
                <div className="profile-body-column profbody-column-mid">{categories} </div>
                <div className="profile-body-column profbody-column-right profile-edit" onClick={this.editCategories}> Edit... </div>
                <div className="profile-categories-editor" style={ctgStyle}>
                  <form>
                    <ReactQuill

                      value={this.state.categories}
                      onChange={this.handleCategoriesChange}
                    />
                  <button onClick={this.handleSubmitCategories}>Save</button>
                  <button onClick={this.cancelCtgEdit}>Cancel</button>
                  </form>
                </div>
              </div>
              <div className="profile-body-row">
                <div className="profile-projects profile-body-column profbody-column-left"> Projects: </div>
                <div className="profile-body-column profbody-column-mid">{projnames}</div>
              </div>
              <div className="profile-body-row">
                <div className="profile-guestprojects profile-body-column profbody-column-left"> Contributing to:  </div>
                <div className="profile-body-column profbody-column-mid">{guestnames}</div>
              </div>
              <div className="profile-body-row">
                <div className="profile-about-me profile-body-column profbody-column-left"> About: </div>
                <div className="profile-body-column profbody-column-mid">{aboutMe} </div>
                <div className="profile-body-column profbody-column-right profile-edit" onClick={this.editProfileHandle} > Edit...</div>
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
    else {
      return(
        <div className= "profile-container">
          <div className="profile-body" >
            <div className="prof-pic-container" >
              <img className="prof-pic" src={this.state._user.profpic} />
            </div>
            <div className="profile-body-text">
              <div className="profile-name">{name} </div>
              <div className="profile-email">{email} </div>
              <br />
              <div className="profile-body-row">
                <div className="profile-categories profile-body-column profbody-column-left"> {name}'s topics: </div>
                <div className="profile-body-column profbody-column-mid">{categories} <span onClick={this.editCategories} className="categories-edit"> Edit... </span></div>
              </div>
              <div className="profile-body-row">
                <div className="profile-projects profile-body-column profbody-column-left"> Projects: </div>
                <div className="profile-body-column profbody-column-mid">{projnames}</div>
              </div>
              <div className="profile-body-row">
                <div className="profile-guestprojects profile-body-column profbody-column-left"> Contributing to:  </div>
                <div className="profile-body-column profbody-column-mid">{guestnames}</div>
              </div>
              <div className="profile-body-row">
                <div className="profile-about-me profile-body-column profbody-column-left"> About: </div>
                <div className="profile-body-column profbody-column-mid">{aboutMe} <span onClick={this.editProfileHandle} className="profile-edit"> Edit... </span></div>
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
              style={{marginLeft: '12px', marginBottom: '4px'}}>
                See all...
              </span>

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
}

ProfilePage.contextTypes = {
  router: PropTypes.object.isRequired
};


export default ProfilePage;
