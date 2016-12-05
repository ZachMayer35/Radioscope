'use strict';

import React, { PropTypes } from 'react';
import Nav from './components/nav';

class MasterPage extends React.Component {
    render () {
        return (
            <div className='container-fluid'>
              <div className='row'>
                <div className='col-xs-12'>
                    <h1>{this.props.children.type.pageName}</h1>
                </div>
              </div>
              <div className='row'>
                <div className='col-sm-3 text-center'>
                    <Nav currentPath={this.props.location.pathname} />
                </div>
                <div className='col-sm-9'>
                    {this.props.children}
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
