'use strict';

import React, { Component, PropTypes } from 'react';

import '../../../assets/components/fibonacci.less';

import Nth from '../../combiners/fibonacci/components/Nth';
import Error from '../../combiners/fibonacci/components/error';

const FibonacciNth = ({n}) => (
    <div className='Fibonacci flex-item'>
        <h1>NEW</h1>
        <Error name='FibonacciNth' />
        <Nth n={n} />
    </div>
)

FibonacciNth.propTypes = {
    n: PropTypes.any.isRequired
}

export default FibonacciNth;
