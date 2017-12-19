'use strict';

import React, { PropTypes } from 'react';
import auth0 from 'auth0-js';

class AuthSilent extends React.Component {
    constructor () {
        super(...arguments);
        this.webAuth = new auth0.WebAuth({
            domain: 'generictest35.auth0.com',
            clientID: 'mufc9w7SiOb3A5SbxEAQgGJtwJgwsya9',
            scope: 'openid profile',
            responseType: 'token id_token',
            redirectUri: 'http://localhost:8080/auth'
        });
        this.webAuth.parseHash(window.location.hash, (err, response) => {
            parent.postMessage(err || response, 'http://localhost:8080/auth');
        });
    }
    render () {
        return (<div/>);
    }
    getChildContext () {
        return { location: this.props.location };
    }
}
AuthSilent.pageName = 'AuthSilent';

// Get the location props from the parent context.
AuthSilent.childContextTypes = {
    location: React.PropTypes.object
};

export default AuthSilent;
