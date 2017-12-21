'use strict';

import React, { PropTypes, Component } from 'react';
import fetch from 'isomorphic-fetch';
import '../../assets/components/profile.less';

class AuthWidget extends Component {
    constructor (props) {
        super(props);
        this.checkId = this.checkId.bind(this);
        this.getProfile = this.getProfile.bind(this);
    }
    checkId () {
        const { idToken } = this.props;
        fetch(`${global.API_PATH}/user/id`, { headers: { queuename: '/User/Id', authorization: `bearer ${idToken}` }})
            .then((response) => response.json())
            .then((response) => alert(JSON.stringify(response)));
    }
    getProfile () {
        const { idToken } = this.props;
        fetch(`${global.API_PATH}/user/profile`, { headers: { queuename: '/User/Profile', authorization: `bearer ${idToken}` }})
            .then((response) => response.json())
            .then((response) => alert(JSON.stringify(response)));
    }
    render() {
        const { loading, profile, loggedIn, auth } = this.props;
        return (
            <div>
                {loggedIn && !loading && 
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
                        <a href='#' onClick={auth.checkSession}>Check Session</a>
                     </div>
                }
                {(!loggedIn || loading) && <a href='#' onClick={auth.login}>Login</a>}
            </div>
        );
    }
}

export default AuthWidget;