import React from 'react';
import Convert from '../modules/Convert';

class Feed extends React.Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){
    if(this.props.categorized_projects == null || this.props.categorized_projects.length == 0){
      return null
    }
    else {
      var feedStyle = {
        backgroundColor: 'lightgrey',
        border: '1px solid black',
      }
      var render_catproj = this.props.categorized_projects.map((proj, i) => {
        var date = Convert.prettifyDate(proj.updatedAt)
        var url = `/project/${proj._id}`
        var about = proj.description
        var author = proj.ownername
        return(
          <li
            className="feed-result-tile"
            key={i}
            style={feedStyle}
          >
            <div className="feed-container-master">
              <div className="feed-container-left">
                <a href={url} className="feed-result-title"> {proj.title}</a>
                <span className="feed-result-description"> {about} </span>
              </div>
              <div className="feed-container-right">
                <div className="feed-date-container">
                  <span className="feed-result-date"> Updated at: {date} </span>
                </div>
                <div className="feed-owner-container">
                  <span className="feed-result-owner"> {author} </span>
                </div>
              </div>
            </div>
          </li>
        )
      })
      return(
        <div className="feed-container">
          <div className="feed-subcontainer">
            <div className="feed-banner">
              Feed:
            </div>
            <ul className="feed-ul">
              {render_catproj}
            </ul>
          </div>
        </div>
      )
    }
  }
}

export default Feed;
