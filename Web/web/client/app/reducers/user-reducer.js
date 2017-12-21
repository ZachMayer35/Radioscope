'use strict';

const actions = require('../actions/user-actions.js');

const initialState = {
    name: null,
    email: null,
    loggedIn: false,
    accessToken: null,
    idToken: null,
    expiresAt: null,
    loading: false
};

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.USER_LOGGING: 
            return {
                ...state,
                loading: true,
                loggedIn: false,
            }
        case actions.USER_LOGIN:
            return {
                ...state,
                loading: false,
                accessToken: action.accessToken,
                idToken: action.idToken,
                expiresAt: action.expiresAt,
                profile: action.profile,
                loggedIn: true
            };
        case actions.USER_LOGOUT:
            return {
                ...state,
                loading: false,
                accessToken: null,
                idToken: null,
                expiresAt: null,
                profile: null,
                loggedIn: false
            };
        case actions.USER_REFRESH:
            return {
                ...state,
                loading: false,
                loggedIn: true,
                accessToken: action.accessToken,
                idToken: action.idToken,
                expiresAt: action.expiresAt,
            };
        default:
            return state;
    }
};

module.exports = UserReducer;
