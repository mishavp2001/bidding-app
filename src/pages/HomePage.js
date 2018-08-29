import React, { Component } from 'react';
import { Link } from 'react-router';
import _ from 'underscore';
import { login, logout, isLoggedIn } from '../services/AuthService';
import moment from 'moment';
import Nav from '../components/Nav';
import Bid from '../components/Bid';
import { getProjectsData } from '../services/projects-api';

class HomePage extends Component {

  constructor() {
    super();
    this.projects = [];
    this.state = {
                  projects: [],
                  loggedin: true,
                  user: {
                      id: 1,
                      name: "michael",
                      email: "mishavp2001@yahoo.com"
                  }
                };
  }

  getProjects() {
    //Get static response for 100 recent projects
    getProjectsData().then((projects) => {
      this.projects = this.projects.concat(projects);
      this.setState(
        { projects: projects}
      );
    });
  }

  handleClose = (id)=> {
    this['project_' + id].hidden = true;
  }

  renderHideButton = (id) => {
    return (
        <span className="btn btnDismiss" onClick={ () => this.handleClose(id)}>Hide</span>
    )
  }

  filterProjects = (search) => {
    this.setState(
      { projects: this.projects.filter(project => (project.project.indexOf(search) !== -1) || (project.details.indexOf(search) !== -1) )}
    );
  }

  componentDidMount() {
    this.getProjects();
  }

  render() {
    const { projects, user } = this.state;
    return (
      <div>
        <Nav />
        <h3 className="text-center">Projects available to bid on</h3>
        <Search filterProjects={this.filterProjects}/>
        <hr/>
        <div className="mainContainer">
          { projects.map((project, index) => (
                <div className="col-sm-12" key={index} ref={(elm) => { this['project_' + project.id] = elm }} >
                  <div className="panel panel-primary">
                    <div className="panel-heading">
                        <span className="btn">#{ project.id } - </span>
                        <span>{ project.project }</span>
                        {this.renderHideButton(project.id)}
                    </div>
                    <div className="panel-body" >
                      <p> { project.details } </p>
                      <p>Expires: {project.date} </p>
                      <p className="winning-bid">Wining bid: ${project.minbid.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} </p>

                      <Bid key={index}
                           projectid={project.id}
                           date={project.date}
                           user={user}
                           loggedin={this.state.loggedin} />
                  </div>
                  </div>
                </div>
            ))}
        </div>
        <div className="col-sm-12">
          <div className="jumbotron text-center">
          </div>
        </div>
      </div>
    );
  }
}

class Search extends Component {
  constructor(props){
      super(props);
  }

  onChange = (event)=> {
    console.log("Search:" + this.refs.search.value);
    this.props.filterProjects(this.refs.search.value);
  }

  render () {
    return (
        <input ref="search" onChange={this.onChange.bind(this)} type="text" placeholder="Search projects"></input>
    )
  }
}


export default HomePage;
