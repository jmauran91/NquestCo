import React from 'react';
import Auth from '../modules/Auth';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Modal from './Modal';

class ProjectNotes extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      notes: null,
      success: null,
      modal_file: null,
      isShowingModal: false,
      isShowingEdit: false,
      quillText: null,
      fetch_err: null,
      msg: ''

    }

    this.toggleEdit = this.toggleEdit.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.submitEdition = this.submitEdition.bind(this);
    this.quillHandleChange = this.quillHandleChange.bind(this);
    this.modalBody = this.modalBody.bind(this);
  }

  submitEdition(){
    var url = `http://localhost:3000/api/project/${this.props.url_id}/notes/${this.state.modal_file._id}`
    var formData = `newtext=${this.state.quillText}`
    fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`
      },
      body: formData
    })
    .then(response => response.json())
    .then((response) => {
      console.log(response)
      this.setState({ isShowingModal: false })
    })
    .catch((err) => {
      console.log(err)
    })
  }

  modalBody(){
    if(this.state.modal_file!=null){
      var rawMarkup = this.state.modal_file.body
      return {__html: rawMarkup }
    }
    else {
      return {__html: ''}
    }
  }


  quillHandleChange(value){
    this.setState({ quillText: value })
  }

  toggleModal(){
    this.setState({
      isShowingModal: !this.state.isShowingModal
    })
  }

  toggleEdit(){
    this.setState({
      isShowingEdit: !this.state.isShowingEdit
    })
  }

  componentDidMount(){
    var url = `http://localhost:3000/api/project/${this.props.url_id}/notes`
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`
      }
    })
    .then(response => response.json())
    .then((response) => {
      console.log(response)
      console.log(response['msg'])
      if (typeof(response.notes) == String){
        debugger;
        this.setState({ notes: response.notes, msg: response.msg, success: true })
      }
      else {
        this.setState({ success: false, msg: response.msg })
      }
    })
    .catch((err) => {
      console.log(err)
      this.setState({ fetch_err: err})
    })
  }

  render(){

    if(this.state.isShowingEdit==true){
      var editStyle = {
        display: 'block'
      }
    }
    else {
      var editStyle = {
        display: 'none'
      }
    }

    var note_img_url = ""

    if(this.state.success == true){
      var renderNotes;
        var renderNotesMap = this.state.notes.map((note, i) => {
        return(
          <td
            className="note-tile"
            ref="fnote"
            key={i}
            onClick={()=> {
              this.toggleModal();
              this.setState({
                modal_file: this.state.notes[i]
              })
            }}
            value={i}
            >
            <img src={note_img_url} />
            <div className="note-tile-name">
              {note.title}
            </div>
            <div className="note-tile-date">
              {note.created}
            </div>
          </td>
        )
      })
      renderNotes = <table className="scrollbox">
                      <tbody>
                        <tr className="rendernotes-show">
                          {renderNotesMap}
                        </tr>
                      </tbody>
                    </table>
                    
    } else if (this.state.success == false){
      var renderNotes = <div className="scrollbox"> No notes yet. </div>
    }
    else {
      var renderNotes;
    }

    return(
      <div className="projectnotes-show">
        {renderNotes}

        <Modal
        show={this.state.isShowingModal}
        onClose={this.toggleModal}
        container={this}
        >
        <div className="modal-internal">
          <div className="modal-body-holder" dangerouslySetInnerHTML={this.modalBody()} />
          <div className="editor-big">
            <button onClick={this.toggleEdit}> Edit </button>
            <div className="editor-window" style={editStyle}>
              <form onSubmit={this.submitEdition}>
                <ReactQuill
                  value={this.state.quillText}
                  onChange={this.quillHandleChange}
                />
                <button type="submit"> Save Note </button>
              </form>
            </div>
          </div>
        </div>

        </Modal>
      </div>
    )
  }
}

export default ProjectNotes;
