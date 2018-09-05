import React, { Component } from "react";

export default class NewProject extends Component {
  render() {
    return (
       <Form />
    );
  }
}

class Form extends React.Component {
  render () {
    return (
      <form action="/" method="post">
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Email" />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputFile">File input</label>
          <input type="file" id="exampleInputFile" />
          <p className="help-block">Example block-level help text here.</p>
        </div>
        <div className="checkbox">
          <label>
            <input type="checkbox" />Check me out
          </label>
        </div>
        {/* render the button component! */}
        <Button />
        <hr />
      </form>
    );
  }
};

class Button extends React.Component {

  handleClick(e) {
    e.preventDefault();
    alert("your form was submitted!");
  }

  render () {
    return (
      <button type="submit" className="btn btn-default"
              onClick={this.handleClick}>
        Submit
      </button>
    );
  }
};

////////////////////////////////////////////////////////////////////
class Input extends React.Component {

  getInitialState () {
    return { userInput: '' };
  }

  handleUserInput (e) {
    this.setState({ userInput: e.target.value });
  }

  render () {
    return (
      <div className="form-group">
        <label>Type yo comments in heeya!</label><br />
        <input type="text"
               className="form-control"
               onChange={this.handleUserInput}
               value={this.state.userInput} />
        <h3>{this.state.userInput}</h3>
      </div>
    );
  }
};
