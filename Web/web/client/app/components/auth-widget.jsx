'use strict';

import React, { PropTypes, Component } from 'react';
import Auth from '../auth';

const auth = new Auth();

class AuthWidget extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
    }
    login() {
        localStorage.setItem('authRedirect', this.props.location.pathname);
        auth.login()
    }
    render() {
        const { idToken, expiresAt, loading } = this.props;
        return idToken && !loading ? <a href='#' onClick={auth.logout}>Logout</a> : <a href='#' onClick={this.login}>Login</a>
    }
}

export default AuthWidget;