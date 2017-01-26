'use strict';

import fetch from 'isomorphic-fetch';

export const SET_N_FIBONACCI = 'SET_N_FIBONACCI';
export const INCREMENT_FIBONACCI = 'INCREMENT_FIBONACCI';
export const DECREMENT_FIBONACCI = 'DECREMENT_FIBONACCI';
export const REQUEST_FIBONACCI = 'REQUEST_FIBONACCI';
export const RECEIVE_FIBONACCI = 'RECEIVE_FIBONACCI';
export const REQUEST_ALL_FIBONACCI = 'REQUEST_ALL_FIBONACCI';
export const RECEIVE_ALL_FIBONACCI = 'RECEIVE_ALL_FIBONACCI';
export const DISMISS_ERROR = 'DISMISS_ERROR';
export const RESET = 'RESET_FIBONACCI';

export const setNum = (n) => ({
    type: SET_N_FIBONACCI,
    n
});

export const incrementNum = () => ({
    type: INCREMENT_FIBONACCI
});

export const decrementNum = () => ({    
    type: DECREMENT_FIBONACCI
});

export const requestSingle = () => ({    
    type: REQUEST_FIBONACCI
});

export const receiveSingle = (f) => ({
    type: RECEIVE_FIBONACCI,
    f
});

export const requestAll = () => ({    
    type: REQUEST_ALL_FIBONACCI
});

export const receiveAll = (a) => ({
    type: RECEIVE_ALL_FIBONACCI,
    a
});

export const dismissError = () => ({
    type: DISMISS_ERROR
});

export const reset = () => ({
    type: RESET
});

export const fetchFibonacciNumber = () => (
    (dispatch, getState) => {    
        dispatch(requestSingle());
        return fetch(`${global.API_PATH}/fibonacci/getNth/${getState().fibonacci.n}`, { headers: { queuename: '/fibonacci/getNth/' } })
            .then((response) => response.json())
            .then((response) => dispatch(receiveSingle(response)));
});

export const fetchAllFibonacciNumbers = () => (
    (dispatch, getState) => {    
        dispatch(requestAll());
        return fetch(`${global.API_PATH}/fibonacci/getUpToN/${getState().fibonacci.n}`, { headers: { queuename: '/fibonacci/getUpToN/' } })
            .then((response) => response.json())
            .then((response) => dispatch(receiveAll(response)));
});
