import React from 'react';
import Fetch from '../modules/Fetch';
import Auth from '../modules/Auth';
import PropTypes from 'prop-types';

class AboutPage extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      message: ''
    }

  }

  componentWillMount(){
  }

  componentWillUpdate(){
  }

  render(){
    return(
      <div className="about-master">
        <h1> About </h1>
        <br />
        <div> This site is created and maintained by John Mauran</div>
        <div> contact at: johnmauran1@gmail.com </div>
      </div>
    )
  }
}


export default AboutPage
