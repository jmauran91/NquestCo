import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Link, IndexLink } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import Auth from '../../modules/Auth';
import ScrollEvent from 'react-onscroll';


class Base extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      current_user: {}
    }

    this.handleScrollCallback = this.handleScrollCallback.bind(this);
    this.getCurrentUser = this.getCurrentUser.bind(this);
  }

  getCurrentUser(){
    if(localStorage.getItem('token') != null){      
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
  }


  handleScrollCallback(){
    var navbar = document.getElementById('navbar');
    var sticky = navbar.offsetTop;
    if(window.pageYOffset >= sticky){
      navbar.classList.add("sticky");
    } else {
      navbar.classList.remove("sticky");
    }

  }

  componentDidMount(){
    this.getCurrentUser()
  }



  render(){
    if(this.state.current_user){
      var user_url = `/profile/${this.state.current_user._id}`
    }

    return(
      <div>
      <nav id="navbar" className="navbar">
        <div className="container-fluid">
          <ScrollEvent handleScrollCallback={this.handleScrollCallback} />
            <Navbar.Header>
              <Navbar.Brand className="NavbarBrand">
                <a href="/">
                <img src="http://localhost:3000/assets/images/eA9ILzv.png"
                    height="60" width="60" />
                </a>
              </Navbar.Brand>
            </Navbar.Header>
            {Auth.isUserAuthenticated()? (
              <Nav pullRight className="nav-right">
                  <NavItem href={user_url}>
                    My Profile
                  </NavItem>
                  <NavItem href="/logout">
                    Log out
                  </NavItem>
              </Nav>
            ) : (
              <Nav pullRight className="nav-right">
                  <NavItem href="/login">
                    Log in
                  </NavItem>
                  <NavItem href="/signup" id="signupnav">
                    Sign up
                  </NavItem>
              </Nav>
          )}
        </div>
      </nav>
      {this.props.children}
      </div>
    )
  }
};

export default Base;
