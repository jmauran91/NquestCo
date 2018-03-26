import React from 'react';
import Auth from '../modules/Auth';
import NewProjectPage from '../containers/NewProjectPage';
import ProjectListPage from '../containers/ProjectListPage';
import PropTypes from 'prop-types';

class Dashboard extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      current_user: {},
      component: ''
    };

    this.handleFeatureClick = this.handleFeatureClick.bind(this);
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
    this.getCurrentUser();
  }

  handleFeatureClick(event){
    if(this.state.component != event.target.name){
      this.setState({ component: event.target.name })
    }
    else {
      this.setState({ component: '' })
    }
  }

  render(){

    var featSwitcher = () => {
      if (this.state.component == 'new_project'){
        return(
          <div>
            <NewProjectPage />
          </div>
        )
      }
      if (this.state.component == 'my_projects'){
        return(
          <div>
            <ProjectListPage />
          </div>
        )
      }
    }

    return(
      <div className="dash-container">
        <div className="dash-banner">
          <h1> Welcome to the Home Page </h1>
          <h3>{this.state.secretData}</h3>
        </div>
        <div className="dash-body">
          <div className="left-side-dash">
            <ul className="feature-list">
              <li>
                <button
                  onClick={this.handleFeatureClick}
                  name="new_project"
                > New Project </button>
              </li>
              <li>
                <button
                  onClick={this.handleFeatureClick}
                  name="my_projects"
                > My Projects </button>
              </li>
            </ul>
          </div>
          <div className="center-side-dash">
            {this.state.component == 'new_project' && <NewProjectPage />}

            {this.state.component == 'my_projects'
             && <ProjectListPage
                 url={this.state.current_user._id}/>}

          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard;
