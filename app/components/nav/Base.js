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

    this.handleScrollCallback = this.handleScrollCallback.bind(this);
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
  render(){
    return(
      <div>
      <Navbar id="navbar">
      <ScrollEvent handleScrollCallback={this.handleScrollCallback} />
        <Navbar.Header>
          <Navbar.Brand className="NavbarBrand">
            <a href="/">
            <img src="../assets/images/eA9ILzv.png"
                height="60" width="60" />
            </a>
          </Navbar.Brand>
        </Navbar.Header>
        {Auth.isUserAuthenticated()? (
          <Nav pullRight className="nav-right">
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
              <NavItem href="/profile">
                My Profile
              </NavItem>
          </Nav>
        )}
      </Navbar>
      {this.props.children}
      </div>
    )
  }
};

export default Base;
