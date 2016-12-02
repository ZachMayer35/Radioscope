'use strict';

const fib = require('./actions.js');

const initialState = {
    n: 0,
    f: 0,
    loading: false,
    error: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case fib.SET_N_FIBONACCI:            
            if (state.n > 1000 || state.n < 0) {
                return state;
            }
            return {
                ...state,
                n: action.n
            };
        case fib.INCREMENT_FIBONACCI:
            return {
                ...state,
                n: state.n < 1000 ? state.n + 1 : 0
            };
        case fib.DECREMENT_FIBONACCI:
            return {
                ...state,
                n: state.n > 0 ? state.n - 1 : 0
            };
        case fib.REQUEST_FIBONACCI:
            return {
                ...state,
                loading: true
            };
        case fib.RECEIVE_FIBONACCI:
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
