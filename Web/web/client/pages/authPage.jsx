'use strict';

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Auth from '../app/auth';
import Loader from '../app/components/common/loader';

const auth = new Auth();

const handleAuthentication = (nextState) => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
        auth.handleAuthentication();
    }
}

class AuthPage extends React.Component {
    componentWillMount() {
        handleAuthentication(this.props);
    }
    render () {
        const { location, loading } = this.props;
        this.redirect = this.redirect || window.localStorage.getItem('authRedirect') || '/';
        window.localStorage.removeItem('authRedirect');
        if(this.redirect && !loading) {
            this.props.router.replace(this.redirect);
        }
        return (
            <Loader loading={loading} element={<div />} />
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

const mapStateToProps = (state, props) => {
  return { ...state.user, _props: props };
};

export default connect(mapStateToProps)(AuthPage);
