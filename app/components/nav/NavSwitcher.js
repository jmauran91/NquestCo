import React from 'react';
import Base from './Base';
import LogBase from './LogBase';
import PropTypes from 'prop-types';

class NavSwitcher extends React.Component{

  render(){
    return(
      <div className="navswitcher">
        {this.context.router.history.location.pathname == "/" ? <LogBase /> : <Base /> }
      </div>
    )
  }
}

NavSwitcher.contextTypes = {
  router: PropTypes.object.isRequired
};

export default NavSwitcher;
