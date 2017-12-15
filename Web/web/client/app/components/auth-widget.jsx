'use strict';

import React, { PropTypes, Component } from 'react';
import Auth from '../auth';
import fetch from 'isomorphic-fetch';

const auth = new Auth();

class AuthWidget extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.checkId = this.checkId.bind(this);
    }
    login() {
        localStorage.setItem('authRedirect', this.props.location.pathname);
        auth.login()
    }
    checkId() {
        const {idToken} = this.props;
        fetch(`${global.API_PATH}/user/id`, { headers: { queuename: '/fibonacci/getUpToN/', authorization: `bearer ${idToken}`, credentials: 'same-origin' }})
            .then((response) => response.json())
            .then((response) => alert(JSON.stringify(response)));
    }
    render() {
        const { idToken, expiresAt, loading } = this.props;
        return (
            <div>
                {idToken && !loading && 
                    <div>
                        <a href='#' onClick={auth.logout}>Logout</a>
                        <br/>
                        <a href='#' onClick={this.checkId}>Get User Id</a>
                    </div>
                }
                {(!idToken || loading) && <a href='#' onClick={this.login}>Login</a>}
            </div>
        );
    }
}

export default AuthWidget;