import React, { Component } from 'react';
import moment from 'moment';

class TimeLeft extends Component {
  constructor (props) {
      super(props);
      this.state = {
          now: moment.utc(),
          timeleft: 0,
          expired: false
      }
      this.getTimeNow.bind(this);
  }

  getTimeNow = ()=> {
    this.timer = setInterval(() => {
        const now = moment.utc();
        const diff = moment.duration(moment(this.props.date).diff(now));
        const timeleft = [ parseInt(diff.asHours()) + "H", diff.minutes() + "M", diff.seconds() + "S"].join(':');
        const expired = diff.asHours() < 0;
        if (expired) {
          this.props.setExpired();
        }
        this.setState({ now: now,
                        timeleft: timeleft,
                        expired: expired
                        });
      }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  componentDidMount() {
    this.getTimeNow();
  }

  render() {
    const { now } = this.state;
    let elm;

    if (this.state.expired) {
        elm = <p>Auction is finished</p>
    } else {
        elm = <p>Time left: { this.state.timeleft }</p>
    }
    return (
      <div>
           {elm}
      </div>
    );
  }
}

export default TimeLeft;
