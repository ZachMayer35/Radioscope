'use strict';

import React, { PropTypes, Component } from 'react';
import IncDec from './IncDec';

class Nth extends Component {
  componentWillMount () {
    if (this.props._props.n !== this.props.n) {
      this.props.setN(this.props._props.n);
    }
  }
  render () {
    const { n, f, loading, increment, decrement, setN } = this.props;
    return (
      <div className='flex-item'>
        <div className='flex-line'>      
          <div className='input-group col-sm-9 col-xs-6'>
            <div className='input-group-addon'>N</div>
            <input type='text' className='form-control n' value={n} 
            onChange={(e) => (setN(e.target.value))} 
            />
          </div>
          <div className='col-sm-3 col-xs-6'>
            <IncDec decrement={decrement} increment={increment} />
          </div>
        </div>
        <div className='input-group'>
          <div className='input-group-addon'>F</div>
          <input type='text' className='form-control f' value={loading ? 'Loading...' : f || 0} 
          disabled 
          />
        </div>
      </div>
    );
  }
}

Nth.propTypes = {
  setN: PropTypes.func.isRequired,
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  n: PropTypes.any.isRequired,
  propN: PropTypes.number,
  f: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  _props: PropTypes.any
};

export default Nth;
