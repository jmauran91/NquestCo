import React from 'react';
import Convert from '../modules/Convert';
import Fetch from '../modules/Fetch';


class NoteMatrix extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      viewNote: {},
      isViewing: false
    }

    this.deleteNoteHandler = this.deleteNoteHandler.bind(this);
    this.handleNoteLiClick = this.handleNoteLiClick.bind(this);
    this.exitView = this.exitView.bind(this);

    this.deleteNoteFetch = Fetch.deleteNote.bind(this);
  }

  deleteNoteHandler( note){
    this.props.handleNoteExpand();
    this.setState({ isViewing: false })
    this.deleteNoteFetch(this.props.project._id, note._id)
  }

  handleNoteLiClick(note){
    this.setState({
      isViewing: !this.state.isViewing,
      viewNote: note
    })
  }

  exitView(){
    this.setState({ isViewing: false})
    this.props.handleNoteExpand()
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
    if(this.props.show == false){
      return null
    }
    else {
      if(this.state.isViewing){
        var viewNoteStyle = {
          display: 'block',
          zIndex: '9999',
          position: 'fixed',
          top: '50%',
          left: '50%',
          height: '90vh',
          width: '60vw',
          transform: 'translate(-50%, -50%)',
          border: '1px solid black',
          boxShadow: '2px 2px 2px #888888',
          backgroundColor: '#A9A9A9',
          padding: '24px',


        }
        var viewInternalStyle = {
          display: 'block',
          padding: '48px',
          backgroundColor: 'white',
          textAlign: 'center',
          height: '80%'
        }
      }
      else {
        var viewNote = {
          display: 'none'
        }
        var viewInternalStyle = {
          display: 'none'
        }
      }
      if(!Convert.isArrEmpty(this.props.notes)){
        var renderNoteList = this.props.notes.map((note, i) => {

          return(
            <li
            key={i}
            className="note-li"
            onClick={() => {this.handleNoteLiClick(note) }}
            >
            <img className="note-li-pic" src="/assets/images/text-icon.jpg" />
            <span className="note-li-title">{note.title}</span>
            <span className="note-li-deleter" style={userThisStyle}
             onClick={(event) => {this.deleteNoteHandler(event, note)}}>&#10006;</span>

            </li>
          )
        })
      }
      else {
        var renderNoteList = (<li className="note-li">No notes yet...</li>)
      }

      if(!Convert.isObjEmpty(this.state.viewNote)){
        var text = this.state.viewNote.body.replace(/<(?:.|\n)*?>/gm, '')
      }
      else {
        var text = ""
      }

      return(
        <div className="notetrx-master">
          <div className="notetrx-window">
            <span className="notetrx-exit" onClick={this.exitView}>
            X
            </span>
            <ul className="notetrx-list">
              {renderNoteList}
            </ul>
          </div>
          <div className="notetrx-view" style={viewNoteStyle}>
            <div className="notetrx-view-internal" style={viewInternalStyle}>
              {text}
            </div>
          </div>
          <div className="notetrx-backdrop" onClick={this.exitView}>
          </div>
        </div>
      )
    }
  }
}

export default NoteMatrix;
