import React from 'react';
import Fetch from '../modules/Fetch';
import Auth from '../modules/Auth';
import Convert from '../modules/Convert';
import ProjectPage from './ProjectPage';
import ProjectFiles from '../components/ProjectFiles';
import ProjectNotes from '../components/ProjectNotes';


class ProjectGuestPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      project: {},
      fileExpand: false,
      noteExpand: false,
      XOut: false,
      isShowingModal: false,
    }

    this.toggleModal = this.toggleModal.bind(this);
    this.handleFileExpand = this.handleFileExpand.bind(this);
    this.handleNoteExpand = this.handleNoteExpand.bind(this);

    this.getProject = Fetch.loadProject.bind(this);
  }

  componentDidMount(){
    var _id = this.props.match.params.id
    this.getProject(_id).then((result) => { this.setState({ project: result.project }) })
  }

  handleFileExpand(){
    this.setState({ fileExpand: !this.state.fileExpand })
  }

  handleNoteExpand(){
    this.setState({ noteExpand: !this.state.noteExpand })
  }


  toggleModal(){
    this.setState({
      isShowingModal: !this.state.isShowingModal
    })
  }

  render(){

    if(!Convert.isArrEmpty(this.state.project.usernames)){
      var print_users = this.state.project.usernames.map((user, i) => {
        return(
          <li key={i}>
          {user}
          </li>
        )
      })
    }
    else {
      var print_users = (<p> none </p>)
    }

    return(
      <div className="project-show" onClick={() => {  } }>
        <div className="project-header-container">
          <h1 className="project-header">
            {this.state.project.title}
          </h1>
          <div className="project-title">
            {this.state.project.description}
          </div>
        </div>



        <div className="project-user-area">
          <div className="project-user-area-owner">
            Owner: {this.state.project.ownername}
          </div>
          <div className="project-user-area-users">
            Guest Contributers:
            <ul>
              {print_users}
            </ul>
          </div>
        </div>



        <div className="project-main-area">
          <div className="page-bisector"> </div>
          <div className="projectfiles-big-container-guest">
              <ProjectFiles
              project={this.state.project}
              isShowingModal={this.state.isShowingModal}/>
          </div>
          <div className="projectnotes-big-container-guest">
              <ProjectNotes
                project={this.state.project}
                isShowingModal={this.state.isShowingModal}
              />
          </div>
        </div>

      </div>

    )
  }
}

export default ProjectGuestPage;
