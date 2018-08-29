import React, { Component } from 'react';
import moment from 'moment';

class TimeLeft extends Component {
  constructor (props) {
      super(props);
      this.state = {
          now: moment.utc()
      }
      this.getTimeNow.bind(this);
  }

  getTimeNow = ()=> {
    this.timer = setInterval(() => {
        this.setState({ now: moment.utc() });
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
    let diff = moment.duration(moment(this.props.date).diff(now));

    let duration = [ parseInt(diff.asHours()) + "H", diff.minutes() + "M", diff.seconds() + "S"].join(':');
    console.log(duration.toString());
    //if(duration.days() > 30 ) {
    //  duration = duration.format('D[ Days] H[ hour(s)] m[ minute(s)] s[ second(s) ago.]')
    //} else {
    //  duration = "> 1 month";
    //}
    return (
          <p>Time left: { duration}</p>
    );
  }
}

export default TimeLeft;
