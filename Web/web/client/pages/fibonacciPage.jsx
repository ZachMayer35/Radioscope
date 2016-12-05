'use strict';

import React from 'react';

import Fibonacci from '../app/components/fibonacci/fibonacci-nth';

class FibonacciPage extends React.Component {
    render () {
        const { location } = this.props;
        return (
            <div className='flex-item'>                
                <p className='-text'>Increment N to get the next fibonacci number in the sequence.</p>
                <Fibonacci n={parseInt(location.query.n) || 10}/>                
            </div>
        );
    }
    getChildContext () {
        return { location: this.props.location };
    }
}
FibonacciPage.pageName = 'Fibonacci_Page';

// Get the location props from the parent context.
FibonacciPage.childContextTypes = {
    location: React.PropTypes.object
};

export default FibonacciPage;
