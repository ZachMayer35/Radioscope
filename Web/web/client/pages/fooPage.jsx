'use strict';

import React from 'react';

import Fibonacci from '../fibonacci/';

class FooPage extends React.Component {
    render () {        
        return (
            <div className='flex-item'>
                <h1 className='-text'>Foo_Page</h1>
                <p className='-text'>Something foo-like</p>
                <Fibonacci n={20}/>          
            </div>
        );
    }
}

export default FooPage;
