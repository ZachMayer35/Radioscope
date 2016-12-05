'use strict';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import '../../../assets/components/fibonacci.less';

import UpToNth from '../../combiners/fibonacci/components/upToNth';
import Error from '../../combiners/fibonacci/components/error';

const FibonacciAll = ({n}) => (
    <div className='Fibonacci flex-item'>
        <h1>NEW</h1>
        <Error name='FibonacciAll' />
        <UpToNth n={n} />
    </div>
)

FibonacciAll.propTypes = {
    n: PropTypes.any.isRequired
}

export default FibonacciAll;
