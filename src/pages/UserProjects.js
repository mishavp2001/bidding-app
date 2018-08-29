import React, { Component } from "react";
import Projects from "../components/Projects";
import socketIOClient from "socket.io-client";

const DEFAULT_SORT = "id";

export default class UserProjects extends Component {
  constructor(props) {
    super(props);
    this.state = { movies: null, sortedBy: DEFAULT_SORT };
  }

  componentDidMount() {
    //API call
    this.getProjects();
  }

  getProjects() {
    const socket = socketIOClient('http://localhost:8080/');
    socket.on('connect', () => {
      //console.log("Socket Connected");
      socket.emit('projects', "Load");
      socket.on("projects", projects => {
        //Time out to show asynchronious behavier
        setTimeout(() => { this.setState({ projects: projects })}, 1000);
      });
    });
    socket.on('disconnect', () => {
      socket.off("projects")
      socket.removeAllListeners("projects");
      //console.log("Socket Disconnected");
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
