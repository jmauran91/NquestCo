import React from 'react';

class Modal extends React.Component{
  constructor(props){
    super(props);
    this.state = {

    }

  }


  render() {
    if (this.props.show == false){
      return null
    }

    return (
      <div className="modal-master">
        <div className="modal-window">
          <div className="modal-header">
            <div className="modal-text">
              File Viewer
            </div>
            <div className="modal-exit" onClick={this.props.onClose}>
              X
            </div>
          </div>
          {this.props.children}
        </div>
        <div className="modal-backdrop" onClick={this.props.onClose}>
        </div>
      </div>
    )
  }

}

export default Modal;
