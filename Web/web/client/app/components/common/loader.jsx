'use strict';

import React, { PropTypes, Component } from 'react';

class Loader extends Component {
  render () {
    if (this.props.loading) {
      return (
        <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ resize: 'both' }} className='loader'>
          </div>
        </div>
      );
    } else {
      return this.props.element;
    }
  }
}

Loader.propTypes = {
  loading: PropTypes.bool.isRequired,
  element: PropTypes.element.isRequired
};

export default Loader;
