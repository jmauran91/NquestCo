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
          <Switch>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/signup" component={SignUpPage} />
            <Route exact path="/logout" component={LogoutSwitcher}/>
            <Route exact path="/project/:id" component={ProjectPage} />
            <Route exact path="/profile/:id" component={ProfilePage} />
            <Route exact path="/:id" component={Dashboard} />
            <Route exact path="/" component={IndexSwitcher} />
          </Switch>
        </div>
      </Router>
    );
}

export default Root;
