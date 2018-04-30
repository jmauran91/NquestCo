import Auth from './Auth';

class Fetch {

  static GetConvos(){
    var _id = this.props.current_user._id
    var url = "http://localhost:3000/chat/users/" + _id + "/conversations"
    fetch(url, {
      method: 'GET',
      headers: {
        ContentType: 'application/json',
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

  static GetPings(){
    var u_id = this.context.router.history.location.pathname.split('/')[2]
    var url = "http://localhost:3000/api/users/" + u_id + "/pings"
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

  static PostToConvos(user_id, obj){
    var data = JSON.stringify(obj)
    var url = "http://localhost:3000/chat/users/" + user_id + "/conversations"
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
      console.log('ping 2')
      console.log(response)
    })
  }


  static PatchConvo(obj, convo_id = this.props.current_convo){
    var user_id = this.props.current_user._id
    var data = JSON.stringify(obj)
    var url = "http://localhost:3000/chat/users/" + user_id + "/conversations/" + convo_id
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

  static GetUsers(){
    let users_url = "http://localhost:3000/api/users"
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
    let url = "http://localhost:3000/api/users/"+_id
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
      const url = "http://localhost:3000/api/users/" + user_finder_id
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
      return({msg: "You're not logged in"})
    }
  }

}

export default Fetch;
