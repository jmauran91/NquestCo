import React from 'react';

class ProfilePage extends React.Component{
  constructor(props){
    super(props);
    this.state = {

      current_user: {}
    }

    this.getCurrentUser = this.getCurrentUser.bind(this);

  }

  getCurrentUser(){
    var token = localStorage.getItem('token');
    var base64url = token.split('.')[1];
    var base64 = base64url.replace('-', '+').replace('_', '/');
    var token_props = JSON.parse(window.atob(base64));
    var user_finder_id = token_props['sub'].toString();
    //
    const url = `http://localhost:3000/api/users/${user_finder_id}`;
    fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization' : ['bearer', token].join(' ')
      },
    })
    .then(response => response.json())
    .then((response) => {
      var user = response['user']
      this.setState({ current_user: user })
    })
    .catch((error) => {
      console.log(error)
      return( error )
    })
  }


  componentDidMount(){
    this.getCurrentUser()

  }


  render(){

    if (this.state.current_user._id){
      var _id = this.state.current_user._id;
      var name = this.state.current_user.name;
      var email = this.state.current_user.email;
    }
    else {
      var _id, name, email = "";
    }
    return(
      <div className= "profile-container">
      <h1>
        Profile Page
      </h1>
      <div>
        <p>{_id}</p>
        <p>{name}</p>
        <p>{email}</p>
       </div>
      </div>
    )
  }
}

export default ProfilePage;
