import React from 'react';
import HomePage from './HomePage';
import Dashboard from './Dashboard';
import Auth from '../modules/Auth';
import PropTypes from 'prop-types';


class IndexSwitcher extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      current_user: {}
    }

    this.getCurrentUser = this.getCurrentUser.bind(this);

  }

  getCurrentUser(){
    return new Promise((resolve, reject) => {
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
        resolve()
      })
      .catch((error) => {
        console.log(error)
        resolve(error)
      })
    })
  }

  componentDidMount(){
    if(localStorage.getItem('token') !== null) {
      this.getCurrentUser()
      .then(() => {
        this.context.router.history.push(`/${this.state.current_user._id}`)
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }

  render(){

    return(
      <div>
        {localStorage.getItem('token') == null && <HomePage />}
      </div>
    )
  }
}


IndexSwitcher.contextTypes = {
  router: PropTypes.object.isRequired
};

export default IndexSwitcher;
