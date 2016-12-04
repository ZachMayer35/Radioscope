'use strict';

import React from 'react';
import { connect } from 'react-redux';
import IncDec from './IncDec';
import { setNum, fetchFibonacciNumber } from '../actions';

const Nth = ({ n, f, loading, setN }) => (
  <div className='-text'>
    <div className='flex-line'>      
      <div className='input-group col-sm-9 col-xs-6'>
        <div className='input-group-addon'>N</div>
        <input type='text' className='form-control' value={n} 
        onChange={(e) => (setN(e.target.value))} 
        />
      </div>
      <div className='col-sm-3 col-xs-6'>
        <IncDec />
      </div>
    </div>
    <div className='input-group'>
      <div className='input-group-addon'>F</div>
      <input type='text' className='form-control' value={loading ? 'Loading...' : f || 0} 
      disabled 
      />
    </div>
  </div>
);

const mapStateToProps = (state, props) => {
  return { ...state.fibonacci, ...props };
};
const mapDispatchToProps = (dispatch) => ({
  setN: (num) => {
    num = parseInt(num);
    if (!isNaN(num)) {
      dispatch(setNum(num));
      dispatch(fetchFibonacciNumber());
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Nth);
