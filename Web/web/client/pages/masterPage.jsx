'use strict';

import React, { PropTypes } from 'react';
import Nav from './components/nav';
import AuthWidget from '../app/combiners/auth-widget';


class MasterPage extends React.Component {
  render () {
    const { location, children,  } = this.props;
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-xs-12 header text-center'>
            <h1>Radioscope</h1>           
          </div>
          <div className='col-xs-12 header text-center'>
            <AuthWidget {...this.props} />
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-3 text-center'>
            <Nav currentPath={location.pathname} />
          </div>
          <div className='col-sm-9'>
            <h2 style={{ marginTop: '0px' }}>{children && children.type ? children.type.pageName : ''}</h2>
            {children}
          </div>
        </div>
      </div>
    );
  }
}

MasterPage.propTypes = {
  location: PropTypes.any
};

export default MasterPage;
