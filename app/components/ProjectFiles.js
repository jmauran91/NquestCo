import React from 'react';
import ReactDOM from 'react-dom';
import Auth from '../modules/Auth';
import FileViewer from 'react-file-viewer';
import PDFviewer from './PDFviewer';
import Modal from './Modal';

class ProjectFiles extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      files: [],
      name: '',
      description: '',
      filetype: '',
      project: {},
      msg: '',
      modal_file: {},
      isShowingModal: false
    }

    this.loadFiles = this.loadFiles.bind(this);
    this.loadProject = this.loadProject.bind(this);
    this.fileTypeSwitcher = this.fileTypeSwitcher.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.modalFileSet = this.modalFileSet.bind(this);
    this.modalSelector = this.modalSelector.bind(this);
    this.bigToggle = this.bigToggle.bind(this);
  }

  loadProject(){
    const url = `http://localhost:3000/api/project/${this.props.url_id}`
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

  loadFiles(){
    var url_id = this.props.url_id
    var url = `http://localhost:3000/api/project/${url_id}/files`;
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`
      }
    })
    .then(response => response.json())
    .then((response) => {
      this.setState({
         files: response.files,
         msg: response.msg
      })
      console.log( response['msg'] )
    })
    .catch((error) => {
      console.log(error)
    })
  }

  componentDidMount(){
    this.loadProject();
    this.loadFiles();
  }



  fileTypeSwitcher(file, i){
    var img_selector = file.name
    var img_filepath = `https://rsearcherdockbucket.s3.amazonaws.com/${img_selector}`;
    var pdf_filepath = "http://localhost:3000/assets/images/pdf_thumbnail.png"

    if ( file["ContentType"] == "image/jpeg" ){
      return( <img src={img_filepath} />)
    }
    else if ( file["ContentType"] == "application/pdf" ){
      return( <img src={pdf_filepath} />)
    }
    else {
      return null
    }
  }


  toggleModal(){
    this.setState({
      isShowingModal: !this.state.isShowingModal,
    })
  }

  modalFileSet(event){

    var ftile = ReactDOM.findDOMNode(this.refs.ftile)
    var i = ftile.value;
    debugger;
    this.setState({
      modal_file: this.state.files[i]
    })
  }

  bigToggle(){
    this.modalFileSet(event);
    this.toggleModal();
  }


  modalSelector(){

    function arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = new Uint8Array( buffer );
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode( bytes[ i ] );
        }
        return window.btoa( binary );
    }

    if( this.state.isShowingModal) {
      if( this.state.modal_file.ContentType == "application/pdf"){

        var arrayBuffer = this.state.modal_file.Body.data
        var pdf64 = arrayBufferToBase64(arrayBuffer)
        var pdf_src = `data:application/pdf;base64,${pdf64}`;
        return(
          <div className="iframe_pdf_div">
            <iframe id="iframe_pdf" src={pdf_src}></iframe>
          </div>
        )
      }
      else {
        var arrayBuffer = this.state.modal_file.Body.data
        var jpg64 = arrayBufferToBase64(arrayBuffer)
        var jpg_src = `data:image/jpg;base64,${jpg64}`
        return(
          <div className="iframe_jpg_div">
            <iframe id="iframe_jpg" src={jpg_src}></iframe>
          </div>
        )
      }
    }
  }

  render(){

    var ren_modalSelector = this.modalSelector();

    var renderFiles = this.state.files.map((file, i) => {
      return(
        <li
          className="file-tile"
          ref="ftile"
          key={i}
          onClick={() => {
             this.toggleModal();
             var clicked_file = this.state.files[i]
             this.setState({
               modal_file: clicked_file
             })
           }}
           value={i}
         >

          {this.fileTypeSwitcher(file, i)}
          <div className="file-tile-name">
           {file.name}
          </div>
          <div className="file-tile-desc"> </div>
          <div className="file-tile-users"> </div>

        </li>
      )
    })

    return(
      <div className="projectfiles-show">
        <ul className="renderfiles-show">
          {renderFiles}
        </ul>

        <Modal
        show={this.state.isShowingModal}
        onClose={this.toggleModal}
        container={this}
        >

        {ren_modalSelector}
        </Modal>
      </div>
    )
  }
}

export default ProjectFiles;
