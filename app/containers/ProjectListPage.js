import React from 'react';
import Auth from '../modules/Auth';
import Fetch from '../modules/Fetch';
import Convert from '../modules/Convert';

class ProjectListPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      projects: [],
      no_project: '...you currently have no projects...'
    }

      this.getProjects = Fetch.getProjects.bind(this);
  }


  componentDidMount(){
    this.getProjects(this.props.url)
  }

  render(){
    let projectList;
    if(!Convert.isArrEmpty(this.state.projects)) {
      projectList = this.state.projects.map((project, index) => {
        var url =`/project/${project._id}`
        var docPrint = project.documents.length.toString();
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
    else {
      setTimeout(() => {
        projectList = (
          <div className="no-projects-text">
            {this.state.no_project}
          </div>
        )
      }, 500)
    }
    return(
      <div className="project-matrix">
        {projectList}
      </div>
    )
  }
}

export default ProjectListPage;
