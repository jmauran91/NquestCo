import React from 'react';
import Auth from '../modules/Auth';
import Fetch from '../modules/Fetch';
import Convert from '../modules/Convert';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Modal from './Modal';
import NoteMatrix from './NoteMatrix';

class ProjectNotes extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      notes: null,
      success: null,
      modal_file: null,
      quillText: null,
      fetch_err: null,
      msg: '',
      noteExpand: false

    }

    this.submitEdition = this.submitEdition.bind(this);
    this.quillHandleChange = this.quillHandleChange.bind(this);
    this.modalBody = this.modalBody.bind(this);
    this.handleNoteExpand = this.handleNoteExpand.bind(this);

    this.fetchNotes = Fetch.getNotes.bind(this);
    this.editNoteFetch = Fetch.editNote.bind(this);
  }

  handleNoteExpand(){
    this.setState({ noteExpand: !this.state.noteExpand })
  }

  submitEdition(event){
    event.preventDefault();
    this.editNoteFetch(this.props.project._id, this.state.modal_file._id, this.state.quillText);
  }

  modalBody(file){
    if(file!=null){
      var rawMarkup = file.body
      return {__html: rawMarkup }
    }
    else {
      return {__html: ''}
    }
  }

  quillHandleChange(value){
    this.setState({ quillText: value })
  }

  componentWillReceiveProps(nextProps){
    if(typeof nextProps.project._id != 'undefined'){
      this.fetchNotes(nextProps.project._id);
    }
  }

  render(){

    if(this.props.isShowingAddEditor==true){
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
    var modal_exec = this.modalBody(this.state.modal_file)

    if(!Convert.isArrEmpty(this.state.notes) == true){
      var renderNotes;
        var renderNotesMap = this.state.notes.map((note, i) => {
        return(
          <td
            className="note-tile"
            ref="fnote"
            key={i}
            onClick={()=> {
              this.props.toggleModal();
              this.setState({
                modal_file: this.state.notes[i]
              })
            }}
            value={i}
            >
            <img src={note_img_url} />
            <span className="note-tile-name">
              {note.title}
            </span>
            <span className="note-tile-date">
              {Convert.prettifyDate(note.created)}
            </span>
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

    }
    else{
      var renderNotes = <div className="scrollbox"> No notes yet. </div>
    }

    return(
      <div className="projectnotes-show">
        <span className="pfn-header no-select">Notes</span>
        <span className="pfn-expander" onClick={this.handleNoteExpand}>Expand...</span>
        {renderNotes}

        <Modal
        show={this.props.isShowingModal}
        onClose={this.props.toggleModal}
        container={this}
        >
        <div className="modal-internal">
          <div className="modal-body-holder" dangerouslySetInnerHTML={modal_exec} />
          <div className="editor-big">
            <button onClick={this.props.toggleEdit}> Edit </button>
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

        <NoteMatrix
        notes={this.state.notes}
        show={this.state.noteExpand}
        onClose={this.handleNoteExpand}
        container={this}
        />


      </div>
    )
  }
}

export default ProjectNotes;
