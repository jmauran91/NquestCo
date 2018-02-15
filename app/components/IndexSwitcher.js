import React from 'react';
import HomePage from './HomePage';
import Dashboard from './Dashboard';
import Auth from '../modules/Auth';

class IndexSwitcher extends React.Component {
  constructor(props){
    super(props);

  }

  render(){
    return(
      <div>
        {localStorage.getItem('token') !== null ? <Dashboard /> : <HomePage />}
      </div>
    )
  }
}
export default IndexSwitcher;
