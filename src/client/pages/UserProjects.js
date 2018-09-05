import React, { Component } from "react";
import Projects from "../components/Projects";
import { getProjectsData } from '../services/projects-api';

const DEFAULT_SORT = "id";

export default class UserProjects extends Component {
  constructor(props) {
    super(props);
    this.projects = [];
    this.state = { projects: null, sortedBy: DEFAULT_SORT };
  }

  componentDidMount() {
    //API call
    this.getProjects();
  }

  getProjects() {
    //Get static response for users recent projects
    getProjectsData().then((projects) => {
      this.projects = this.projects.concat(projects);
      this.setState(
        { projects: projects}
      );
    });
  }

  sortBy = (sort, e) => {
    //Call back to set state to sorted movies by sort parameter
    e.preventDefault();
    e.stopPropagation();
    if(!sort){return false};
    const projectsSorted = this.state.projects.sort((a, b) => (a[sort] > b[sort]) ? 1 : ((b[sort] > a[sort]) ? -1 : 0))
    this.setState(
      {projects: projectsSorted, sortedBy: sort}
    )
  }

  render() {
    return (
      <div className="gallery-container">
        <h1>My projects</h1>
        {this.state.projects ? (
          <Projects projects={this.state.projects} sortedBy={this.state.sortedBy} sortBy={this.sortBy}/>
        ) : (
          <h1>Loading.. please wait!</h1>
        )}
      </div>
    );
  }
}
