'use strict';

import React from 'react';

import Fibonacci from '../fibonacci/';

class FibonacciPage extends React.Component {
    render () {
        return (
            <div className='flex-item'>
                <h1 className='-text'>Fibonacci_Page</h1>
                <p className='-text'>Increment N to get the next fibonacci number in the sequence.</p>
                <Fibonacci n={parseInt(this.props.location.query.n)}/> 
            </div>
        );
    }
    getChildContext () {
        return { location: this.props.location };
    }
}

FibonacciPage.propTypes = {
    location: React.PropTypes.object 
};

FibonacciPage.childContextTypes = {
    location: React.PropTypes.object
};

export default FibonacciPage;
