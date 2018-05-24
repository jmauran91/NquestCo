import Auth from './Auth';
import fetch from "isomorphic-fetch";


class Fetch {

  ///////////////////////////////////////////////////////////////
  ////////////////// PINGS  ///////////////////////////////////
  ///////////////////////////////////////////////////////////////



  static GetPings(){
    var u_id = this.context.router.history.location.pathname.split('/')[2]
    var url = "/api/users/" + u_id + "/pings"
    return fetch(url, {
      method: 'GET',
      headers: {
        Authorization: "bearer " + Auth.getToken()
      }
    })
    .then(response => response.json())
    .then((response) => {
      console.log(response.msg)
      return response.pings
    })
    .catch((err) => {
      console.log(err)
    })
  }

  static getProjectPings(_id){
    var url = "/api/project/" + _id + "/pings"
    return fetch(url, {
      method: 'GET',
      headers: {
        Authorization: "bearer " + Auth.getToken()
      }
    })
    .then(response => response.json())
    .then((response) => {
      return response
    })
    .catch((err) => {
      return err
    })
  }

  ///////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////
  ////////////////// CONVOS  ///////////////////////////////////
  ///////////////////////////////////////////////////////////////


  static deleteConvosForUser(_id){
    var url = "/admin/users/" + _id + "/conversations"
    fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: "bearer " + Auth.getToken()
      }
    })
    .then((response) => {
      console.log(response)
    })
    .catch((err) => {
      console.log(response)

    })
  }

  static GetConvos(){
    var _id = this.props.current_user._id
    var url = "/chat/users/" + _id + "/conversations"
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: "bearer " + Auth.getToken()
      },
    })
    .then(response => response.json())
    .then((response) => {
      if(response.message == "no conversations for this user yet"){
        console.log(response)
        this.setState({ conversations: null })
      }
      else {
        console.log(response)
        this.setState({ conversations: response.conversations_array })
      }
    })
    .catch((err) => {
      console.log(err)
    })
  }


  static PostToConvos(user_id, obj){
    var data = JSON.stringify(obj)
    var url = "/chat/users/" + user_id + "/conversations"
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': "application/json",
        Authorization: "bearer " + Auth.getToken()
      },
      body: data
    })
    .then(response => response.json())
    .then((response) => {
      console.log(response)
      return response

    })
    .catch((err) => {
      console.log('error in PostToConvos')
      console.log(err)
    })
  }


  static PatchConvo(obj, convo_id = this.props.current_convo){
    var user_id = this.props.current_user._id
    var data = JSON.stringify(obj)
    var url = "/chat/users/" + user_id + "/conversations/" + convo_id
    return fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': "application/json",
        Authorization: "bearer " + Auth.getToken()
      },
      body: data
    })
    .then(response => response.json())
    .then((res) => {
      console.log(res.message)
      return res
    })
    .catch((err) => {
      console.log(err)
      return err
    })
  }

  ///////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////
  ////////////////// USERS  ///////////////////////////////////
  ///////////////////////////////////////////////////////////////


  static GetUsers(){
    let users_url = "/api/users"
    fetch(users_url, {
      method: 'GET',
      headers: {
        Authorization: "bearer " + Auth.getToken()
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

  static GetUser(_id){
    let url = "/api/users/" + _id
    return fetch(url, {
      method: 'GET',
      headers: {
        Authorization: "bearer " + Auth.getToken()
      }
    })
    .then(response => response.json())
    .then((response) => {
      console.log(response)
      return response
    })
    .catch((err) => {
      console.log(err)
    })
  }

  static GetCurrentUser(){
    if(localStorage.getItem('token') != null && localStorage.getItem('token') != 'undefined'){
      var token = localStorage.getItem('token');
      var base64url = token.split('.')[1];
      var base64 = base64url.replace('-', '+').replace('_', '/');
      var token_props = JSON.parse(window.atob(base64));
      var user_finder_id = token_props['sub'].toString();
      //
      const url = "/api/users/" + user_finder_id
      return fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization' : ['bearer', token].join(' ')
        },
      })
      .then((response) => {
        setTimeout(() => null, 0);
        return response.json();
      })
      .then((response) => {
        return(response.user)
      })
      .catch((error) => {
        console.log(error)
        return( error )
      })
    }
    else {
      return false
    }
  }

  static GetUsersByProject(_id){
    var url = "/api/project/" + _id + "/userpool"
    return fetch(url, {
      method: 'GET',
      headers: {
        'Authorization' : "bearer " + Auth.getToken()
      }
    })
    .then((response) => {
      setTimeout(() => null, 0);
      return response.json();
    })
    .then((response) => {
      console.log(response.msg)
      return(response.users)
    })
    .catch((err) => {
      console.log(err)
      return(err)
    })
  }

  static uploadAvatar(u_id, file){
    var url = "/api/users/" + u_id;
    const data = new FormData();
    data.append('file', file)
    data.append('filename', file.name)
    data.append('u_id', u_id)
    fetch(url, {
      method: 'PATCH',
      headers: {
        'Authorization' : "bearer " + Auth.getToken()
      },
      body: data
    })
    .then(response => response.json())
    .then((response) => {
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

  static editUser(u_id, new_about){
    var url = "/api/users/" + u_id;
    const data = new FormData();
    data.append('about', new_about)
    fetch(url, {
      method: 'PATCH',
      headers: {
        Authorization: "bearer " + Auth.getToken()
      },
      body: data
    })
    .then(response => response.json())
    .then((response) => {
      console.log(response)
      this.setState({ new_about: new_about })
    })
    .catch((err) => {
      console.log(err)
    })
  }

  ///////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////
  ////////////////// PROJECTS  ///////////////////////////////////
  ///////////////////////////////////////////////////////////////

  static removeUserFromProject(_id, username){
    console.log('revoke user to project fetch called')
    var url = "/api/project/" + _id + "/revoke"
    var data = new FormData()
    data.append('username', username)
    fetch(url, {
      method: 'PATCH',
      headers: {
        Authorization: "bearer " + Auth.getToken()
      },
      body: data
    })
    .then((response) => {
      setTimeout(() => { null, 0})
      return response.json()
    })
    .then((response) => {
      console.log(response)
      console.log('revoke user to project fetch THEN')
      this.setState({
        project: response.project,
        guest_usernames: response.project.usernames,
        user_message: response.msg,
        form_stat: response.form_stat,
        field: response.field
      }, () => {
        setTimeout(() => {
          this.setState({
            user_message: '',
            form_stat: null,
            field: ''
          }, () => {
            var autosugg_input = document.getElementsByClassName('react-autosuggest__input')[0]
            autosugg_input.value = ""
          })
        }, 2000)
        var autosugg_input = document.getElementsByClassName('react-autosuggest__input')[0]
        autosugg_input.value = ""
      })
    })
    .catch((err) => {
      console.log(err)
    })
  }

  static AddUserToProject(proj_id, new_user){
    console.log('add user to project fetch called')
    var url = "/api/project/" + proj_id
    var formData = new FormData();
    formData.append('_id', proj_id)
    formData.append('new_user', new_user)
    fetch(url, {
      method: 'PATCH',
      headers: {
        'Authorization' : "bearer " + Auth.getToken()
      },
      body: formData
    })
    .then((response) => {
      setTimeout(() => { null, 0})
      return response.json()
    })
    .then((response) => {
      console.log(response)
      console.log('add user to project fetch THEN')
      this.setState({
        project: response.project,
        guest_usernames: response.project.usernames,
        user_message: response.user_message,
        form_stat: response.form_stat,
        field: response.field,
        user_autosugg: ''
      }, () => {
        setTimeout(() => {
          this.setState({
            user_message: '',
            form_stat: null,
            field: ''
          }, () => {
            var autosugg_input = document.getElementsByClassName('react-autosuggest__input')[0]
            autosugg_input.value = ""
          })
        }, 2000)
        var autosugg_input = document.getElementsByClassName('react-autosuggest__input')[0]
        autosugg_input.value = ""
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }


  static addFileToProject(_id, new_file){
    var url = "/api/project/" + _id
    var data = new FormData();
    try{
      data.append('file', new_file)
      data.append('filename', new_file.name)
      data.append('_id', _id)
      fetch(url, {
        method: 'PATCH',
        headers: {
          'Authorization' : "bearer " + Auth.getToken()
        },
        body: data
      })
      .then(response => response.json())
      .then((response) => {
        console.log(response)
        this.clearFileForm();
        this.setState({
          file_message: response.doc_message,
          project: response.project,
          form_stat: response.form_stat,
          field: response.field,
        })
      })
      .catch((error) => {
        console.log(error)
      })
    }
    catch(error){
      console.log(error)
    }

  }

  static getProjects(_id){
    var url = "/api/" + _id + "/projects"
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': "bearer " + Auth.getToken()
      }
    })
    .then( response => response.json())
    .then((response) => {
      if (response.projects){
        var projects = response.projects
        console.log(projects)
        this.setState({ projects: projects })
      }
      else {
        console.log(response)
        this.setState({ no_project: response.msg})
      }
    })
    .catch((err) => {
      console.log(err)
      this.setState({ no_project: err.msg })
    })
  }


  static loadProject(_id){
    var url = '/api/project/' + _id
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization' : "bearer " + Auth.getToken()
      }
    })
    .then((response) => {
      setTimeout(() => null, 0);
      return response.json();
    })
    .then((response) => {
      console.log(response)
      return response;
    })
    .catch((error) => {
      console.log(error)
      this.setState({ msg: error.msg })
    })
  }

  static searchUsers(searchquery){
    var searchParams = ""
    searchquery.split(' ').map((term, i) => {
      if (i != 0){
        searchParams += ("+" + term)
      }
      else {
        searchParams += term
      }
    })
    var url = "/api/search/users/" + searchParams
    fetch(url, {
      method: 'GET',
      headers: {
        Authorization: "bearer " + Auth.getToken()
      }
    })
    .then(response => response.json())
    .then((response) => {
      console.log(response)
      if(response.users){
        this.setState({ searchUsrReturns: response.users })
      }
      else {
        this.setState({ searchUsrReturns: response.msg })
      }
    })
    .catch((err) => {
      console.log(err)

    })
  }


  static searchProjects(searchquery){
    var searchParams = ""
    searchquery.split(' ').map((term, i) => {
      if( i != 0 ){
        searchParams += ("+" + term)
      }
      else {
        searchParams += term
      }
    })
    var url = "/api/search/projects/" + searchParams
    fetch(url, {
      method: 'GET',
      headers: {
        Authorization: "bearer " + Auth.getToken()
      }
    })
    .then(response => response.json())
    .then((response) => {
      console.log(response)
      if(response.projects){
        this.setState({
          searchProReturns: response.projects
        })
      }
      else if (response.msg) {
        this.setState({
          searchProReturns: response.msg
        })
      }
    })
    .catch((err) => {
      console.log(err)
    })
  }

  ///////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////
  ///////////////////////// FILES ///////////////////////////////
  ///////////////////////////////////////////////////////////////


  static deleteFile(proj_id, name){
    var url = '/api/project/' + proj_id + '/files/' + encodeURIComponent(name);
    return fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: "bearer " + Auth.getToken()
      }
    })
    .then(response => response.json())
    .then((response) => {
      console.log(response)
      return(response)

    })
    .catch((err) => {
      return(err)
    })
  }

  static loadFiles(_id){

    var url = '/api/project/' + _id + '/files';
    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': "bearer " + Auth.getToken()
      }
    })
    .then(response => response.json())
    .then((response) => {
      this.setState({
         files: response.files,
         msg: response.msg
      })
      console.log( response )
    })
    .catch((error) => {
      console.log(error)
    })
  }

  ///////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////
  ///////////////////////// NOTES ///////////////////////////////
  ///////////////////////////////////////////////////////////////


  static deleteNote(proj_id, _id){
    var url = "/api/project/" + proj_id + "/notes/" + _id
    fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: "bearer " + Auth.getToken()
      }
    })
    .then(response => response.json())
    .then((response) => {
      console.log(response)
    })
    .catch((err) => {
      console.log(err)
    })

  }

  static submitNote(proj_id, note_text, note_title){
    var url = "/api/project/" + proj_id + "/note"
    var formData = new FormData();
    formData.append('note', note_text)
    formData.append('title', note_title)
    fetch(url, {
      method: 'PATCH',
      headers: {
        'Authorization' : "bearer " + Auth.getToken()
      },
      body: formData
    })
    .then(response => response.json())
    .then((response) => {
      console.log(response)
      this.setState({project: response.project }, () => {
        this.forceUpdate()
      })
    })
    .catch((err) => {
      console.log(err)
    })

  }

  static editNote(_id, note_id, text){
    var url = "/api/project/" + _id + "/notes/" + note_id
    var formData = new FormData();
    formData.append('newtext', text)
    fetch(url, {
      method: 'PATCH',
      headers: {
        'Authorization': "bearer " + Auth.getToken()
      },
      body: formData
    })
    .then(response => response.json())
    .then((response) => {
      console.log(response)
      this.setState({
        isShowingAddEditor: !this.state.isShowingAddEditor,
        arrowHide_note: !this.state.arrowHide_note,
        showEditor: !this.state.showEditor
      },
      () => {
        this.fetchNotes(_id);
      })
    })
    .catch((err) => {
      console.log(err)
    })

  }

  static getNotes(_id){
    var url = '/api/project/' + _id + '/notes'
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': "bearer " + Auth.getToken()
      }
    })
    .then(response => response.json())
    .then((response) => {
      console.log(response)
      if (response.notes instanceof Array){
        this.setState({ notes: response.notes, msg: response.msg, success: true })
      }
      else {
        this.setState({ success: false, msg: response.msg })
      }
    })
    .catch((err) => {
      console.log(err)
      this.setState({ fetch_err: err})
    })

  }

  ///////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////
  ////////////////////      ADMIN      /////////////////////////
  ///////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////


  static deleteNotes(){
    var url = "/admin/notes"
    fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: "bearer " + Auth.getAdmin()
      }
    })
    .then(response => response.json())
    .then((response) => {
      console.log(response)
      this.setState({ message: response.msg })
    })
    .catch((err) => {
      console.log(response)

    })
  }

  static deleteFiles(){
    var url = "/admin/files"
    fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: "bearer " + Auth.getAdmin()
      }
    })
    .then(response => response.json())
    .then((response) => {
      console.log(response)
      this.setState({ message: response.msg })
    })
    .catch((err) => {
      console.log(response)

    })
  }

  static deleteProjects(){
    var url = "/admin/projects"
    fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: "bearer " + Auth.getAdmin()
      }
    })
    .then(response => response.json())
    .then((response) => {
      console.log(response)
      this.setState({ message: response.msg } ,() => {
      })
    })
    .catch((err) => {
      console.log(response)

    })
  }

  static deleteUsers(){
    let users_url = "/admin/users"
    fetch(users_url, {
      method: 'DELETE',
      headers: {
        Authorization: "bearer " + Auth.getAdmin()
      }
    })
    .then(response => response.json())
    .then((response) => {
      console.log(response)
      this.setState({ message: response.msg })
    })
    .catch((response) => {
      console.log(response)
    })
  }

  static deleteConvos(){
    var url = "/admin/convos"
    fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: "bearer " + Auth.getAdmin()
      }
    })
    .then(response => response.json())
    .then((response) => {
      console.log(response)
      this.setState({ message: response.msg })
    })
    .catch((err) => {
      console.log(response)

    })
  }

  static deletePings(){
    var url = "/admin/pings"
    fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: "bearer " + Auth.getAdmin()
      }
    })
    .then(response => response.json())
    .then((response) => {
      console.log(response)
      this.setState({ message: response.msg })
    })
    .catch((err) => {
      console.log(response)

    })
  }

  static deleteMessages(){
    var url = "/admin/messages"
    fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: "bearer " + Auth.getAdmin()
      }
    })
    .then(response => response.json())
    .then((response) => {
      console.log(response)
      this.setState({ message: response.msg })
    })
    .catch((err) => {
      console.log(response)

    })
  }

  ///////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////


  ///////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////
  ////////////////////      CHATBOX      ////////////////////////
  ///////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////

  static getChatbox(_id){
    var url = "/api/project/" + _id + "/chatbox"
    return fetch(url, {
      method: 'GET',
      headers: {
        Authorization: "bearer " + Auth.getToken()
      }
    })
    .then(response => response.json())
    .then((response) => {
      return response
    })
    .catch((err) => {
      return err
    })
  }

  static updateChatbox(_id, messages){

    var data = JSON.stringify(messages)
    var url = "/api/project/" + _id + "/chatbox"
    return fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': "application/json",
        Authorization: "bearer " + Auth.getToken()
      },
      body: data
    })
    .then(response => response.json())
    .then((response) => {
      return response
    })
    .catch((err) => {
      return err
    })
  }


}

export default Fetch;
