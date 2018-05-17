import React from 'react';
import HomePage from './HomePage';
import Dashboard from './Dashboard';
import Auth from '../modules/Auth';
import Fetch from '../modules/Fetch';
import PropTypes from 'prop-types';


class IndexSwitcher extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      current_user: {}
    }

    this.getCurrentUser = Fetch.GetCurrentUser.bind(this);

  }

  componentDidMount(){
    if(localStorage.getItem('token') !== null && localStorage.getItem('token') != 'undefined') {
      this.getCurrentUser().then((response) => {
        this.setState({ current_user: response },  () => {
          this.context.router.history.push(`/${this.state.current_user._id}`)
        })
      })
    }
  }

  render(){

    return(
      <div>
        {localStorage.getItem('token') == null && <HomePage />}
      </div>
    )
  }
};


IndexSwitcher.contextTypes = {
  router: PropTypes.object.isRequired
};

export default IndexSwitcher;
