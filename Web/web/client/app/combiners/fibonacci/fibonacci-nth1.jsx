'use strict';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import '../../../assets/components/fibonacci.less';

import Nth from './components/Nth';
import Error from './components/error';

const FibonacciNth = ({n}) => (
    <div className='Fibonacci flex-item'>
        <h1>NEW</h1>
        <Error errorName='Fibonacci' />
        <Nth n={n} />
    </div>
)

FibonacciNth.propTypes = {
    n: PropTypes.any.isRequired
}

export default FibonacciNth;
