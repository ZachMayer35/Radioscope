'use strict';

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import './fibonacci.less';
import { setNum, fetchFibonacciNumber } from './actions';

import Nth from './components/Nth';

/**
 * @class Fibonacci
 * @extends ReactComponent
 */
class Fibonacci extends React.Component {    
    componentWillMount () {
        this.props.setNum(this.props.n || 10);
        this.props.fetchFibonacciNumber();
    }
    render () {        
        return (
            <div className='Fibonacci flex-item'>
                <Nth />
            </div>
        );
    }
}

Fibonacci.propTypes = {
    n: PropTypes.number.isRequired,
    setNum: PropTypes.func.isRequired,
    fetchFibonacciNumber: PropTypes.func.isRequired,
};

const mapStoreToProps = (store, props) => ({
    n: props.n || 10
});

const mapDispatchToProps = (dispatch) => ({
    setNum: (num) => {
        dispatch(setNum(num));
    },
    fetchFibonacciNumber: () => {
        dispatch(fetchFibonacciNumber());
    }
});

export default connect(mapStoreToProps, mapDispatchToProps)(Fibonacci);
