'use strict';

import React, { PropTypes } from 'react';

const IncDec = ({increment, decrement}) => (
    <div className='input-group btn-group'>
        <button className='btn btn-primary' onClick={increment}><i className='glyphicon glyphicon-plus'/></button>
        <button className='btn btn-primary' onClick={decrement}><i className='glyphicon glyphicon-minus'/></button>
    </div>
);

IncDec.propTypes = {
    increment: PropTypes.func,
    decrement: PropTypes.func
}

export default IncDec;
