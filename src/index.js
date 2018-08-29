import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './pages/HomePage';
import Profile from './pages/Profile';
import UserProjects from './pages/UserProjects';
import Callback from './components/Callback';
import { Router, Route, browserHistory } from 'react-router';
import { requireAuth } from './services/AuthService';
import "./App.css";

const Root = () => {
  return (
    <div className="container">
      <Router history={browserHistory}>
        <Route path="/" component={HomePage}/>
        <Route path="/profile" component={Profile} onEnter={requireAuth}/>
        <Route path="/myprojects" component={UserProjects} />
        <Route path="/callback" component={Callback} />
      </Router>
    </div>
  )
}


ReactDOM.render(<Root />, document.getElementById('root'));
