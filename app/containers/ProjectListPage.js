import React from 'react';
import Auth from '../modules/Auth';

class ProjectListPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      projects: []
    }

  }

  componentDidMount(){
    let url = 'http://localhost:3000/api/projects'
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`
      }
    })
    .then( response => response.json())
    .then((response) => {
      console.log(response)
      this.setState({ projects: response['projects'] })
    })
    .catch((error) => {
      console.log("Error: " + error)
    })
  }

  render(){
    let projectList = this.state.projects.map((project, index) => {
      return(
        <div className="project-holder" key={index}>
          <div className="project-element"><a href={'/project/' + (index+1)}> Title: {project.title} </a></div>
          <div className="project-element"> Owner: {project.owner} </div>
          <div className="project-element"> Description: {project.description} </div>
          <div className="project-element"> Document: {project.documents} </div>
        </div>
      )
    })
    return(
      <div className="project-matrix">
        {projectList}
      </div>
    )
  }
}

export default ProjectListPage;
