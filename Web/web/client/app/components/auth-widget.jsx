'use strict';

import React, { PropTypes, Component } from 'react';
import Auth from '../auth';
import fetch from 'isomorphic-fetch';
import '../../assets/components/profile.less';

const auth = new Auth();

class AuthWidget extends Component {
    constructor (props) {
        super(props);
        this.login = this.login.bind(this);
        this.checkId = this.checkId.bind(this);
        this.getProfile = this.getProfile.bind(this);
    }
    login () {
        localStorage.setItem('authRedirect', this.props.location.pathname);
        auth.login()
    }
    checkId () {
        const {idToken} = this.props;
        fetch(`${global.API_PATH}/user/id`, { headers: { queuename: '/User/Id/', authorization: `bearer ${idToken}` }})
            .then((response) => response.json())
            .then((response) => alert(JSON.stringify(response)));
    }
    getProfile () {
        const { idToken } = this.props;
        fetch(`${global.API_PATH}/user/profile`, { headers: { queuename: '/User/Profile/', authorization: `bearer ${idToken}` }})
            .then((response) => response.json())
            .then((response) => alert(JSON.stringify(response)));
    }
    checkSession () {
        auth.checkSession();
    }
    render() {
        const { idToken, expiresAt, loading, profile } = this.props;
        return (
            <div>
                {idToken && !loading && 
                    <div>
                        <div className='block'>
                            <div className='profile' onClick={this.getProfile}>
                                {profile && profile.picture && <img src={profile.picture} className={profile && profile.picture ? 'picture-show' : 'picture-hide'}/>}
                            </div>
                        </div>
                        <a href='#' onClick={auth.logout}>Logout</a>
                        <br/>
                        <a href='#' onClick={this.checkId}>Get User Id</a>
                        <br />
                        <a href='#' onClick={this.getProfile}>Get User Profile</a>
                        <br/>
                        <a href='#' onClick={this.checkSession}>Check Session</a>
                     </div>
                }
                {(!idToken || loading) && <a href='#' onClick={this.login}>Login</a>}
            </div>
        );
    }
}

export default AuthWidget;