import React, { Component } from 'react';
import { Link } from 'react-router';
import { Panel } from 'react-bootstrap';
import moment from 'moment';
import socketIOClient from "socket.io-client";
import TimeLeft from "./TimeLeft";
import { getBidsData } from '../services/projects-api';

import _ from 'underscore';
import { login, logout } from '../services/AuthService';
import '../App.css';

class Bid extends Component {
  constructor (props) {
      super(props);
      this.state = {
          showBids: false,
          bids: []
      }
      this.getBids.bind(this);
      this.stopBids.bind(this);
  }

  showBids = (event) => {
      event.preventDefault();
      this.state.showBids ? this.stopBids() : this.getBids() ;
      this.setState({showBids: !this.state.showBids});
  }

  setExpired = () => {
      this.setState({expired: true});
  }

  sendBid = () => {
    const userBid = {
      id: this.refs.id.innerText,
      email:this.refs.user.innerText,
      amount: this.refs.amount && this.refs.amount.value,
      time: this.refs.time && this.refs.time.value
    };
    //Remove existing bid
    const bids = this.state.bids.filter((bid)=>{return bid.id != userBid.id});
    this.setState(
        {bids: _.sortBy(bids.concat([userBid]), "amount"),
        submited: true}
    )
  }

  getBids() {
      if (this.state.expired) {
        this.stopBids();
        return;
      }
      this.socket = socketIOClient('http://localhost:8080/');
      this.socket.on('disconnect', () => {
          this.stopBids();
      });
      this.socket.on('connect',  () => {
        //console.log("Socket Connected " + this.props.projectid);
        let projectroom =  "project" + this.props.projectid;
        //console.log("Emit get bids message for project id" + this.props.projectid);
        this.socket.emit('bids', projectroom);
        this.socket.on("bids", bids => {
          if(!this.props.search){
              let sortbid = _.sortBy(bids.concat(this.state.bids).slice(0, 50), "amount");
              this.setState({ bids: sortbid});
              this.props.setMinBid(sortbid[0].amount);
          }
        });
      });
  }

  componentWillUnmount () {
    this.stopBids();
  }

  stopBids() {
      const projectroom =  "project" + this.props.projectid;
      this.socket.emit("stop", projectroom);
      this.socket.off("bids");
      this.socket.removeAllListeners("bids");
  }

  componentDidMount() {
      this.getBids();
      this.stopBids();
  }

  render() {
    const nextBidId = this.state.bids && this.state.bids.length + 1;
    const { now } = this.state;
    let   userBidAmt = 0,
          userBidId = nextBidId,
          userBidTime = 0;
    const bidsLink = this.state.showBids ?  "Close" : "Show Bids";
    const winingBid = this.state.bids[0] && this.state.bids[0].amount;
    const winingUser = this.state.bids[0] && this.state.bids[0].email;

    //.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    return (
      <div>
          <TimeLeft date={this.props.date} setExpired={this.setExpired}/>
          <p className="winning-bid">Wining bid: ${winingBid}  User: {winingUser} </p>
          <a href="#" className="log" onClick={(event) => this.props.loggedin ? this.showBids(event) : login(event)}>{bidsLink}</a>
            { this.state.showBids &&
              <Panel expanded={this.state.showBids} onToggle={()=>{this.showBids(event)}}>
                <Panel.Collapse>
                <Panel.Body>
                  <div className="bids-modal" >
                      <h1>Current Bids:</h1>
                      <div className="row">
                            <span className="col-sm-1">#</span>
                            <span className="col-sm-6">User</span>
                            <span className="col-sm-3">Amount</span>
                            <span className="col-sm-2">Time</span>
                      </div>
                      {this.state.bids && this.state.bids.map( (bid, index) => {
                            if (this.props.user.email === bid.email) {
                                userBidId = bid.id;
                                userBidAmt = bid.amount;
                                userBidTime = bid.time;
                            }
                            return <div className={`row ${(this.props.user.email === bid.email) && "current-bid"}`} key={index}>
                                <span className="col-sm-1">{index + 1}</span>
                                <span className="col-sm-6">{bid.email}</span>
                                <span className="col-sm-3">{bid.amount}</span>
                                <span className="col-sm-2">{bid.time}</span>
                              </div>

                      })}
                      <h1>Your Bid:</h1>
                      <div className="row current-bid">
                          <span className="col-sm-1">*</span>
                          <span ref="user" className="col-sm-6">{this.props.user.email}</span>
                          <input ref="amount" type="text" className="col-sm-3" defaultValue={userBidAmt}></input>
                          <input ref="time" type="text" className="col-sm-2" defaultValue={userBidTime}></input>
                          <span ref="id" className="hidden">{userBidId}</span>
                      </div>
                      {!this.state.expired && <button className="btn btn-info log" onClick={() => this.props.loggedin ?  this.sendBid() : login()}>Send Bid</button>}
                    </div>
                </Panel.Body>
              </Panel.Collapse>
              </Panel>
            }
      </div>
    );
  }
}

export default Bid;
