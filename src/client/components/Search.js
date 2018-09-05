import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { login, logout, isLoggedIn } from '../services/AuthService';

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

export default Search;
