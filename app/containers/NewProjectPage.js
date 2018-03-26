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
        documents: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event){
    event.preventDefault();
    const title = this.state.title;
    const owner = this.state.owner;
    const description = this.state.description;
    const documents = this.state.documents;
    const formData = `title=${title}&owner=${owner}&description=${description}&documents=${documents}`
    const url = 'http://localhost:3000/api/projects';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization' : `bearer ${Auth.getToken()}`
      },
      body: formData
    })
    .then(response => response.json())
    .then((response)=> {
      console.log(response)
      this.context.router.history.push('/projects')
    })
    .catch((error) => {
      console.log("Error: " + error)
    })

  }

  handleChange(event){
    var key = event.target.name;
    var val = event.target.value
    var obj = {}
    obj[key] = val
    this.setState( obj );
  }


  render(){
    return(
      <div className = "dash-form-container">
        <form onSubmit={this.handleSubmit}>
          <ul>
            <li>
            <label> Title </label>
              <input name="title" type="text" onChange={this.handleChange} />
            </li>
            <li>
            <label> Description </label>
              <input name="description" type="text" onChange={this.handleChange} />
            </li>
            <li>
            <label> (User should have this done automatically for him) Owner </label>
              <input name="owner" type="text" onChange={this.handleChange} />
            </li>
            <li>
            <label> (Add in an actual file field also) Add filename </label>
              <input name="documents" type="text" onChange={this.handleChange} />
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
