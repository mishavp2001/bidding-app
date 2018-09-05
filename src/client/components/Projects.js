import React, { Component } from "react";
import PropTypes from "prop-types";
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
        sort: 'movieId'
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
        <span className={`sortLink ${(sortedBy==='amount') ? 'selected':''}`} onClick={(e) => sortBy('amount', e)} >Amount</span>
        <span className= {`sortLink ${(sortedBy==='time') ? 'selected':''}`} onClick={(e) => sortBy('time', e)} >Time</span>

        <div className='row'>
          {
            projects.map((prj, index) => {
               const {id, project, details} = prj;
               return <div key={id + "-" + index}  className='col-sm-12'>
                  <div className='project-card' onClick={(e) => this.openModal(prj, e)}>
                      <span className="col-sm-6">{project}</span>
                      <span className="col-sm-3">{id}</span>
                      <span className="col-sm-2">{details}</span>
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
    const {id, project, email, amount, time, details, bids } = this.props.details;
    return(
      <div className='modal-overlay' onClick={this.props.onClick} name={this.props.name}>
        <div className='modal-body'>
            <a className='modal-close' href='#' onClick={this.props.onClick}><span className='fa fa-times'></span></a>
            <p>
              <span className="col-sm-6">ID</span>
              <span className="col-sm-6">{id}</span>
            </p>
            <p>
              <span className="col-sm-6">Project</span>
              <span className="col-sm-6">{project}</span>
            </p>
            <p>
              <span className="col-sm-6">Contact email</span>
              <span className="col-sm-6">{email}</span>
            </p>
            <p>
              <span className="col-sm-6">details</span>
              <span className="col-sm-6">{details}</span>
            </p>
      </div>
      </div>
    )
  }
}
