import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './pages/HomePage';
import UserProjects from './pages/UserProjects';
import Callback from './components/Callback';
import {HashRouter, Route} from 'react-router-dom';
import { requireAuth } from './services/AuthService';
import "./App.css";

const App = () => {
  return (
    <div className="container">
      <HashRouter>
        <Route path="/" component={HomePage}/>
      </HashRouter>
    </div>
  )
}

export default App;
