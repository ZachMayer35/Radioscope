'use strict';

import React from 'react';

import Fibonacci from '../fibonacci/';

class BarPage extends React.Component {    
    render () {
        return (
            <div className='flex-item'>
                <h1 className='-text'>Bar_Page</h1>
                <p className='-text'>Something Bar-like</p>
                <Fibonacci n={30} />               
            </div>
        );
    }
}

export default BarPage;
