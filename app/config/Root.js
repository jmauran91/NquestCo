import React from 'react';
import { BrowserRouter as Router, Route, Switch, browserHistory } from 'react-router-dom';
import HomePage from '../components/HomePage';
import LoginPage from '../containers/LoginPage';
import SignUpPage from '../containers/SignUpPage';
import LogoutSwitcher from '../components/LogoutSwitcher';
import IndexSwitcher from '../components/IndexSwitcher';
import NavSwitcher from '../components/nav/NavSwitcher';
import ProjectPage from '../containers/ProjectPage';
import ProfilePage from '../components/ProfilePage';
import ProjectFiles from '../components/ProjectFiles';
import Dashboard from '../components/Dashboard';
import Base  from '../components/nav/Base';
import Auth from '../modules/Auth';
import history from '../history';


const Root = () => {
    return (
      <Router history={browserHistory} >
        <div>
          <NavSwitcher />
          <Route path="/" exact component={IndexSwitcher} />
          <Route path="/:id" exact component={Dashboard} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/logout" component={LogoutSwitcher}/>
          <Route path="/profile/:id" exact component={ProfilePage} />
          <Route path="/project/:id" exact component={ProjectPage} />
        </div>
      </Router>
    );
}

export default Root;
