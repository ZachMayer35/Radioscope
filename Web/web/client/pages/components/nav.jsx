'use strict';

import React from 'react';
import { Link } from 'react-router';

const navItemClass = (path, currentPath) => {
    let name = 'list-group-item';
    if ((currentPath.toLowerCase().indexOf(path.toLowerCase()) === 0 && path.length > 1) || currentPath.toLowerCase() === path.toLowerCase()) {
        name += ' active';
    }
    return name;
};

const Nav = ({ currentPath }) => (
    <div className='panel panel-default'>
        <ul className='list-group'>
        <Link className={navItemClass('/', currentPath)} to='/'>
            Fibonacci
        </Link>
        <Link className={navItemClass('/Strings', currentPath)} to='/Strings'>
            Strings
        </Link>
        <Link className={navItemClass('/Misc', currentPath)} to='/Misc'>
            Misc
        </Link> 
        <Link className={navItemClass('/Swapi', currentPath)} to='/Swapi/20'>
            SWAPI
        </Link>
        </ul>
    </div>
);

export default Nav;
