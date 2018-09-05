import React, { Component } from 'react';
import { Link } from 'react-router';
import _ from 'underscore';
import { login, logout, isLoggedIn } from '../services/AuthService';
import moment from 'moment';
import Nav from '../components/Nav';
import Bids from '../components/Bids';
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

  showExpired = (show) => {
    let filtered;
    if(show) {
      filtered = this.projects;
    } else {
      filtered = this.projects.filter(project => ( moment.duration(moment.utc().diff(moment(project.date))) < 0));
    }
    this.setState(
      { projects: filtered}
    );
  }

  setMinBid = (minbid) => {
    this.setState(
      { minBid: minbid}
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
        <Search filterProjects={this.filterProjects} showExpired={this.showExpired.bind(this)}/>
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

                      <Bids key={index}
                           projectid={project.id}
                           date={project.date}
                           setMinBid={this.setMinBid}
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
      this.state = {
        showexpired: true
      }
      this.showExpired.bind(this);
      this.onChange.bind(this);
  }

  onChange = (event)=> {
    event.stopPropagation();
    event.preventDefault();
    //console.log("Search:" + this.refs.search.value);
    this.props.filterProjects(this.refs.search.value);
  }

  showExpired = (event)=> {
    this.props.showExpired(!this.state.showexpired);
    this.setState({showexpired: !this.state.showexpired});
  }

  render () {
    return (
        <div className="searchBox">
          <input ref="search" onChange={this.onChange} type="text" placeholder="Search projects"></input>
          <input ref="showexpired" type="checkbox" checked={this.state.showexpired}  onChange={this.showExpired} />
          <label htmlFor="showexpired">Show expired</label>
        </div>
    )
  }
}


export default HomePage;
