'use strict';

import React from 'react';
import { Link } from 'react-router';

const navItemClass = (path, currentPath) => {
    let name = 'list-group-item';
    if (currentPath === path) {
        name += ' active';
    }
    return name;
}

const Nav = ({ currentPath }) => (
    <div className='panel panel-default'>
        <ul className='list-group'>
        <Link className={navItemClass('/', currentPath)} to='/'>
            Home
        </Link>
        <Link className={navItemClass('/Foo', currentPath)} to='/Foo'>
            Foo
        </Link>
        <Link className={navItemClass('/Bar', currentPath)} to='/Bar'>
            Bar
        </Link>
        </ul>
    </div>
);

export default Nav;
