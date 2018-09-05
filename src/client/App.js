import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './pages/HomePage';
import UserProjects from './pages/UserProjects';
import NewProject from './pages/NewProject';
import Nav from './components/Nav';
import Callback from './components/Callback';
import {HashRouter, Switch, Route} from 'react-router-dom';
import { requireAuth } from './services/AuthService';
import "./App.css";

const App = () => {
  return (
    <div className="container">
      <Nav />
      <main>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route path="/myprojects" component={UserProjects} />
          <Route path="/newproject" component={NewProject} />
        </Switch>
      </main>
    </div>
  )
}

export default App;
