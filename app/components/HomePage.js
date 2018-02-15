import React from 'react';
import PropTypes from 'prop-types';
import DocketImg from '../assets/images/eA9ILzv.png'
import SignUpPage from '../containers/SignUpPage';

class HomePage extends React.Component{
  constructor(props){
    super(props);

    this.handleSignUp = this.handleSignUp.bind(this);

  }

  handleSignUp(){
    this.context.router.history.push('/signup');
  }

  render(){
    return(
      <div>
      <div className="home-c">
          <div className="left-side">
            <div className="home-banner">
              <h1> ResearchDock </h1>
              <h3 style={{ fontStyle: 'italic' }}>
                Organize your research topics
                on an accessible, shareable platform
              </h3>
            </div>
          </div>
          <div className="right-side">
            <div className="right-side-banner">
              <div className="right-side-banner-text">
              ResearchDock is an online workstation where you can
              store your research materials, whether they be links,
              images, scans, text files or what have you. Work on
              your topic with everything at hand and find like-minded
              individuals with which to collaborate! Signing up is easy...
              </div>
              <div className="right-side-banner-subtext">
              - Collect
              - Compose
              - Organize
              - Share
              - Get it done
              </div>
            </div>
            <div className="home-signup-container">
            <button className="landing-signup"
            onClick={this.handleSignUp}>
            Sign Up
            </button>
            </div>
          </div>
          </div>
        <div className="home-footer">
          Site created and maintained by John Mauran {"\n"}
          <br/>
          2018
        </div>
      </div>
    )
  }
};

HomePage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default HomePage;
