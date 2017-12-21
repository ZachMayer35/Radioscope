'use strict';

import Auth0Lock from 'auth0-lock';
import Auth0 from 'auth0-js';
//import { AUTH_CONFIG } from './auth0-variables';
import store from './store';
import * as userActions from './actions/user-actions';
import axios from 'axios';

class Auth {
  authLock = new Auth0Lock(process.env.AUTH0_CLIENT_ID, process.env.AUTH0_DOMAIN, {
      oidcConformant: true,
      autoclose: true,
      auth: {
        redirectUrl: `${window.location.origin}/auth`,
        responseType: 'token id_token',
        params: {
            scope: 'openid profile'
        }
      }
  });

  authSdk = new Auth0.WebAuth({
    domain: process.env.AUTH0_DOMAIN, // || 'generictest35.auth0.com', //AUTH_CONFIG.domain,
    clientID: process.env.AUTH0_CLIENT_ID, //'mufc9w7SiOb3A5SbxEAQgGJtwJgwsya9', //AUTH_CONFIG.clientId,
    responseType: 'token id_token',
    scope: 'openid profile'
  });

  constructor (router) {
    this.router = router;
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.checkForAuth = this.checkForAuth.bind(this);
    this.checkSession = this.checkSession.bind(this);

    this.authLock.on('authenticated', (authResult) => {
      this.setSession(authResult);
    });
  }

  checkForAuth () {
    const authObj =  {
        accessToken: localStorage.getItem('access_token'),
        idToken: localStorage.getItem('id_token'),
        expiresAt: localStorage.getItem('expires_at')
    };
    if (authObj.idToken && authObj.accessToken && authObj.expiresAt) {
        if (authObj.expiresAt - Date.now() < 0){
            this.logout();
        }
        if (!store.getState().user.loggedIn) {
            this.setSession(authObj);
        }
    }
    return authObj;
  }

  login () {
    window.localStorage.setItem('authRedirect', window.location.pathname)
    this.authLock.show();
  }
  logout () {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    store.dispatch(userActions.logout());
  }

  setSession (authResult, updateProfile = true) {
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', authResult.expiresAt || JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime()));
    if (updateProfile) {
      axios.post(`${global.API_PATH}/user/createUpdate`, 
                  authResult, 
                  { headers: { 'Authorization': `Bearer ${authResult.idToken}`}}).then(res => {
          store.dispatch(userActions.login({
              ...authResult,
              profile: res.data.profile
          }));
          const redirect = window.localStorage.getItem('authRedirect');
          if (redirect && this.router) {
              window.localStorage.removeItem('authRedirect');
              this.router.replace(redirect);
          }
      });
    } else {
      store.dispatch(userActions.refresh({
        ...authResult
      }));
    }
  }

  checkSession () {
    return this.authSdk.renewAuth({
      //audience: `https://${process.env.AUTH0_DOMAIN}/userinfo`,
      redirectUri: `${window.location.origin}/authSilent`,
      usePostMessage: true
    }, (err, authResult) => {
      if (err) {
        console.log(err);
        this.logout();
      }
      console.log(authResult);
      this.setSession(authResult, false);
    });
  }
}

export default Auth;
