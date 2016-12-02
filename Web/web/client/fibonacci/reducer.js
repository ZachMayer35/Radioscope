'use strict';

import * as actions from './actions';

const initialState = {
    n: 0,
    f: 0,
    loading: false,
    error: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.SET_N_FIBONACCI:            
            if (state.n > 1000 || state.n < 0) {
                return state;
            }
            return {
                ...state,
                n: action.n
            };
        case actions.INCREMENT_FIBONACCI:
            return {
                ...state,
                n: state.n < 1000 ? state.n + 1 : 0
            };
        case actions.DECREMENT_FIBONACCI:
            return {
                ...state,
                n: state.n > 0 ? state.n - 1 : 0
            };
        case actions.REQUEST_FIBONACCI:
            return {
                ...state,
                loading: true
            };
        case actions.RECEIVE_FIBONACCI:
            return {
                ...state,
                f: action.f,
                loading: false
            };
        default:
            return state;
    }
};

module.exports = reducer;
