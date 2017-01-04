'use strict';

import React from 'react';
import Splitter from '../app/components/stringSplit/splitter';

class StringsPage extends React.Component {
    render () {      
        return (
            <div className='flex-container'> 
                <p className='-text'>String Things</p>                               
                <h3> String Splitter </h3>
                <p className='-text'>Split a string with no punctuation or whitespace into possible sentences.</p> 
                <Splitter />
            </div>
        );
    }
}
StringsPage.pageName = 'Strings';

export default StringsPage;
