'use strict';

import React from 'react';

import Fibonacci from '../app/components/fibonacci/fibonacci-nth';

class BarPage extends React.Component {    
    render () {
        return (
            <div className='flex-item'>                
                <p className='-text'>Something Bar-like</p>
                <Fibonacci n={30} />               
            </div>
        );
    }
}
BarPage.pageName = 'Bar_Page';

export default BarPage;
