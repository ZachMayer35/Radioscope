'use strict';

import React from 'react';

import ErrorMessage from '../app/combiners/fibonacci/ErrorMessage';
import Nth from '../app/combiners/fibonacci/Nth';

class BarPage extends React.Component {    
    render () {
        return (
            <div className='flex-container'>                
                <p className='-text'>Something Bar-like</p>  
                <ErrorMessage name='FibonacciNth' />              
                <Nth n={30} />              
            </div>
        );
    }
}
BarPage.pageName = 'Bar_Page';

export default BarPage;
