'use strict';

import { Link } from 'react-router';
import React from 'react';

class HomePage extends React.Component {
    render () {
        return (
            <div className='flex-item'> 
                <header>
                    Links:
                    <Link to='/'>Home</Link>
                    <Link to='/foo'>Foo</Link>
                    <Link to='/bar'>Bar</Link>
                </header>                
                {this.props.children}
            </div>
        );
    }
}

export default HomePage;
