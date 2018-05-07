import React from 'react';
import Convert from '../modules/Convert';


class FileMatrix extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      viewFile: {},
      isViewing: false
    }

    this.handleFileLiClick = this.handleFileLiClick.bind(this);
    this.fileTypeSwitcher = this.fileTypeSwitcher.bind(this);
    this.fileViewer = this.fileViewer.bind(this);
  }

  handleFileLiClick(file){
    if( file != this.state.viewFile ){
      this.setState({ isViewing: !this.state.isViewing, viewFile: file })
    }
    else {
      this.setState({ isViewing: !this.state.isViewing })
    }
  }

  fileTypeSwitcher(file){
    var img_selector = file.name;
    var img_filepath = `https://rsearcherdockbucket.s3.amazonaws.com/${img_selector}`
    var pdf_filepath = "http://localhost:3000/assets/images/pdf_thumbnail.png"
    if(file["ContentType"] == "image/jpeg" || file["ContentType"] == "image/png"){
      return img_filepath
    }
    else if (file["ContentType"] == "application/pdf"){
      return pdf_filepath
    }
    else {
      return null
    }
  }

  fileViewer(file, isViewing){
    function arrayBufferToBase64(buffer){
      var binary = ''
      var bytes = new Uint8Array(buffer)
      var len = bytes.byteLength
      for (var i=0; i < len; i++){
        binary += String.fromCharCode(bytes[i])
      }
      return window.btoa(binary)
    }
    if(isViewing){
      if( file.ContentType == "application/pdf" ){
        var arrayBuffer = file.Body.data
        var pdf64 = arrayBufferToBase64(arrayBuffer)
        var pdf_src = `data:application/pdf;base64,${pdf64}`
        return(
          <div className="iframe_pdf_div">
            <iframe id="iframe_pdf" src={pdf_src}></iframe>
          </div>
        )
      }
      else {
        var arrayBuffer = file.Body.data
        var jpg64 = arrayBufferToBase64(arrayBuffer)
        var jpg_src = `data:image/jpg;base64,${jpg64}`
        return(
          <div className="iframe_jpg_div">
            <img id="iframe_jpg" src={jpg_src} />
          </div>
        )
      }
    }
  }

  render(){

    if(this.props.show == false){
      return null
    }

    else {
      if(this.state.isViewing){
        var viewFileStyle = {
          display: 'block'
        }
      }
      else {
        var viewFileStyle = {
          display: 'none'
        }
      }
      var renderFileList = this.props.files.map((file, i) => {
        return(
          <li
          key={i}
          className="file-li"
          onClick={() => { this.setState({ isViewing: !this.state.isViewing, viewFile: file })}}
          >
            <img className="file-li-pic" src={this.fileTypeSwitcher(file)}/>
            <span className="file-li-title">{file.name}</span>
          </li>
        )
      })
      return(
        <div className="filetrx-master">
          <div className="filetrx-window">
            <span className="filetrx-exit" onClick={this.props.onClose}>
            X
            </span>
            <ul className="filetrx-list">
              {renderFileList}
            </ul>
          </div>
          <div
            className="filetrx-view"
            style={viewFileStyle}
            onClick={() => { this.setState({ isViewing: false })}}
            >
            {this.fileViewer(this.state.viewFile, this.state.isViewing)}
          </div>
          <div className="notetrx-backdrop" onClick={this.props.onClose}>
          </div>
        </div>

      )
    }
  }
}

export default FileMatrix;
