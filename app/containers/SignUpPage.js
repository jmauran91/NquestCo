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
      selectedCategory: '',
      user: {
        email: '',
        name: '',
        password: '',

      },
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
    this.emptyForm = this.emptyForm.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
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
        password: '',

      },
      selectedCategory: '',
    })
  }

  handleSelection = (selectedCategory) => {
    this.setState({ selectedCategory: selectedCategory.value })
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
    const category = encodeURIComponent(this.state.selectedCategory);
    const formData = `name=${name}&email=${email}&password=${password}&category=${category}`;
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
    console.log('category:', this.state.user.selectedCategory)
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
            READ THIS
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

            After you log in, use the hamburger menu (three horizontal bars
            that are stacked on top of each other) on the upper-left side of
            the page in order to access the messenger, your projects, and
            project creation. In order to view others' projects or profiles,
            use the searchbar at the top of the page, and specify either
            "Projects" or "Users" according to your search request. In order
            to view your own profile, click on the "Profile" at the upper-right
            corner of the page. That covers all the functionality of the site!
          </div>
        </div>
        <div className="signup-form-container">
          <SignUpForm
            onSubmit={this.processForm}
            onChange={this.changeUser}
            handleSelection={this.handleSelection}
            errors={this.state.errors}
            user={this.state.user}
            selectedCategory={this.state.selectedCategory}
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
