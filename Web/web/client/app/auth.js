import auth0 from 'auth0-js';
//import { AUTH_CONFIG } from './auth0-variables';
import store from './store';
import * as userActions from './actions/user-actions';
import axios from 'axios';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'generictest35.auth0.com', //AUTH_CONFIG.domain,
    clientID: 'mufc9w7SiOb3A5SbxEAQgGJtwJgwsya9', //AUTH_CONFIG.clientId,
    redirectUri: 'http://localhost:8080/auth', //AUTH_CONFIG.callbackUrl,
    audience: `https://generictest35.auth0.com/userinfo`,
    responseType: 'token id_token',
    scope: 'openid profile'
  });

  constructor () {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  login () {
    this.auth0.authorize();
  }

  handleAuthentication () {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        console.log(err);
      }
    });
  }

  setSession (authResult) {
    // Set the time that the access token will expire at
    let expiresAt = authResult.expiresAt || JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    axios.post(`${global.API_PATH}/user/createUpdate`, 
                authResult, 
                { headers: { 'Authorization': `Bearer ${authResult.idToken}`}}).then(res => {
        store.dispatch(userActions.login({
            ...authResult,
            profile: res.data.profile,
            expiresAt
        }));
    });
  }

  logout () {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    
    store.dispatch(userActions.logout());
  }

  isAuthenticated () {
    // Check whether the current time is past the 
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return expiresAt ? new Date().getTime() < expiresAt : false;
  }

  checkSession () {
    this.auth0.renewAuth({
      domain: 'generictest35.auth0.com', //AUTH_CONFIG.domain,
      clientID: 'mufc9w7SiOb3A5SbxEAQgGJtwJgwsya9', //AUTH_CONFIG.clientId,
      audience: 'https://generictest35.auth0.com/userinfo',
      redirectUri: 'http://localhost:8080/authSilent',
      usePostMessage: true
    }, (err, authResult) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(authResult);
      this.setSession(authResult);
    });
  }
}