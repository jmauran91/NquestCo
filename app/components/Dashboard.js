import React from 'react';
import Auth from '../modules/Auth';
import Fetch from '../modules/Fetch';
import Convert from '../modules/Convert';
import NewProjectPage from '../containers/NewProjectPage';
import ProjectListPage from '../containers/ProjectListPage';
import ChatContainer from '../components/chat/ChatContainer';
import Feed from '../components/Feed';
import PropTypes from 'prop-types';

class Dashboard extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      current_user: {},
      component: 'feed',
      notiTally: 0,
      hamburgerShow: false,
      searchquery: '',
      searchProReturns: null,
      searchUsrReturns: null,
      searchMode: 'projects',
      categorized_projects: []
    };

    this.handleFeatureClick = this.handleFeatureClick.bind(this);
    this.notiTallyUpdater = this.notiTallyUpdater.bind(this);
    this.handleHamburger = this.handleHamburger.bind(this);
    this.handleSearchBar = this.handleSearchBar.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.searchModeChange = this.searchModeChange.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.retrieveUserCategoryProjects = this.retrieveUserCategoryProjects.bind(this);

    this.getCurrentUser = Fetch.GetCurrentUser.bind(this);
    this.searchProjectsFetch = Fetch.searchProjects.bind(this);
    this.searchUsersFetch = Fetch.searchUsers.bind(this);
    this.getProjectsByCategory = Fetch.getProjectsByCategory.bind(this);
  }

  handleSearchBar(event){
    this.setState({ searchquery: event.target.value})
  }

  submitSearch(event){
    event.preventDefault();
    if(this.state.searchMode == 'projects'){
      this.searchProjectsFetch(this.state.searchquery)
    }
    else if(this.state.searchMode == 'users'){
      this.searchUsersFetch(this.state.searchquery)
    }
    this.clearSearch();
  }

  clearSearch(){
    this.setState({ searchquery: '', component: '' })
  }

  retrieveUserCategoryProjects(){
    if(!Convert.isArrEmpty(this.state.current_user.categories)){
      this.state.current_user.categories.forEach((categ, i) => {
        this.getProjectsByCategory(categ)
        .then((res) => {
          let new_s = this.state.categorized_projects
          new_s = new_s.concat(res.projects)
          var new_state = Convert.dateSortProjects(new_s)
          this.setState({ categorized_projects: new_state })
        })
        .catch((err) => {
          console.log(err)
        })
      })
    }
    else {
      this.setState({ categorized_projects: null })
    }
  }

  componentDidMount(){
    this.getCurrentUser()
    .then((response) => {
      this.setState({ current_user: response }, () => {
        this.retrieveUserCategoryProjects();
      })
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

  searchModeChange(event){
    this.setState({ searchMode: event.target.value })
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
    if(!Convert.isArrEmpty(this.state.searchProReturns)){
      if(this.state.searchProReturns.length && this.state.searchProReturns.length > 0){
        var srchBannerStyle = {

        }
        if(this.state.searchProReturns instanceof Array){
          var searchStyle = {
            backgroundColor: 'lightgrey',
            border: '1px solid black',
          }
          var searchText = this.state.searchProReturns.map((result, i) => {
            var u_name = this.state.current_user.name
            if( u_name == result.ownername || Convert.isInArr(u_name, result.usernames) ){
              var url = `/project/${result._id}`
            }
            else {
              var url = `/project/${result._id}/read`
            }
            var date = Convert.prettifyDate(result.createdAt)
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
        else if (typeof this.state.searchProReturns === 'string' ){
          var searchStyle = {
          }
          var searchText = <li className="search-result-tile" id="search-error-tile" key={0} style={searchStyle}> ...{this.state.searchProReturns}... </li>
        }
      }
      else {
        var srchBannerStyle = {
          display: 'none'
        }
      }
    }
    if(!Convert.isArrEmpty(this.state.searchUsrReturns)){
      var searchStyle = {
        backgroundColor: 'lightgrey',
        border: '1px solid black',
      }
      if(this.state.searchUsrReturns instanceof Array){
        var searchText = this.state.searchUsrReturns.map((user, i) => {
          var date = Convert.prettifyDate(user.createdAt)
          var url = `/profile/${user._id}`
          if(Convert.isStrExist(user.about)){
            var about = user.about.replace(/<(?:.|\n)*?>/gm, '')
          }
          else {
            var about = ""
          }
          return(
            <li
              className='search-result-tile'
              key={i}
              style={searchStyle}
            >
              <a href={url} className="search-result-title"> {user.name}</a>
              <span className="search-result-description"> {about} </span>
              <span className="search-result-date"> Joined at: {date} </span>
            </li>
          )
        })
      }
      else if (typeof this.state.searchUsrReturns === 'string') {
        var searchStyle = {}
        var searchText = <li className="search-result-tile" id="search-error-tile" key={0} style={searchStyle}> ...{this.state.searchUsrReturns}...</li>
      }
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
      if (this.state.component == 'feed'){
        return(
          <div>
            <Feed />
          </div>
        )
      }
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

    if(this.state.searchProReturns == null && this.state.searchUsrReturns == null){
      var srchContainerStyle = {
        display: 'none'
      }
    }
    else {
      var srchContainerStyle = {}
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
    var aboutTagStyle = {
      display: 'block',
      margin: '0 auto',
      position: 'absolute',
      bottom: '24px',
      left: '48px',
      right: '0',
      margin: 'auto'

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
            <select className="search-selector" onChange={this.searchModeChange} value={this.state.searchMode}>
              <option value="projects">Projects</option>
              <option value="users">Users</option>
            </select>
          </form>
        </div>
        <div className="dash-body">
          <div className="dash-slideshow">
            <div className="dash-slideshow-images dash-first-img">
              <img src="/assets/images/WRLD-EPS-01-0008.png"/>
            </div>
            <div className="dash-slideshow-images">
              <img src="/assets/images/WRLD-EPS-01-0008.png"/>
            </div>
          </div>
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
              <li>
                <button
                  onClick={this.handleFeatureClick}
                  name="feed"
                > Feed </button>
              </li>
            </ul>
            <a className="about-tag" style={aboutTagStyle} href="/about">About</a>
          </div>
          <div className="center-side-dash" style={centerSideStyle}>
            <div className="search-results-container" style={srchContainerStyle}>
              <h3 className="search-results-banner" style={srchBannerStyle}>Search results: </h3>
              <div className="search-results">
                <ul>
                  {searchText}
                </ul>
              </div>
            </div>
            {this.state.component == 'feed'
              && <Feed
                  current_user={this.state.current_user}
                  categorized_projects={this.state.categorized_projects}
                  category_subscriptions={this.state.current_user.categories}
                  />}
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
