'use strict';

import React, { PropTypes, Component } from 'react';

class ErrorMessage extends Component {
  constructor (props) {
    super(props);
  } 
  componentDidUpdate() {
    if (this.props.error) {
      setTimeout(() => { 
        document.getElementById(this.getName()).className += ' in';
        document.activeElement.blur();
      }, 10); // 10 to ensure the animation has a chance to kick in. i.e., don't set the class before the browser's repaint/flow fas finished.
    }
  }
  getName () {
    return this.props.name + '-error';
  }
  render() {   
    const { error, message, dismiss } = this.props;
    if (this.props.error) {
      return (
        <div className='modal fade show' id={this.getName()} tabIndex='-1' role='dialog'>
          <div className='modal-dialog' role='document'>
            <div className='modal-content'>
              <div className='modal-header'>
                <button type='button' className='close' onClick={(e) => (dismiss())} data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>
                <h4 className='modal-title'>Error: {error}</h4>
              </div>
              <div className='modal-body'>
                <p>{message.slice(message.indexOf('[') + 1, message.length - 1)}</p>
              </div>
            </div>
          </div>
        </div>
      )
    }
    return null;
  }
};

ErrorMessage.propTypes = {
  name: PropTypes.string,
  error: PropTypes.string,
  message: PropTypes.string,
  dismiss: PropTypes.func
}

export default ErrorMessage;
