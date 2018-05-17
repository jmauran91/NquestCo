import React from 'react';
import PropTypes from 'prop-types';
import DocketImg from '../assets/images/eA9ILzv.png'
import SignUpPage from '../containers/SignUpPage';

class HomePage extends React.Component{
  constructor(props){
    super(props);
    this.state = {

    }

    this.handleSignUp = this.handleSignUp.bind(this);

  }

  handleSignUp(){
    this.context.router.history.push('/signup');
  }

  render(){
    return(
      <div>
      <div className="home-c">
        <div className="home-main">
          <div className="home-welcomer">
            <div className="home-welcomer-banner">
              Nquest
              <img src="/assets/images/eA9ILzv.png" height='100px' width='100px'/>
            </div>
            <div className="home-welcomer-text">
              Develop and organize your research projects alongside fellow researchers.
              <a href="/signup"> Get started</a> or, if you're already with us, <a href="/login">log in</a> here
            </div>
          </div>
          <div className="slideshow">
            <div className="slideshow-images first-img">
              <img src="/assets/images/images.jpeg" />
            </div>
            <div className="slideshow-images">
              <img src="/assets/images/o-PILE-OF-BOOKS-facebook.jpg" />
            </div>
            <div className="slideshow-images">
              <img src="/assets/images/Pile_of_books.jpg" />
            </div>
            <div className="slideshow-images">
              <img src="/assets/images/private_library.jpg" />
            </div>
            <div className="slideshow-images">
              <img src="/assets/images/images.jpeg" />
            </div>
            <div className="slideshow-images">
              <img src="/assets/images/o-PILE-OF-BOOKS-facebook.jpg" />
            </div>
            <div className="slideshow-images">
              <img src="/assets/images/Pile_of_books.jpg" />
            </div>
            <div className="slideshow-images">
              <img src="/assets/images/private_library.jpg" />
            </div>
          </div>
        </div>
        <div className="home-footer">
          Site created and maintained by John Mauran {"\n"}
          <br/>
          2018
        </div>
      </div>
      </div>
    )
  }
}

HomePage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default HomePage;
