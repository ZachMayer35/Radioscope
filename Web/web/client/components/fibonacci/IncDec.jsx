import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { incrementNum, decrementNum, fetchFibonacciNumber } from './actions';

const IncDec = (state) => (
    <div className="btn-group">
        <button className='btn btn-primary' onClick={state.incrementNum}>+</button>
        <button className='btn btn-primary' onClick={state.decrementNum}>-</button>
    </div>
);

const mapStateToProps = (state) => (state.fibonacci);
const mapDispatchToProps = (dispatch) => ({
    incrementNum: (state) => {
        dispatch(incrementNum());
        dispatch(fetchFibonacciNumber());
    },
    decrementNum: () => {
        dispatch(decrementNum());
        dispatch(fetchFibonacciNumber());
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(IncDec);