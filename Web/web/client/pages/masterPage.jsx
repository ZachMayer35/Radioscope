'use strict';

import { Link } from 'react-router';
import React, { PropTypes } from 'react';

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
                    <div className='panel panel-default'>
                      <ul className='list-group'>
                        <Link className={this.navItemClass('/')} to='/'>
                          Home
                        </Link>
                        <Link className={this.navItemClass('/Foo')} to='/Foo'>
                          Foo
                        </Link>
                        <Link className={this.navItemClass('/Bar')} to='/Bar'>
                          Bar
                        </Link>
                      </ul>
                    </div>
                </div>
                <div className='col-sm-9'>
                    {this.props.children}
                </div>
              </div>
            </div>
        );
    }
    navItemClass (path) {
      let name = 'list-group-item';
      if (this.props.location.pathname === path) {
        name += ' active';
      }
      return name;
    }
}

MasterPage.propTypes = {
  location: PropTypes.any
};

export default MasterPage;
