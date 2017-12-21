'use strict';

import React, { PropTypes } from 'react';
import auth0 from 'auth0-js';
import Auth from '../app/auth';

class AuthSilent extends React.Component {
    constructor () {
        super(...arguments);
        const webAuth = new Auth(this.props.router);
        webAuth.authSdk.parseHash(window.location.hash, (err, response) => {
            parent.postMessage(err || response, `${window.location.origin}/auth`);
        });
        // this.webAuth = new auth0.WebAuth({
        //     domain: 'generictest35.auth0.com',
        //     clientID: 'mufc9w7SiOb3A5SbxEAQgGJtwJgwsya9',
        //     scope: 'openid profile',
        //     responseType: 'token id_token',
        //     redirectUri: `${window.location.origin}/auth`
        // });
        // this.webAuth
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
