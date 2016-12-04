'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { incrementNum, decrementNum, fetchFibonacciNumber } from '../actions';

const IncDec = (state) => (
    <div className='input-group btn-group'>
        <button className='btn btn-primary' onClick={state.incrementNum}><i className='glyphicon glyphicon-plus'/></button>
        <button className='btn btn-primary' onClick={state.decrementNum}><i className='glyphicon glyphicon-minus'/></button>
    </div>
);

const mapStateToProps = (state) => (state.fibonacci);
const mapDispatchToProps = (dispatch) => ({
    incrementNum: () => {
        dispatch(incrementNum());
        dispatch(fetchFibonacciNumber());
    },
    decrementNum: () => {
        dispatch(decrementNum());
        dispatch(fetchFibonacciNumber());
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(IncDec);
