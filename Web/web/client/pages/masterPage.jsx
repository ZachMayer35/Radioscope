'use strict';

import React, { PropTypes } from 'react';
import Nav from './components/nav';

class MasterPage extends React.Component {
    render () {
        const { location, children } = this.props;  
        return (
            <div className='container-fluid'>
              <div className='row'>
                <div className='col-xs-12'>
                    <h1>{children.type.pageName}</h1>
                </div>
              </div>
              <div className='row'>
                <div className='col-sm-3 text-center'>
                    <Nav currentPath={location.pathname} />
                </div>
                <div className='col-sm-9'>
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
