'use strict';

import React from 'react';
import Loader from '../app/components/common/loader';
import Auth from '../app/auth';

class AuthPage extends React.Component {
    constructor () {
        super(...arguments);
        this.auth = new Auth(this.props.router);
    }
    render () {
        return (
            <Loader loading={true} element={<div />} />
        );
    }
    getChildContext () {
        return { location: this.props.location };
    }
}
AuthPage.pageName = 'Auth';

// Get the location props from the parent context.
AuthPage.childContextTypes = {
    location: React.PropTypes.object
};


export default AuthPage;
