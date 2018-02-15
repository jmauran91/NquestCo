import React from 'react';
import Auth from '../modules/Auth';
import {Button, ControlLabel, FormGroup, FormControl } from 'react-bootstrap';


class ProjectPage extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      project: {},
      message: '',
      form_stat: null,
      field: '',
      add_user: '',
      add_doc: '',
      user_message: '',
      doc_message: ''
    }

    this.addUserHandler = this.addUserHandler.bind(this);
    this.addDocumentHandler = this.addDocumentHandler.bind(this);
    this.changeUserHandler = this.changeUserHandler.bind(this);
    this.changeDocumentHandler = this.changeDocumentHandler.bind(this);
    this.clearUserForm = this.clearUserForm.bind(this);
    this.clearDocumentForm = this.clearDocumentForm.bind(this);
    this.changeUserClassName = this.changeUserClassName.bind(this);
    this.changeDocClassName = this.changeDocClassName.bind(this);

  }

  componentDidMount(){
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
    this.setState({ add_doc: event.target.value })
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

  addDocumentHandler(event){
    event.preventDefault();
    var url = `http://localhost:3000/api/project/${this.props.match.params.id}`;
    var _id = this.state.project._id;
    var new_doc = this.state.add_doc;
    var formData = `_id=${_id}&new_doc=${new_doc}`;
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
      this.clearDocumentForm();
      this.setState({
        doc_message: response.doc_message,
        form_stat: response.form_stat,
        field: response.field
      })

    })
    .catch((error) => {
      console.log(error)
    })

  }

  clearUserForm(){
    this.setState({ add_user: '' });
  }

  clearDocumentForm(){
    this.setState({ add_doc: '' });
  }

  changeUserClassName(form_type){
    if (this.state.field == 'user') {
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

  changeDocClassName(form_type){
    if (this.state.field == 'doc'){
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


  render(){
    return(
      <div className="project-show">
        hello there
        <div>
        {this.state.project.title}
        </div>
        <div className="project-add-user-form">
          <div className={this.changeUserClassName('user')}>
            <div> {this.state.user_message}</div>
          </div>
          <form onSubmit={this.addUserHandler}>
            <FormGroup>
              <ControlLabel> New User </ControlLabel>
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
        <br />
        <div className="project-add-document-form">
          <div className={this.changeDocClassName('doc')}>
            <div>{this.state.doc_message}</div>
          </div>
          <form onSubmit={this.addDocumentHandler}>
          <FormGroup>
            <ControlLabel> New Document (remember to provide full filename and file extension exactly as it appears)
            </ControlLabel>
            <FormControl
              type="text"
              name="document"
              value={this.state.add_doc}
              placeholder=""
              onChange={this.changeDocumentHandler}
            />
          </FormGroup>
          <button type="submit"> Add document </button>
          </form>
        </div>

        <div><a href={"/project/" + this.props.match.params.id +"/files"}> Project Files </a></div>
      </div>
    )
  }
}

export default ProjectPage;
