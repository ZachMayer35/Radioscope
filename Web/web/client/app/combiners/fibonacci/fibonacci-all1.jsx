'use strict';

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import './fibonacci.less';
import { setNum, fetchAllFibonacciNumbers } from './actions';

import UpToNth from './components/UpToNth';

/**
 * @class Fibonacci
 * @extends ReactComponent
 */
class AllFibonacci extends React.Component {    
    componentWillMount () {
        this.props.setNum(this.props.n || 10);
        this.props.fetchAllFibonacciNumbers();
    }
    render () {        
        return (
            <div className='Fibonacci flex-item'>
                NEW!
                <Error errorName='AllFibonacci' />
                <UpToNth />
            </div>
        );
    }
}

AllFibonacci.propTypes = {
    n: PropTypes.number.isRequired,
    setNum: PropTypes.func.isRequired,
    fetchAllFibonacciNumbers: PropTypes.func.isRequired,
};

const mapStoreToProps = (store, props) => ({
    n: props.n || 10
});

const mapDispatchToProps = (dispatch) => ({
    setNum: (num) => {
        dispatch(setNum(num));
    },
    fetchAllFibonacciNumbers: () => {
        dispatch(fetchAllFibonacciNumbers());
    }
});

export default connect(mapStoreToProps, mapDispatchToProps)(AllFibonacci);
