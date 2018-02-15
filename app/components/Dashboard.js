import React from 'react';
import Auth from '../modules/Auth';
import NewProjectPage from '../containers/NewProjectPage';
import ProjectListPage from '../containers/ProjectListPage';

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
    const url = "http://localhost:3000/api/users";
    fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization' : ['bearer', token].join(' ')
      },
      body: JSON.stringify({ _id: user_finder_id })
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
    this.setState({ component: event.target.name})
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
            {this.state.component == 'my_projects' && <ProjectListPage />}
          </div>
          <div className="right-side-dash">
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard;
