'use strict';

import React from 'react';

import Fibonacci from '../fibonacci/';

class FibonacciPage extends React.Component {
    render () {
        return (
            <div className='flex-item'>                
                <p className='-text'>Increment N to get the next fibonacci number in the sequence.</p>
                <Fibonacci n={parseInt(this.props.location.query.n)}/> 
            </div>
        );
    }
    getChildContext () {
        return { location: this.props.location };
    }
}
FibonacciPage.pageName = 'Fibonacci_Page';

FibonacciPage.propTypes = {
    location: React.PropTypes.object 
};

FibonacciPage.childContextTypes = {
    location: React.PropTypes.object
};

export default FibonacciPage;
