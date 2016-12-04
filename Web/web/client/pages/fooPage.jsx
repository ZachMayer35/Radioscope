'use strict';

import React from 'react';

import Fibonacci from '../fibonacci/';

class FooPage extends React.Component {
    render () {      
        return (
            <div className='flex-item'>                
                <p className='-text'>Something foo-like</p>
                <Fibonacci n={20}/>          
            </div>
        );
    }
}
FooPage.pageName = 'Foo_Page';

export default FooPage;
