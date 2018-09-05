import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import "../css/project.css";

export default class Projects extends Component{
    static propTypes = {
        showModal: PropTypes.bool,
        sort: PropTypes.string,
        url: PropTypes.string,
        projectssResp: PropTypes.array,
        sortBy: PropTypes.func
    };

    constructor(props) {
    super(props);
    this.state = {
        showModal: false,
        url: '',
        sort: 'left'
    }
    }

    // Function for opening modal dialog
    openModal = (project, e) => {
       this.setState({
         showModal: true,
         details: project
       })
     };

    // Function for closing modal dialog
    closeModal = () => {
      this.setState({
        showModal: false,
        details: ''
      })
    }

  render() {
    const {projects=[], sortBy, sortedBy} = this.props;
    return(
      <div className='container-fluid project-container'>
        <span>Sort:</span>
        <span className={`sortLink ${(sortedBy==='minbid') ? 'selected':''}`} onClick={(e) => sortBy('minbid', e)} >Amount</span>
        <span className= {`sortLink ${(sortedBy==='left') ? 'selected':''}`} onClick={(e) => sortBy('left', e)} >Time</span>

        <div className='row'>
          {
            projects.map((prj, index) => {
               const {id, project, details,  minbid, left} = prj;
               return <div key={id + "-" + index}  className='col-sm-12'>
                  <div className='project-card' onClick={(e) => this.openModal(prj, e)}>
                      <p>{id} - {project}</p>
                      <p>{details}</p>
                      <p>Amount: {minbid} Time: {moment(left).format()}</p>
                  </div>
                </div>
             })
           }
        </div>

        <ProjectsModal details={this.state.details} isopen={this.state.showModal} onClick={this.closeModal} />
      </div>
    )
  }

}


class ProjectsModal extends Component {
  render() {
    if (this.props.isopen === false) {
      return null;
    }
    const {id, project, email, minbid, left, details } = this.props.details;
    return(
      <div className='modal-overlay' onClick={this.props.onClick} name={this.props.name}>
        <div className='modal-body'>
            <a className='modal-close' href='#' onClick={this.props.onClick}><span className='fa fa-times'></span></a>
                <p>ID: {id}</p>
                <p>Project: {project}</p>
                <p>Contact email: {email}</p>
                <p>{details}</p>
                <p>Bid: {minbid}</p>
                <p>Time: {left}</p>
      </div>
      </div>
    )
  }
}
