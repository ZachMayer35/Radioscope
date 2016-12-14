'use strict';

import React, { PropTypes } from 'react';

import ErrorMessage from '../app/combiners/fibonacci/ErrorMessage';
import Nth from '../app/combiners/fibonacci/Nth';

class FibonacciPage extends React.Component {
    render () {
        const { location } = this.props;
        console.log(JSON.stringify(Nth));
        return (
            <div className='flex-container'>                
                <p className='-text'>Increment N to get the next fibonacci number in the sequence.</p>                      
                <ErrorMessage name='FibonacciNth' />
                <Nth n={parseInt(location.query.n) || 10} />   
                <Nth n={parseInt(location.query.n) || 10} />               
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

FibonacciPage.propTypes = {
    location: PropTypes.any.isRequired
};

export default FibonacciPage;
