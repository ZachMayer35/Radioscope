import fetch from 'isomorphic-fetch'


export const SET_N_FIBONACCI = 'SET_N_FIBONACCI';
export const INCREMENT_FIBONACCI = 'INCREMENT_FIBONACCI';
export const DECREMENT_FIBONACCI = 'DECREMENT_FIBONACCI';
export const REQUEST_FIBONACCI = 'REQUEST_FIBONACCI';
export const RECEIVE_FIBONACCI = 'RECEIVE_FIBONACCI';

export const setNum = (n) => {
    return {
        type: SET_N_FIBONACCI,
        n
    }
};

export const incrementNum = () => {
    return {
        type: INCREMENT_FIBONACCI
    }
};

export const decrementNum = () => {
    return {
        type: DECREMENT_FIBONACCI
    }
};

export const requestSingle = () => {
    return {
        type: REQUEST_FIBONACCI
    }
};

export const receiveSingle = (f) => {
    console.log(f);
    return {
        type: RECEIVE_FIBONACCI,
        f
    }
};

export const fetchFibonacciNumber = () => {
  return (dispatch, getState) => {    
    dispatch(requestSingle())
    return fetch(global.API_PATH + "/fibonacci/getNth/" + getState().fibonacci.n)
        .then(response => response.json())
        .then(response => dispatch(receiveSingle(response)))
  }
};

