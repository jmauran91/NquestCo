import React from 'react';
import ReactDOM from 'react-dom';
import Auth from '../modules/Auth';
import Fetch from '../modules/Fetch';
import FileViewer from 'react-file-viewer';
import PDFviewer from './PDFviewer';
import Modal from './Modal';
import FileMatrix from './FileMatrix';

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
      isShowingModal: false,
      fileExpand: false
    }

    this.loadFiles = Fetch.loadFiles.bind(this);
    this.loadProject = Fetch.loadProject.bind(this);
    this.fileTypeSwitcher = this.fileTypeSwitcher.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.modalFileSet = this.modalFileSet.bind(this);
    this.modalSelector = this.modalSelector.bind(this);
    this.bigToggle = this.bigToggle.bind(this);
    this.handleFileExpand = this.handleFileExpand.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(typeof nextProps.project._id != 'undefined'){
      this.loadFiles(nextProps.project._id);
    }
  }

  handleFileExpand(){
    this.setState({ fileExpand: !this.state.fileExpand })
  }

  fileTypeSwitcher(file, i){
    var img_selector = file.name
    var img_filepath = `https://rsearcherdockbucket.s3.amazonaws.com/${img_selector}`;
    var pdf_filepath = "http://localhost:3000/assets/images/pdf_thumbnail.png"

    if ( file["ContentType"] == "image/jpeg" || file["ContentType"] == "image/png"){
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
    this.setState({
      modal_file: this.state.files[i]
    })
  }

  bigToggle(){
    this.modalFileSet(event);
    this.toggleModal();
  }


  modalSelector( imShow, file ){

    function arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = new Uint8Array( buffer );
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode( bytes[ i ] );
        }
        return window.btoa( binary );
    }

    if( imShow) {
      if( file.ContentType == "application/pdf"){

        var arrayBuffer = file.Body.data
        var pdf64 = arrayBufferToBase64(arrayBuffer)
        var pdf_src = `data:application/pdf;base64,${pdf64}`;
        return(
          <div className="iframe_pdf_div" style={{textAlign: 'center'}}>
            <iframe id="iframe_pdf" src={pdf_src}></iframe>
          </div>
        )
      }
      else {
        var arrayBuffer = file.Body.data
        var jpg64 = arrayBufferToBase64(arrayBuffer)
        var jpg_src = `data:image/jpg;base64,${jpg64}`
        return(
          <div className="iframe_jpg_div" style={{textAlign: 'center'}}>
            <img id="iframe_jpg" src={jpg_src} />
          </div>
        )
      }
    }
  }

  render(){

    var ren_modalSelector = this.modalSelector(this.state.isShowingModal, this.state.modal_file);

    if(this.state.files){
      var renderFiles = this.state.files.map((file, i) => {
        return(
          <td
            className="file-tile"
            ref="ftile"
            key={i}
            onClick={() => {
              this.toggleModal();
              var clicked_file = this.state.files[i]
              this.setState({
                modal_file: clicked_file
              })
              window.scrollTo(0, 0)
            }}
            style={{width: '152px', overflow: 'hidden'}}
            value={i}
            >

            {this.fileTypeSwitcher(file, i)}
            <div className="file-tile-name no-select">
            {file.name}
            </div>
          </td>
        )
      })
    }
    else {
      var renderFiles = (<li className="file-tile no-select"> No files yet... </li>)
    }

    return(
      <div className="projectfiles-show">
        <span className="pfn-header no-select" >Files</span>
        <span className="pfn-expander" onClick={this.handleFileExpand}>Expand...</span>
        <table className="scrollbox">
          <tbody>
              <tr className="renderfiles-show">
                {renderFiles}
              </tr>
          </tbody>
        </table>

        <Modal
        show={this.state.isShowingModal}
        onClose={this.toggleModal}
        container={this}
        >
        {ren_modalSelector}
        </Modal>

        <FileMatrix
        files={this.state.files}
        show={this.state.fileExpand}
        onClose={this.handleFileExpand}
        container={this}
        />

      </div>
    )
  }
}

export default ProjectFiles;
