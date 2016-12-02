'use strict';

import React from 'react';
import { connect } from 'react-redux'

import css from './fibonacci.less';
import { setNum, fetchFibonacciNumber } from './actions';

import Nth from './Nth';
import IncDec from './IncDec';

/**
 * @class Fibonacci
 * @extends ReactComponent
 */
class Fibonacci extends React.Component {
    componentWillMount (state) {
        this.props.setNum(this.props.n);
        this.props.fetchFibonacciNumber();
    }
    render () {        
        return(
            <div className='Fibonacci'>
                <h1 className='-text'>Fibonacci_new</h1>
                <p className='-text'>Increment N to get the next fibonacci number in the sequence.</p>
                <Nth />
                <IncDec />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    setNum: (num) => {
        dispatch(setNum(num))
    },
    fetchFibonacciNumber: (num) => {
        dispatch(fetchFibonacciNumber())
    }
});

export default connect(null, mapDispatchToProps)(Fibonacci);
