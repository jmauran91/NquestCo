import React from 'react';
import update from 'react-addons-update';
import PropTypes from 'prop-types';
import Auth from '../modules/Auth';

class NewProjectPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        title: '',
        owner: '',
        description: '',
        documents: {},
        success: null
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.afterSubmission = this.afterSubmission.bind(this);
    this.fileHandle = this.fileHandle.bind(this);
  }

  handleSubmit(event){
    event.preventDefault();
    const data = new FormData();
    data.append('title', this.state.title)
    data.append('owner', this.props.owner_name)
    data.append('description', this.state.description)
    data.append('file', this.state.documents)
    data.append('filename', this.state.documents.name)
    const url = 'http://localhost:3000/api/projects';
    fetch(url, {
      method: 'POST',
      headers: {
        'Authorization' : `bearer ${Auth.getToken()}`
      },
      body: data
    })
    .then(response => response.json())
    .then((response)=> {
      console.log(response)
      this.afterSubmission(true);
    })
    .catch((error) => {
      console.log("Error: " + error)
      this.afterSubmission(false)
    })
  }

  handleChange(event){
    var key = event.target.name;
    var val = event.target.value
    var obj = {}
    obj[key] = val
    this.setState( obj );
  }

  fileHandle(event){
    var file = event.target.files[0]
    this.setState({ documents: file })
  }

  afterSubmission(status){
    this.clearForm();
    this.postMessage(status);
  }

  clearForm(){
    this.setState({
      title: '',
      owner: '',
      description: '',
      documents: {}
    })
  }

  postMessage(status){
    this.setState({ success: status})
  }

  render(){

    if (this.state.success == true){
      var successStyle = {
        width: '40%',
        margin: '5px 0px',
        padding: '8px',
        color: '#4F8A10',
        backgroundColor: '#DFF2BF'
      }
      var successTextStyle = {
        margin: '5px 11px',
        fontSize: '1.2em',
        verticalAlign: 'middle'
      }
      var successMsg = "Project successfully added"
    }
    else if (this.state.sucecss == false){
      var successStyle = {
        width: '40%',
        margin: '5px 0px',
        padding: '8px',
        color: '#D8000C',
        backgroundColor: '#FFD2D2'
      }
      var successTextStyle = {
        margin: '5px 11px',
        fontSize: '1.2em',
        verticalAlign: 'middle'
      }
      var successMsg = "Error"
    }
    else {
      var successStyle, successTextStyle, successMsg;
    }

    return(
      <div className = "dash-form-container">
        <div className="dash-form-return-msg" style={successStyle}>
          <div style={successTextStyle} >{successMsg}</div>
        </div>
        <form onSubmit={this.handleSubmit}>
          <ul>
            <li>
            <label> Title </label>
              <input value={this.state.title} name="title" type="text" onChange={this.handleChange} />
            </li>
            <li>
            <label> Description </label>
              <input value={this.state.description} name="description" type="text" onChange={this.handleChange} />
            </li>
            <li>
              <label>
                <div>
                  Add filename
                </div>
                <div>
                  You can add more later
                </div>
             </label>
              <input className="file-input" name="documents" type="file" onChange={this.fileHandle} />
            </li>
          </ul>
          <button type="submit">
            Add Project
          </button>
        </form>
      </div>
    )
  }
}

NewProjectPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default NewProjectPage;
