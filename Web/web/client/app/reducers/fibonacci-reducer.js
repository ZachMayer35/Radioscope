'use strict';

const fib = require('../actions/fibonacci-actions.js');

const initialState = {
    n: 0,
    f: 0,
    a: [],
    loading: false,
    error: null
};

const validN = (num) => {
    return num > 0 && num < 1000;
}

const FibonacciReducer = (state = initialState, action) => {
    switch (action.type) {
        case fib.SET_N_FIBONACCI:
            return {
                ...state,
                n: action.n
            };
        case fib.INCREMENT_FIBONACCI:
            return {
                ...state,
                n: validN(state.n + 1) ? state.n + 1 : 1
            };
        case fib.DECREMENT_FIBONACCI:
            return {
                ...state,
                n: validN(state.n - 1) ? state.n - 1 : 1
            };
        case fib.REQUEST_FIBONACCI:
            return {
                ...state,
                loading: true
            };
        case fib.RECEIVE_FIBONACCI:
            if(action.f && action.f.error){
                return {
                    ...state,
                    error: action.f,
                    loading: false
                }
            }
            return {
                ...state,
                f: action.f,
                loading: false
            };
        case fib.REQUEST_ALL_FIBONACCI:
            return {
                ...state,
                loading: true
            };
        case fib.RECEIVE_ALL_FIBONACCI:
            if(action.a && action.a.error){
                return {
                    ...state,
                    error: action.a,
                    loading: false
                }
            }
            return {
                ...state,
                a: action.a,
                loading: false
            };
        case fib.DISMISS_ERROR:
            return {
                ...state,
                error: null
            }
        case fib.RESET: 
            return initialState
        default:
            return state;
    }
};

module.exports = FibonacciReducer;
