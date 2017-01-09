'use strict';

import React from 'react';
import { Link } from 'react-router';

const navItemClass = (path, currentPath) => {
    let name = 'list-group-item';
    if (currentPath === path) {
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
        <Link className={navItemClass('/Swapi', currentPath)} to='/Swapi'>
            SWAPI
        </Link>
        </ul>
    </div>
);

export default Nav;
