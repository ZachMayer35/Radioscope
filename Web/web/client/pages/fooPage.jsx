'use strict';

import React from 'react';

import ErrorMessage from '../app/combiners/fibonacci/ErrorMessage';
import UpToNth from '../app/combiners/fibonacci/UpToNth';

class FooPage extends React.Component {
    render () {      
        return (
            <div className='flex-container'>                
                <p className='-text'>Something foo-like</p>
                <ErrorMessage name='FibonacciAll' />
                <UpToNth n={20}/>          
            </div>
        );
    }
}
FooPage.pageName = 'Foo_Page';

export default FooPage;
