import React from 'react';
import { BrowserRouter as Router, Route, Switch, browserHistory } from 'react-router-dom';
import HomePage from '../components/HomePage';
import LoginPage from '../containers/LoginPage';
import SignUpPage from '../containers/SignUpPage';
import LogoutSwitcher from '../components/LogoutSwitcher';
import IndexSwitcher from '../components/IndexSwitcher';
import NavSwitcher from '../components/nav/NavSwitcher';
import ProjectPage from '../containers/ProjectPage';
import ProjectFiles from '../components/ProjectFiles';
import Base  from '../components/nav/Base';
import Auth from '../modules/Auth';
import history from '../history';

const Root = () => {
    return (
      <Router history={browserHistory} >
        <div>
          <NavSwitcher />
          <Route path="/" exact component={IndexSwitcher} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/logout" component={LogoutSwitcher}/>
          <Route path="/project/:id" exact component={ProjectPage} />
          <Route path="/project/:id/files" exact component={ProjectFiles} />
        </div>
      </Router>
    );
}

export default Root;
