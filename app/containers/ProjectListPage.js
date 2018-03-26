import React from 'react';
import Auth from '../modules/Auth';

class ProjectListPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      projects: [],
      no_project: ''
    }

  }

  componentWillMount(){
    let url = `http://localhost:3000/api/${this.props.url}/projects`
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`
      }
    })
    .then( response => response.json())
    .then((response) => {
      if (response.projects){
        var projects = response.projects
        console.log(projects)
        this.setState({ projects: projects })
      }
      else {
        console.log(response)
        this.setState({ no_project: response.msg})
      }
    })
    .catch((err) => {
      console.log(err)
      this.setState({ no_project: err.msg })
    })
  }

  render(){
    let projectList;
    if (this.state.projects.length == 0 ){
      projectList = (
          <div className="no-projects-text">
            {this.state.no_project}
          </div>
        )
    }
    else {
      projectList = this.state.projects.map((project, index) => {
        let docPrint = project.documents.map((doc, i) => {
          if( i ==  (project.documents.length - 1) ){
            return(
              `${doc}`
            )
          }
          else {
            return(
              `${doc}, `
            )
          }
        })
        return(
          <div className="project-holder" key={index}>
          <div className="project-element"><a href={'/project/' + (project._id)}> {project.title} </a></div>
          <div className="project-element"> Owner: {project.owner_name} </div>
          <div className="project-element"> Description: {project.description} </div>
          <div className="project-element"> Document: {docPrint} </div>
          </div>
        )
      })
    }
    return(
      <div className="project-matrix">
        {projectList}
      </div>
    )
  }
}

export default ProjectListPage;
