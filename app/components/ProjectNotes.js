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
      quillText: '',
      fetch_err: null,
      msg: '',
      noteTitle: '',
      noteExpand: false,
      arrowHide_note: true,
      form_stat: null,
      showEditor: false,
      isShowingAddEditor: false

    }

    this.submitEdition = this.submitEdition.bind(this);
    this.quillHandleChange = this.quillHandleChange.bind(this);
    this.modalBody = this.modalBody.bind(this);
    this.handleNoteExpand = this.handleNoteExpand.bind(this);
    this.submitNote = this.submitNote.bind(this);
    this.switchProjectEditor = this.switchProjectEditor.bind(this);
    this.quillTitleHandle = this.quillTitleHandle.bind(this)
    this.showEditNote = this.showEditNote.bind(this);

    this.fetchNotes = Fetch.getNotes.bind(this);
    this.editNoteFetch = Fetch.editNote.bind(this);
    this.addNoteFetch = Fetch.submitNote.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(typeof nextProps.project._id != 'undefined'){
      this.fetchNotes(nextProps.project._id);
    }
  }

  handleNoteExpand(){
    this.setState({ noteExpand: !this.state.noteExpand })
  }


  quillTitleHandle(event){
    this.setState({ noteTitle: event.target.value })
  }


  submitNote(event){
    event.preventDefault()
    this.switchProjectEditor();
    this.addNoteFetch(this.props.project._id, this.state.quillText, this.state.noteTitle);

  }

  submitEdition(event){
    event.preventDefault();
    this.switchProjectEditor();
    this.props.toggleModal();
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

  switchProjectEditor(){
    this.setState({
      showEditor: !this.state.showEditor,
      arrowHide_note: !this.state.arrowHide_note,
    })
  }

  showEditNote(){
    this.setState({
      isShowingAddEditor: !this.state.isShowingAddEditor
    })
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
    if(this.state.showEditor == true){
      var mainEditStyle = {
        display: 'block',
        position: 'fixed',
        width: '85%',
        height: '85%',
        top: '100px',
        left: '100px',
        backgroundColor: 'white',
        zIndex: '9999',
        boxShadow: '2px 2px 2px #888888',
        border: '1px solid black'
      }
      var myEditBackgroundStyle = {
        display: 'block',
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        background: 'rgba(0, 0, 0, 0.3)',
        zIndex: '4'

      }
    }
    else if (this.state.showEditor == false) {
      var mainEditStyle = {
        display: 'none'
      }
      var myEditBackgroundStyle = {
        display: 'none'
      }
    }

    if(this.state.arrowHide_note == true){
      var rightArrowNoteStyle = {
        display: 'block'
      }
      var downArrowNoteStyle = {
        display: 'none'
      }
    }
    else {
      var rightArrowNoteStyle = {
        display: 'none'
      }
      var downArrowNoteStyle = {
        display: 'block'
      }
    }

    if(this.state.isShowingAddEditor == true){
      var smallEditStyle = {
        display: 'block'
      }
    }
    else {
      var smallEditStyle = {
        display: 'none'
      }
    }

    var modal_exec = this.modalBody(this.state.modal_file)
    var notes = this.state.notes
    if(!Convert.isArrEmpty(notes)){
      notes = Convert.dateSort(notes, 'note')
      var renderNotesMap = notes.map((note, i) => {
        return(
          <td
            className="note-tile"
            ref="fnote"
            key={i}
            onClick={()=> {
              this.props.toggleModal();
              this.setState({
                modal_file: note
              })
            }}
            value={i}
            >
              <img src="/assets/images/text-icon.jpg" />
              <span className="note-tile-name">
                {note.title}
              </span>
          </td>
        )
      })
    }
    else{
      var renderNotesMap = <td className="scrollbox"> No notes yet... </td>
    }

    return(
      <div className="projectnotes-show">
        <div className="pfiles-menu-container">
          <div className="pfn-header no-select pfile-menu">Notes</div>
          <div
            className="anchor-container-notes pfile-menu"
            onClick={this.switchProjectEditor}
            style={{cursor: 'pointer'}}>
            Add Note
            <div style={rightArrowNoteStyle} className="arrow-right"></div>
            <div style={downArrowNoteStyle} className="arrow-down"></div>
          </div>
          <div className="pfn-expander pfile-menu" onClick={this.handleNoteExpand}>Expand...</div>
        </div>
        <table className="scrollbox">
          <tbody>
            <tr className="rendernotes-show">
              {renderNotesMap}
            </tr>
          </tbody>
        </table>

        <div className="project-add-note" >
        <br />
          <div
           className="projecteditor-backdrop"
           style={myEditBackgroundStyle}
           onClick={this.switchProjectEditor}>
           </div>
          <div id="projecteditor-container" style={mainEditStyle}>
            <form onSubmit={this.submitNote}>
              <div className="note-title-box">
                <label> Note Title </label>
                <input
                label="Note Title"
                type="text"
                value={this.state.noteTitle}
                onChange={this.quillTitleHandle}
                />
              </div>
              <div
                className="quill-xout"
                onClick={this.switchProjectEditor}
                >
              X
              </div>
              <ReactQuill
              value={this.state.quillText}
              onChange={this.quillHandleChange}
              />

              <button type="submit"> Save Note </button>
            </form>
          </div>
        </div>



        <Modal
        show={this.props.isShowingModal}
        onClose={this.props.toggleModal}
        container={this}
        >
        <div className="modal-internal">
          <div className="modal-body-holder" dangerouslySetInnerHTML={modal_exec} />
          <div className="editor-big">
            <button onClick={this.showEditNote}> Edit </button>
            <div className="editor-window" style={smallEditStyle}>
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
        userThis={this.props.userThis}
        project={this.props.project}
        handleNoteExpand={this.handleNoteExpand}
        />


      </div>
    )
  }
}

export default ProjectNotes;
