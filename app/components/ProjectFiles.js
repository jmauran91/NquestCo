import React from 'react';
import ReactDOM from 'react-dom';
import Auth from '../modules/Auth';
import Fetch from '../modules/Fetch';
import Convert from '../modules/Convert';
import FileViewer from 'react-file-viewer';
import PDFviewer from './PDFviewer';
import Viewer from 'react-viewer';
import Modal from './Modal';
import FileMatrix from './FileMatrix';
import Dropzone from 'react-dropzone';
import 'react-viewer/dist/index.css';



class ProjectFiles extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      files: [],
      name: '',
      add_file: '',
      description: '',
      filetype: '',
      file_message: '',
      project: {},
      msg: '',
      modal_file: {},
      isShowingModal: false,
      fileExpand: false,
      form_stat: null,
      showAddFile: false,
      arrowHide_file: true
    }

    this.fileTypeSwitcher = this.fileTypeSwitcher.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.modalFileSet = this.modalFileSet.bind(this);
    this.modalSelector = this.modalSelector.bind(this);
    this.bigToggle = this.bigToggle.bind(this);
    this.addFileToggle = this.addFileToggle.bind(this);
    this.handleFileExpand = this.handleFileExpand.bind(this);
    this.clearFileForm = this.clearFileForm.bind(this);
    this.changeClassName = this.changeClassName.bind(this);
    this.changeFileHandler = this.changeFileHandler.bind(this);
    this.addFileHandler = this.addFileHandler.bind(this);
    this.onDrop = this.onDrop.bind(this);

    this.loadFiles = Fetch.loadFiles.bind(this);
    this.loadProject = Fetch.loadProject.bind(this);
    this.addFileFetch = Fetch.addFileToProject.bind(this);
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
    var pdf_filepath = "/assets/images/pdf_thumbnail.png"
    var doc_filepath = "/assets/images/Microsoft_Word_doc_logo.svg"

    if ( file["ContentType"] == "image/jpeg" || file["ContentType"] == "image/png"){
      return( <img src={img_filepath} />)
    }
    else if ( file["ContentType"] == "application/pdf" ){
      return( <img src={pdf_filepath} />)
    }
    else if (file.ContentType == "application/msword" ||
             file.ContentType == "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
             file.ContentType == "application/vnd.oasis.opendocument.text"){
      return( <img src={doc_filepath} /> )
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

  addFileToggle(){
    this.setState({
      showAddFile: !this.state.showAddFile,
      arrowHide_file: !this.state.arrowHide_file
    })
  }

  addFileHandler(event){
    event.preventDefault()
    this.addFileFetch(this.props.project._id, this.state.add_file);
    this.setState({
      showAddFile: !this.state.showAddFile,
      arrowHide_file: !this.state.arrowHide_file
    })
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
      else if (file.ContentType == "application/msword" ||
               file.ContentType == "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ) {

        let doc_src = `http://view.officeapps.live.com/op/view.aspx?src=<span style="color: #3366ff;">https://s3.amazonaws.com/rsearcherdockbucket/${file.name}</span>`
        return(
          <div className="iframe_doc_div" style={{textAlign: 'center'}}>
            <iframe id="iframe_doc" src={doc_src}> </iframe>
          </div>
        )
      }
      else if (file.ContentType == "application/vnd.oasis.opendocument.text"){
        let doc_src = `https://s3.amazonaws.com/rsearcherdockbucket/${file.name}`
        return(
          <Viewer
            style={{position: 'absolute', top: '0px'}}
            visible={true}
            images={[{src: doc_src}]}
          />
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

  clearFileForm(){
    this.setState({ add_file: '' });
  }


  onDrop(files){
    console.log(files)
    var file = files[0]
    this.setState({ add_file: file })
  }

  changeClassName(){
    if (this.state.form_stat == true) {
      return(`new-file-true`)
    }
    else if (this.state.form_stat == false) {
      return(`new-file-false`)
    }
    else {
      return(`new-file-null`)
    }
  }

  changeFileHandler(event){
    this.setState({ add_file: event.target.files[0]})
  }


  render(){
    if(this.props.userThis != true){
      var userThisStyle = {
        display: 'none'
      }
    }
    else {
      var userThisStyle = {

      }
    }
    if(this.state.arrowHide_file == true){
      var rightArrowFileStyle = {
        display: 'block'
      }
      var downArrowFileStyle = {
        display: 'none'
      }
    }
    else {
      var rightArrowFileStyle = {
        display: 'none'
      }
      var downArrowFileStyle = {
        display: 'block'
      }
    }
    if(this.state.showAddFile == true){
      var myAddFileStyle = {
        display: 'block',
        position: 'absolute',
        top: '-200px',
        left: '-20px',
        backgroundColor: 'white',
        zIndex: '5',
        boxShadow: '2px 2px 2px #888888',
        border: '1px solid black'
      }
    }
    else {
      var myAddFileStyle = {
        display: 'none'
      }
    }

    var ren_modalSelector = this.modalSelector(this.state.isShowingModal, this.state.modal_file);
    if(!Convert.isArrEmpty(this.state.files)){
      var sortedFiles = Convert.dateSort(this.state.files, 'file')
      var renderFilesMap = sortedFiles.map((file, i) => {
        return(
          <td
            className="file-tile"
            ref="ftile"
            key={i}
            onClick={() => {
              this.toggleModal();
              var clicked_file = file
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
       renderFilesMap = (<td className="scrollbox"> No files yet... </td>)
    }

    return(
      <div className="projectfiles-show">
        <div className="pfiles-menu-container">
          <div className="pfn-header no-select pfile-menu" >Files</div>
          <div className="anchor-container-files pfile-menu" onClick={this.addFileToggle} style={{cursor: 'pointer'}}>
            Add File
            <div style={rightArrowFileStyle} className="arrow-right"></div>
            <div style={downArrowFileStyle} className="arrow-down"></div>
          </div>
          <div className="pfn-expander pfile-menu" onClick={this.handleFileExpand}>Expand...</div>
        </div>
        <table className="scrollbox">
          <tbody>
            <tr className="renderfiles-show">
              {renderFilesMap}
            </tr>
          </tbody>
        </table>

        <div className="project-add-file">
          <div
          className={this.changeClassName()}
          style={{}}>
            <div>{this.state.file_message}</div>
          </div>
          <br />
          <div className="project-add-file-form" style={myAddFileStyle}>
            <form onSubmit={this.addFileHandler}>
            <Dropzone onDrop={this.onDrop}>
            <p> Drag file or click to upload </p>
            </Dropzone>
            <button type="submit">Save</button>
            </form>
          </div>
        </div>

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
        userThis={this.props.userThis}
        project={this.props.project}
        handleFileExpand={this.handleFileExpand}
        />

      </div>
    )
  }
}

export default ProjectFiles;
