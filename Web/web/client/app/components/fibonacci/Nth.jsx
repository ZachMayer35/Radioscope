'use strict';

import React, { PropTypes } from 'react';
import ReduxComponent from '../ReduxComponent';
import IncDec from './IncDec';

class Nth extends ReduxComponent {
  constructor (props) {
    super(props);
    
    this.state = { counter: 0 };    
    this.createStore(this.state);
    this.addAction('TEST', () => ({ 
      type: 'TEST' 
    }));
    this.addReducer(this.actionTypes.TEST, (state) => (
      { ...state, counter: state.counter + 1 }
    ));
    
    this.onIncrement = this.onIncrement.bind(this);
    this.onDecrement = this.onDecrement.bind(this);
  }
  componentWillMount () {
    if (this.props._props.n !== this.props.n) {
      this.props.setN(this.props._props.n);
    }
  }
  render () {
    const { n, f, loading, setN } = this.props;
    const store = this.store.getState();
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
            <IncDec decrement={this.onDecrement} increment={this.onIncrement} />
          </div>
        </div>
        <div className='flex-line'>   
          <div className='input-group'>
            <div className='input-group-addon'>F</div>
            <input type='text' className='form-control f' value={loading ? 'Loading...' : f || 0} 
            disabled 
            />
          </div>
        </div>
        <div className='flex-line'>   
          <div className='input-group'>
            <div className='input-group-addon'>Button Clicks</div>
            <input type='text' className='form-control c' value={store.counter || 0} 
            disabled 
            />
          </div>
        </div>
      </div>
    );
  }  
  onIncrement () {
    this.dispatch(this.actions.TEST());
    this.props.increment();
  }
  onDecrement () {
    this.dispatch(this.actions.TEST());
    this.props.decrement();
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
