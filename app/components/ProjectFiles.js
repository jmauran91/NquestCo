import React from 'react';

class ProjectFiles extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      files: [],
      name: '',
      description: '',
      filetype: '',
      project: ''
    }

    this.loadFiles = this.loadFiles.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitFile = this.submitFile.bind(this);
  }

  handleChange(event){
    var key = event.target.name;
    var val = event.target.value
    var obj = {}
    obj[key] = val
    this.setState( obj );

  }

  submitFile(){
    var name = this.state.name
    var description = this.state.description
    var filetype = this.state.filetype
    var project = this
    var payload = `name=${name}&description=${description}&filetype=${filetype}`;
    var bucketname = "rsearcherdockbucket";
    var url = `https://localhost:3000/api/projects/${this.props.match.params.id}`
  }

  loadFiles(){
    var url = `https://rsearcherdockbucket.s3.amazonaws.com`
  }

  componentDidMount(){
    this.loadFiles();
  }

  render(){

    var renderFiles = this.state.files.map((file, i) => {
      return(
        <div className="file-tile" key={i}>
          <img src=""/>
          <div className="file-tile-name"> </div>
          <div className="file-tile-desc"> </div>
          <div className="file-tile-users"> </div>
        </div>
      )
    })
    return(
      <div className="projectfiles-show">
        <div>
          <form onSubmit={this.submitFile}>
          <label> Select file </label>
            <input name="myFile" type="file"/>
          <label> Name </label>
            <input name="name" type="text" onChange={this.handleChange} />
          <label> Description </label>
            <input name="description" type="text" onChange={this.handleChange} />
          <label> Filetype </label>
            <input name="filetype" type="text" onChange={this.handleChange} />
          <button type="submit"> Add File </button>
          </form>
        </div>
        <div className="renderfiles-show">
          {renderFiles}
        </div>
      </div>
    )
  }
}

export default ProjectFiles;
