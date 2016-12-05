'use strict';

import React from 'react';

import AllFibonacci from '../app/components/fibonacci/fibonacci-all';

class FooPage extends React.Component {
    render () {      
        return (
            <div className='flex-item'>                
                <p className='-text'>Something foo-like</p>
                <AllFibonacci n={20}/>          
            </div>
        );
    }
}
FooPage.pageName = 'Foo_Page';

export default FooPage;
