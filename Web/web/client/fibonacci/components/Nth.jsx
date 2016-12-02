'use strict';

import React from 'react';
import { connect } from 'react-redux';

const Nth = ({ n, f, loading }) => (
    <p className='-text'>
        n = <span className='-number n'>{n}</span> 
        <br />
        Fibonacci Number At N = <span className='-number f'>{loading ? 'Loading...' : f || 0}</span>
    </p>
);

const mapStateToProps = (state, props) => {
  return { ...state.fibonacci, ...props };
};

export default connect(mapStateToProps)(Nth);
