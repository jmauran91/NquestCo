import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Link, IndexLink } from 'react-router-dom';
import { Navbar, Nav, NavItem, Button, ControlLabel, FormGroup, FormControl } from 'react-bootstrap';
import Auth from '../../modules/Auth';
import ScrollEvent from 'react-onscroll';


class LogBase extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {},
      current_user: {}
    };

    this.handleScrollCallback = this.handleScrollCallback.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleFieldChangeEmail = this.handleFieldChangeEmail.bind(this);
    this.handleFieldChangePword = this.handleFieldChangePword.bind(this);
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


    handleScrollCallback(){
      var navbar = document.getElementById('navbar');
      var sticky = navbar.offsetTop;
      if(window.pageYOffset >= sticky){
        navbar.classList.add("sticky");
      } else {
        navbar.classList.remove("sticky");
      }
    }

    handleFieldChangeEmail(event){
      this.setState({ email: event.target.value })
    }

    handleFieldChangePword(event){
      this.setState({ password: event.target.value })
    }

    handleLogIn(event){
      event.preventDefault();
      const email = encodeURIComponent(this.state.email);
      const password = encodeURIComponent(this.state.password);
      const formData = `email=${email}&password=${password}`;
      const url = "http://localhost:3000/auth/login";

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData
      })
      .then(response => response.json())
      .then((response) => {
        console.log(response);
        Auth.authenticateUser(response.token);
        this.context.router.history.push(`/${this.state.current_user._id}`);
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          error
        })
      })
    }

  render(){
    return(
      <div>
      <Navbar id="navbar">
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
              <NavItem href="/logout">
                Log out
              </NavItem>
          </Nav>
        ) : (
          <Navbar.Form pullRight className="nav-right">
            <form onSubmit={this.handleLogIn}>
              <FormGroup className="form-inline">
                <ControlLabel> Email </ControlLabel>
                <FormControl
                 type="text"
                 name="email"
                 value={this.state.email}
                 placeholder=""
                 onChange={this.handleFieldChangeEmail}
                />
                <ControlLabel> Password </ControlLabel>
                <FormControl
                  type="password"
                  name="password"
                  value={this.state.password}
                  placeholder=""
                  onChange={this.handleFieldChangePword}
                />
                <Button type="submit" >Log In</Button>
              </FormGroup>
            </form>
          </Navbar.Form>
        )}
      </Navbar>
      {this.props.children}
      </div>
    )
  }
};

LogBase.contextTypes = {
  router: PropTypes.object.isRequired
};

export default LogBase;
