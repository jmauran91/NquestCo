import React from 'react';
import PropTypes from 'prop-types';
import SignUpForm from '../components/SignUpForm';
import Convert from '../modules/Convert';
import fetch from "isomorphic-fetch";


class SignUpPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    // set the initial component state
    this.state = {
      errors: {},
      user: {
        email: '',
        name: '',
        password: ''
      },
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
    this.emptyForm = this.emptyForm.bind(this);
  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  emptyForm(){
    this.setState({
      user: {
        email: '',
        name: '',
        password: ''
      }
    })
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    const name = encodeURIComponent(this.state.user.name);
    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `name=${name}&email=${email}&password=${password}`;
    const url = "/auth/signup";

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData
    })
    .then(response => response.json())
    .then((response) => {
      console.log(response)
      if(response.success == true){
        localStorage.setItem('successMessage', response.message);
        this.context.router.history.push('/login');
        this.emptyForm();
      }
      else {
        this.setState({ errors: response.errors })
        this.emptyForm();
      }
    })
    .catch(function(error){
      console.log("Error: " + error)
    })

    console.log('name:', this.state.user.name);
    console.log('email:', this.state.user.email);
    console.log('password:', this.state.user.password);
  }

  /**
   * Render the component.
   */
  render() {
    if( !Convert.isObjEmpty(this.state.errors) ){
      var errStyleCont = {
        width: '40%',
        margin: '5px 0px',
        padding: '8px',
        color: '#D8000C',
        backgroundColor: '#FFD2D2'
      }
      var errStyleText = {
        margin: '5px 11px',
        fontSize: '1.2em',
        verticalAlign: 'middle'
      }
    }
    else {
      var errStyleCont = {}
      var errStyleText = {}
    }
    return (
      <div className="signup-container">
        <div className="signup-banner">
          <div className="signup-banner-opener">
            What is this?
          </div>
          <div className="signup-banner-text">
            Nquest is an online collaborative workspace, a place for people to get
            together to work on their projects and contribute to other ones. Using
            the site is simple: create an account, then you can create your own
            projects and work on them, or contribute to other users' project
            (with their permission).
            <br/>
            <br/>
            <span className="signup-banner-text-projects">Projects</span> are
            essentially aggregations of view-only files and
            online-editable notes. Users can add files and notes to their
            own projects and to those for which they've been given permissions.
          </div>
        </div>
        <div className="signup-form-container">
          <SignUpForm
            onSubmit={this.processForm}
            onChange={this.changeUser}
            errors={this.state.errors}
            user={this.state.user}
            errStyleCont={errStyleCont}
            errStyleText={errStyleText}
          />
        </div>
      </div>
    );
  }

}

SignUpPage.contextTypes = {
  router: PropTypes.object.isRequired
}

export default SignUpPage;
