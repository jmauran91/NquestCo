import React from 'react';
import Convert from '../modules/Convert';


class NoteMatrix extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      viewNote: {},
      isViewing: false
    }

    this.handleNoteLiClick = this.handleNoteLiClick.bind(this)
  }

  handleNoteLiClick(){
    this.setState({ isViewing: !this.state.isViewing })
  }

  render(){
    if(this.props.show == false){
      return null
    }
    else {
      if(this.state.isViewing){
        var viewNoteStyle = {
          display: 'block'
        }
      }
      else {
        var viewNote = {
          display: 'none'
        }
      }
      if(!Convert.isArrEmpty(this.props.notes)){
        var renderNoteList = this.props.notes.map((note, i) => {
          return(
            <li
            key={i}
            className="note-li"
            onClick={this.handleNoteLiClick}
            >
            <img className="note-li-pic" src="/assets/images/text-icon.jpg" />
            <span className="note-li-title">{note.title}</span>
            </li>
          )
        })
      }
      else {
        var renderNoteList = (<li className="note-li">No notes yet...</li>)
      }

      return(
        <div className="notetrx-master">
          <div className="notetrx-window">
            <span className="notetrx-exit" onClick={this.props.onClose}>
            X
            </span>
            <ul className="notetrx-list">
              {renderNoteList}
            </ul>
          </div>
          <div className="notetrx-view" style={viewNoteStyle}>
            {this.state.viewNote.body}
          </div>
          <div className="notetrx-backdrop" onClick={this.props.onClose}>
          </div>
        </div>
      )
    }
  }
}

export default NoteMatrix;
