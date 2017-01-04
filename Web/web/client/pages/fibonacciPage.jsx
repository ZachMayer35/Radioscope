'use strict';

import React, { PropTypes } from 'react';

import ErrorMessage from '../app/combiners/fibonacci/ErrorMessage';
import Nth from '../app/combiners/fibonacci/Nth';
import UpToNth from '../app/combiners/fibonacci/UpToNth';

class FibonacciPage extends React.Component {
    render () {
        const { location } = this.props;
        return (
            <div className='flex-container'>      
                <p className='-text'>Fibonacci Controls</p>    
                <h3>Get Nth</h3>                  
                <p className='-text'>Increment N to get the next fibonacci number in the sequence.</p>                      
                <ErrorMessage name='Fibonacci' />
                <Nth n={parseInt(location.query.n) || 10} />                    
                <br/>
                <h3>Get Up To Nth</h3>       
                <p className='-text'>Set N to see all the fibonacci numbers in the sequence.</p>                      
                <UpToNth n={parseInt(location.query.n) || 10}/>
            </div>
        );
    }
    getChildContext () {
        return { location: this.props.location };
    }
}
FibonacciPage.pageName = 'Fibonacci';

// Get the location props from the parent context.
FibonacciPage.childContextTypes = {
    location: React.PropTypes.object
};

FibonacciPage.propTypes = {
    location: PropTypes.any.isRequired
};

export default FibonacciPage;
