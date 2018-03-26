import React from 'react';
import Auth from '../modules/Auth';
import {Button, ControlLabel, FormGroup, FormControl } from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import ProjectFiles from '../components/ProjectFiles';
import ProjectNotes from '../components/ProjectNotes';
import {Editor, EditorState, RichUtils } from 'draft-js';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


class ProjectPage extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      project: {},
      message: '',
      form_stat: null,
      field: '',
      add_user: '',
      add_file: null,
      user_message: '',
      doc_message: '',
      response_file: null,
      showFiles: false,
      showEditor: false,
      showNotes: false,
      quillText: '',
      noteTitle: ''
    }

    this.onDrop = this.onDrop.bind(this);
    this.addUserHandler = this.addUserHandler.bind(this);
    this.addDocumentHandler = this.addDocumentHandler.bind(this);
    this.changeUserHandler = this.changeUserHandler.bind(this);
    this.changeDocumentHandler = this.changeDocumentHandler.bind(this);
    this.clearUserForm = this.clearUserForm.bind(this);
    this.clearDocumentForm = this.clearDocumentForm.bind(this);
    this.changeClassName = this.changeClassName.bind(this);
    this.convertFileToB64 = this.convertFileToB64.bind(this);
    this.switchProjectFiles = this.switchProjectFiles.bind(this);
    this.switchProjectEditor = this.switchProjectEditor.bind(this);
    this.switchProjectNotes = this.switchProjectNotes.bind(this);
    this.quillHandleChange = this.quillHandleChange.bind(this);
    this.quillTitleHandle = this.quillTitleHandle.bind(this);
    this.submitNote = this.submitNote.bind(this);
  }

  quillHandleChange(value){
    this.setState({ quillText: value })
  }

  quillTitleHandle(event){
    this.setState({ noteTitle: event.target.value })
  }

  componentWillMount(){
    const url = `http://localhost:3000/api/project/${this.props.match.params.id}`
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization' : `bearer ${Auth.getToken()}`
      }
    })
    .then(response => response.json())
    .then((response)=> {
      console.log(response)
      this.setState({ project: response['project'] })
    })
    .catch((error) => {
      console.log(error)
    })
  }

  changeUserHandler(event){
    this.setState({ add_user: event.target.value })
  }

  changeDocumentHandler(event){
    this.setState({ add_file: event.target.files[0]})
  }

  addUserHandler(event){
    event.preventDefault();
    var url = `http://localhost:3000/api/project/${this.props.match.params.id}`;
    var _id = this.state.project._id;
    var new_user = this.state.add_user;
    var formData = `_id=${_id}&new_user=${new_user}`;
    fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization' : `bearer ${Auth.getToken()}`
      },
      body: formData
    })
    .then(response => response.json())
    .then((response) => {
      console.log(response)
      this.clearUserForm();
      this.setState({
        user_message: response.user_message,
        form_stat: response.form_stat,
        field: response.field
      })
    })
    .catch((error) => {
      console.log(error)
    })

  }

  convertFileToB64(file){
    var reader = new FileReader();
    return new Promise ((resolve, reject) => {
      reader.readAsDataURL(file);
      reader.onload = () => { resolve(reader.result) }
      reader.onerror = (error) => { reject(error) }
    })
  }

  addDocumentHandler(event){
    event.preventDefault();
    var url = `http://localhost:3000/api/project/${this.props.match.params.id}`;
    var new_file = this.state.add_file
    var payload = `file=${new_file}`
    const data = new FormData();
    data.append('file', this.state.add_file)
    data.append('filename', this.state.add_file.name)
    data.append('_id', this.state.project._id)
    fetch(url, {
      method: 'PATCH',
      headers: {
        'Authorization' : `bearer ${Auth.getToken()}`
      },
      body: data
    })
    .then(response => response.json())
    .then((response) => {
      console.log(response)
      this.clearDocumentForm();
      this.setState({
        doc_message: response.doc_message,
        project: response.project,
        form_stat: response.form_stat,
        field: response.field
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }

  submitNote(){
    var url = `http://localhost:3000/api/project/${this.props.match.params.id}/note`
    var formData = `note=${this.state.quillText}&title=${this.state.noteTitle}`
    fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization' : `bearer ${Auth.getToken()}`
      },
      body: formData
    })
    .then(response => response.json())
    .then((response) => {
      console.log(response)
      this.setState({project: response.project })
    })
    .catch((err) => {
      console.log(err)
    })
  }

  clearUserForm(){
    this.setState({ add_user: '' });
  }

  clearDocumentForm(){
    this.setState({ add_file: '' });
  }

  changeClassName(form_type){
    if (this.state.field == form_type) {
      if (this.state.form_stat == true) {
        return(`new-${form_type}-true`)
      }
      else if (this.state.form_stat == false) {
        return(`new-${form_type}-false`)
      }
      else {
        return(`new-${form_type}-null`)
      }
    }
  }

  onDrop(files){
    console.log(files)
    var file = files[0]
    this.setState({ add_file: file })
  }

  switchProjectFiles(){
    if (this.state.showFiles == false) {
      this.setState({ showFiles: true })
    }
    else {
      this.setState({ showFiles: false })
    }
  }

  switchProjectEditor(){
    if(this.state.showEditor == false) {
      this.setState({ showEditor: true })
    }
    else {
      this.setState({ showEditor: false})
    }
  }

  switchProjectNotes(){
    if(this.state.showNotes == false) {
      this.setState({ showNotes: true })
    }
    else {
      this.setState({ showNotes: false })
    }
  }



  render(){
    if(this.state.showFiles == true){
      var myFileStyle = {
        display: 'block'
      }
    }
    else if (this.state.showFiles == false) {
      var myFileStyle = {
        display: 'none'
      }
    }
    if(this.state.showEditor == true){
      var myEditStyle = {
        display: 'block'
      }
    }
    else if (this.state.showEditor == false) {
      var myEditStyle = {
        display: 'none'
      }
    }
    if(this.state.showNotes == true){
      var myNoteStyle = {
        display: 'block'
      }
    }
    else {
      var myNoteStyle = {
        display: 'none'
      }
    }
    if(this.state.project.usernames){
      var print_users = this.state.project.usernames.map((user, i) => {
        return(
          <li>
          {user}
          </li>
        )
      })
    }


    return(
      <div className="project-show">

        <h1 className="project-header">
          Project Page
        </h1>
        <div className="project-title">
          {this.state.project.title}
        </div>

        <div className="project-user-area">
          <div className="project-user-area-owner">
            {this.state.project.owner}
          </div>
          <div className="project-user-area-users">
            <ul>
              {print_users}
            </ul>
          </div>
          <div className="project-add-user-form">
            <div className={this.changeClassName('user')}>
              <div> {this.state.user_message}</div>
            </div>
            <form onSubmit={this.addUserHandler}>
              <FormGroup>
                <ControlLabel> New User </ControlLabel>
                <ControlLabel> -- Name must be spelled precisely as it exists in database -- </ControlLabel>
                <FormControl
                  type="text"
                  name="user"
                  value={this.state.add_user}
                  placeholder=""
                  onChange={this.changeUserHandler}
                />
              </FormGroup>
              <button type="submit"> Add user </button>
            </form>
          </div>
        </div>

        <br />

        <div className="project-main-area">
          <div className="project-add-file-form">
            <div className={this.changeClassName('doc')}>
              <div>{this.state.doc_message}</div>
            </div>
            <form onSubmit={this.addDocumentHandler}>
              <Dropzone onDrop={this.onDrop}>
                <p> Drag file or click to upload </p>
              </Dropzone>
              <button type="submit">Add File (add error handling)</button>
            </form>
          </div>
          <div className="project-add-note" >
            <div onClick={this.switchProjectEditor}>
              <div className="project-add-note-anchor">
                Add Note
              </div>
              <div className="arrow-right"></div>
            </div>
            <div id="projecteditor-container" style={myEditStyle}>
              <form onSubmit={this.submitNote}>
              <label> Note Title </label>
              <input
                label="Note Title"
                type="text"
                value={this.state.noteTitle}
                onChange={this.quillTitleHandle}
              />
                <ReactQuill
                  value={this.state.quillText}
                  onChange={this.quillHandleChange}
                />

                <button type="submit"> Save Note </button>
              </form>
            </div>
          </div>
          <div className="projectnotes-big-container">
            <div className="anchor" onClick={this.switchProjectNotes}>
              Show Notes
            </div>
            <div id="projectnotes-container" style={myNoteStyle} >
              <ProjectNotes
                url_id={this.props.match.params.id}
              />
            </div>
          </div>
          <div className="projectfiles-big-container">
            <div className="anchor" onClick={this.switchProjectFiles}>
              Show Files
            </div>
            <div id="projectfiles-container" style={myFileStyle} >
              <ProjectFiles
              url_id={this.props.match.params.id}/>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default ProjectPage;
