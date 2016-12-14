'use strict';

import React, { PropTypes, Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { connect } from 'react-redux';
import IncDec from './IncDec';

class Nth extends Component {
  constructor (props) {
    super(props);
    const middlewares = [];
    if (process.env.NODE_ENV !== 'test') {
      const createLogger = require('redux-logger');
      const logger = createLogger();
      middlewares.push(logger);
    }
    this.state = {counter: 0};
    this.store = createStore(
                    this.reducer,
                    this.state,
                    applyMiddleware(
                      ...middlewares
                    ));
    this.actions = {
      TEST: 'TEST'
    }
    
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
        <div className='input-group'>
          <div className='input-group-addon'>F</div>
          <input type='text' className='form-control f' value={loading ? 'Loading...' : f || 0} 
            disabled 
          />
        </div>
        <div className='input-group'>
          <div className='input-group-addon'>Button Clicks</div>
          <input type='text' className='form-control c' value={this.state.counter || 0} 
            disabled 
          />
        </div>
      </div>
    );
  }  
  onIncrement () {
    this.incrementCounter();
    this.props.increment();
  }
  onDecrement () {
    this.incrementCounter();
    this.props.decrement();
  }
  testAction () {
    return {
      type: this.actions.TEST
    }
  }
  reducer (state, action) {
    switch (action.type) {        
        case 'TEST':             
            return { counter: state.counter += 1}
        default:
            return state;
    }
  }
  dispatch(action) {  
    this.store.dispatch(action);
    this.setState(this.store.getState());
  }
  incrementCounter() {
    this.dispatch(this.testAction());
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
