import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Link, IndexLink } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import Auth from '../../modules/Auth';
import Fetch from '../../modules/Fetch';
import ScrollEvent from 'react-onscroll';


class Base extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      current_user: {},
      isMounted: null
    }

    this.handleScrollCallback = this.handleScrollCallback.bind(this);
    this.getCurrentUser = Fetch.GetCurrentUser.bind(this);
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

  componentWillMount = () => {
  this.setState({
      isMounted: true
  })
}

componentWillUnmount = () => {
  this.setState({
      isMounted: false
  })
}


  componentDidMount(){
    try{
      if(this.state.isMounted){
        this.getCurrentUser()
        .then((response) => {
            this.setState({
              current_user: response,
              user_url: `/profile/${response._id}`
            })
        })
        .catch((err) => {
          console.log(err)
        })
      }
    }
    catch(error){
      console.log(error)
    }
  }



  render(){
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
                  <NavItem href={this.state.user_url}>
                    My Profile
                  </NavItem>
                  <NavItem href="/logout">
                    Log Out
                  </NavItem>
              </Nav>
            ) : (
              <Nav pullRight className="nav-right">
                  <NavItem href="/login">
                    Log In
                  </NavItem>
                  <NavItem href="/signup" id="signupnav">
                    Sign Up
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

Base.contextTypes = {
  router: PropTypes.object.isRequired
};

export default Base;
