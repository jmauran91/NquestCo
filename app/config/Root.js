import React from 'react';
import { BrowserRouter as Router, Route, Switch, browserHistory } from 'react-router-dom';
import LoginPage from '../containers/LoginPage';
import SignUpPage from '../containers/SignUpPage';
import LogoutSwitcher from '../components/LogoutSwitcher';
import IndexSwitcher from '../components/IndexSwitcher';
import NavSwitcher from '../components/nav/NavSwitcher';
import ProjectPage from '../containers/ProjectPage';
import ProjectGuestPage from '../containers/ProjectGuestPage';
import ProfilePage from '../components/ProfilePage';
import Dashboard from '../components/Dashboard';
import AdminPage from '../components/AdminPage';
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
            <Route exact path="/admin" component={AdminPage} />
            <Route exact path="/project/:id/read" component={ProjectGuestPage} />
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
