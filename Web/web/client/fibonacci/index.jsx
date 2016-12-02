'use strict';

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import './fibonacci.less';
import { setNum, fetchFibonacciNumber } from './actions';

import Nth from './components/Nth';
import IncDec from './components/IncDec';

/**
 * @class Fibonacci
 * @extends ReactComponent
 */
class Fibonacci extends React.Component {
    componentWillMount () {
        this.props.setNum(this.props.n);
        this.props.fetchFibonacciNumber();
    }
    render () {        
        return (
            <div className='Fibonacci flex-item'>
                <h1 className='-text'>Fibonacci_new</h1>
                <p className='-text'>Increment N to get the next fibonacci number in the sequence.</p>
                <Nth />
                <IncDec />
            </div>
        );
    }
}

Fibonacci.propTypes = {
    n: PropTypes.number.isRequired,
    setNum: PropTypes.func.isRequired,
    fetchFibonacciNumber: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    setNum: (num) => {
        dispatch(setNum(num));
    },
    fetchFibonacciNumber: () => {
        dispatch(fetchFibonacciNumber());
    }
});

export default connect(null, mapDispatchToProps)(Fibonacci);
