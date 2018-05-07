import React from 'react';
import Auth from '../modules/Auth';
import Fetch from '../modules/Fetch';

class ProjectListPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      projects: [],
      no_project: ''
    }

      this.getProjects = Fetch.getProjects.bind(this);
  }


  componentDidMount(){
    this.getProjects(this.props.url)
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
        var url =`/project/${project._id}`
        var docPrint = this.state.projects.length.toString();
        return(
          <div className="project-holder" key={index}>
          <div className="project-element"><a href={url}> {project.title} </a></div>
          <div className="project-element"> Owner: {project.ownername} </div>
          <div className="project-element"> Description: {project.description} </div>
          <div className="project-element"> Files: {docPrint} </div>
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
