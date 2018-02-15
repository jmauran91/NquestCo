import React from 'react';
import Auth from '../modules/Auth';
import PropTypes from 'prop-types';

class LogoutSwitcher extends React.Component{
  constructor(props, context) {
    super(props);

  }

  componentDidMount(){
    if (Auth.isUserAuthenticated()){
    Auth.deauthenticateUser();
    }
    this.context.router.history.push('/');
  }

  render(){
    return(
      <div className="container">
        <p>...logging out...</p>
      </div>
    )
  }
}

LogoutSwitcher.contextTypes = {
  router: PropTypes.object.isRequired
};


export default LogoutSwitcher;
