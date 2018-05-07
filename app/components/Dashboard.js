import React from 'react';
import Auth from '../modules/Auth';
import Fetch from '../modules/Fetch';
import Convert from '../modules/Convert';
import NewProjectPage from '../containers/NewProjectPage';
import ProjectListPage from '../containers/ProjectListPage';
import ChatContainer from '../components/chat/ChatContainer';
import PropTypes from 'prop-types';

class Dashboard extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      current_user: {},
      component: '',
      notiTally: 0,
      hamburgerShow: false,
      searchquery: '',
      searchReturns: null,
    };

    this.handleFeatureClick = this.handleFeatureClick.bind(this);
    this.notiTallyUpdater = this.notiTallyUpdater.bind(this);
    this.handleHamburger = this.handleHamburger.bind(this);
    this.handleSearchBar = this.handleSearchBar.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.clearSearch = this.clearSearch.bind(this);

    this.getCurrentUser = Fetch.GetCurrentUser.bind(this);
    this.searchProjectsFetch = Fetch.searchProjects.bind(this);
  }

  handleSearchBar(event){
    this.setState({ searchquery: event.target.value})
  }

  submitSearch(event){
    event.preventDefault();
    this.searchProjectsFetch(this.state.searchquery)
    this.clearSearch();
  }

  clearSearch(){
    this.setState({ searchquery: '' })
  }

  componentDidMount(){
    this.getCurrentUser()
    .then((response) => {
      this.setState({ current_user: response })
    })
    .catch((err) => {
      console.log(err)
    })
  }

  handleFeatureClick(event){
    if(this.state.component != event.target.name){
      this.setState({ component: event.target.name })
    }
    else {
      this.setState({ component: '' })
    }
  }

  handleHamburger(){
    this.setState({ hamburgerShow: !this.state.hamburgerShow })
  }

  notiTallyUpdater(num){
    this.setState({ notiTally: num })
  }

  render(){

    ///////////////////////////////////////////////////////
    //// handle the error / returns and rendering of search results
    //// for the projects search
    if(!this.state.hamburgerShow){
      var centerSideStyle = { }
    } else {
      var centerSideStyle = { paddingLeft: '18vw' }
    }
    var srchBannerStyle = { display: 'none' }
    if(this.state.searchReturns){
      if(this.state.searchReturns.length && this.state.searchReturns.length > 0){
        var srchBannerStyle = {

        }
      }
      else {
        var srchBannerStyle = {
          display: 'none'
        }
      }
    }
    if(this.state.searchReturns instanceof Array){
      var searchStyle = {
        backgroundColor: 'lightgrey',
        border: '1px solid black',

      }
      var searchText = this.state.searchReturns.map((result, i) => {
        var u_name = this.state.current_user.name
        if( u_name == result.ownername || Convert.isInArr(u_name, result.usernames) ){
          var url = `/project/${result._id}`
        }
        else {
          var url = `/project/${result._id}/read`
        }
        var date = Convert.prettifyDate(result.created)
        return(
          <li
            className="search-result-tile"
            key={i}
            style={searchStyle}
          >
            <a href={url} className="search-result-title"> {result.title}</a>
            <span className="search-result-description"> {result.description} </span>
            <span className="search-result-owner"> {result.ownername} </span>
            <span className="search-result-date"> {date} </span>
          </li>
        )
      })
    }
    else if (this.state.searchReturns instanceof String){
      var searchStyle = {
      }
      var searchText = <li className="search-result-tile" id="search-error-tile" key={0} style={searchStyle}> ...{this.state.searchReturns}... </li>
    }

    ///////////////////////////////////////////////////////
    //// This handles the logic for selecting features
    //// to show, from the menu on the left of screen
    if(this.state.hamburgerShow){
      var hambStyle = {
        display: 'block',
        position: 'absolute',
        zIndex: '5',
        left: '0',
        display: 'inline-block',
        width: '18vw',
        height: '100%',
        borderRight: '1px solid black',
        padding: '25px 10px',
      }
    }
    else {
      var hambStyle = {
        display: 'none'
      }
    }
    var featSwitcher = () => {
      if (this.state.component == 'new_project'){
        return(
          <div>
            <NewProjectPage />
          </div>
        )
      }
      if (this.state.component == 'my_projects'){
        return(
          <div>
            <ProjectListPage />
          </div>
        )
      }
      if (this.state.component == 'chat'){
        <div>
          <ChatContainer />
        </div>
      }
    }
    /// this handles the unread msgs notifications
    if (this.state.notiTally > 0){
      var parStyle = {
        position: 'relative',
        zIndex: '1',
      }
      var notiStyle = {
        position: 'absolute',
        color: 'white',
        zIndex: '2',
        right: '10px',
        top: '5px',
        paddingLeft: '8px',
        height: '25px',
        width: '25px',
        backgroundColor: 'red',
        borderRadius: '50%',
        display: 'inline-block',
      }
      var btnStyle = {
        paddingRight: '50px'

      }
      var notiMsg = this.state.notiTally
    }
    else {
      var notiMsg = ''
      var notiStyle = {
        display: 'none'
      }
    }

    return(
      <div className="dash-container">
        <div className="dash-banner">
          <div className="hamburger" onClick={this.handleHamburger}>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <span> Nquest </span>
          <form onSubmit={this.submitSearch} className="dash-banner-searchbar">
            <input
              type="text"
              placeholder="...search..."
              onChange={this.handleSearchBar}
              value={this.state.searchquery}
            />
            <button type="submit">
              <img src="assets/images/icons8-search.png" height='32px' width='32px'/>
            </button>
          </form>
        </div>
        <div className="dash-body">
          <div className="left-side-dash" style={hambStyle}>
            <ul className="feature-list">
              <li>
                <button
                  onClick={this.handleFeatureClick}
                  name="new_project"
                > New Project </button>
              </li>
              <li>
                <button
                  onClick={this.handleFeatureClick}
                  name="my_projects"
                > My Projects </button>
              </li>
              <li className="noti-ticker-parent" style={parStyle}>
                <button style={btnStyle}
                  onClick={this.handleFeatureClick}
                  name="chat"
                > Messenger
                </button>
                <span className="notification-ticker" style={notiStyle}>
                  {notiMsg}
                </span>
              </li>
            </ul>
          </div>
          <div className="center-side-dash" style={centerSideStyle}>
            <h3 className="search-results-banner" style={srchBannerStyle}>Search results: </h3>
            <div className="search-results">
              <ul>
                {searchText}
              </ul>
            </div>
            {this.state.component == 'new_project'
              && <NewProjectPage
                  owner_id={this.state.current_user._id}
                  owner_name={this.state.current_user.name}
                 />}

            {this.state.component == 'my_projects'
             && <ProjectListPage
                 url={this.state.current_user._id}
                 current_user={this.state.current_user}
                 />
               }

            {this.state.component == 'chat'
             && <ChatContainer
                current_user={this.state.current_user}
                notiTallyUpdater={this.notiTallyUpdater}
                total_unread={this.state.notiTally}
                />
              }
          </div>
        </div>
      </div>
    )
  }
}

Dashboard.contextTypes = {
  router: PropTypes.object.isRequired
};


export default Dashboard;
