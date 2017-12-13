'use strict';

const actions = require('../actions/user-actions.js');

const initialState = {
    name: null,
    email: null,
    accessToken: localStorage.getItem('access_ oken') || null,
    idToken: localStorage.getItem('id_token') || null,
    expiresAt: localStorage.getItem('expires_at') || null,
    loading: localStorage.getItem('loading') || false
};

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.USER_LOGGING: 
            return {
                ...state,
                loading: true
            }
        case actions.USER_LOGIN:
            return {
                ...state,
                loading: false,
                accessToken: action.accessToken,
                idToken: action.idToken,
                expiresAt: action.expiresAt
            };
        case actions.USER_LOGOUT:
            return {
                ...state,
                loading: false,
                accessToken: null,
                idToken: null,
                expiresAt: null
            };
        default:
            return state;
    }
};

module.exports = UserReducer;
