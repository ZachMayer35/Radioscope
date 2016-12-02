import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const Nth = ({n, f, loading, error}) => (
    <span className='-text'>
        n = <span className='-number n'>{n}</span> 
        <br />
        Fibonacci Number At N = <span className='-number f'>{loading ? "Loading..." : f || 0}</span>
    </span>
);

Nth.PropTypes = {
    n: PropTypes.number.isRequired,
    f: PropTypes.number.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.object
};

const mapStateToProps = (state, props) => {
  return {...state.fibonacci, ...props};
};

export default connect(mapStateToProps)(Nth);