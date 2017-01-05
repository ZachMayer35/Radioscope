'use strict';

import React, { PropTypes } from 'react';
import ReduxComponent from '../ReduxComponent';
import ListExpanded from '../common/list-expanded';
import ErrorMessage from '../common/errorMessage';

const REQUEST_SPLIT = 'REQUEST_SPLIT';
const RECEIVE_SPLIT = 'RECEIVE_SPLIT';
const SELECT = 'SELECT';
const CLEAR_ERROR = 'CLEAR_ERROR';
const SET_INPUT_ERROR = 'SET_INPUT_ERROR';

class Splitter extends ReduxComponent {
  constructor (props) {
    super(props);
    this.state = {
      sentences: [],
      selected: {},
      error: {},
      loading: false,
      inputError: null // string
    };
    this.createStore(this.state);
    this.addAction(SELECT, (selected) => ({ type: SELECT, selected }));
    this.addAction(CLEAR_ERROR, () => ({ type: CLEAR_ERROR }));
    this.addAction(SET_INPUT_ERROR, (msg) => ({ type: SET_INPUT_ERROR, msg }));
    this.addAction(REQUEST_SPLIT, () => ({ type: REQUEST_SPLIT }));    
    this.addAction(RECEIVE_SPLIT, (str, response) => ({ type: RECEIVE_SPLIT, str, response }));    
    
    this.addReducer(SELECT, (state, action) => ({ ...state, selected: action.selected }));
    this.addReducer(CLEAR_ERROR, (state) => ({ ...state, error: {} }));
    this.addReducer(SET_INPUT_ERROR, (state, action) => ({ ...state, inputError: action.msg }));
    this.addReducer(REQUEST_SPLIT, (state) => ({ ...state, loading: true }));
    this.addReducer(RECEIVE_SPLIT, (state, action) => {
      console.log(action.response);
      return Array.isArray(action.response) ? 
              action.response.length > 0 ?
                { ...state, loading: false, str: action.str, sentences: action.response.map((s, i) => ({ id: action.str.value + i.toString(), name: s })), error: {} } :
                { ...state, loading: false, sentences: action.response, error: { error: 'String Split Error', message: 'Couldn\'t split the string.' } } :
              { ...state, loading: false, sentences: [], error: action.response };
    });    

    this.handleChange = this.handleChange.bind(this);
    this.splitString = this.splitString.bind(this);
    this.trySubmit = this.trySubmit.bind(this);
    this.changeSelection = this.changeSelection.bind(this);
    this.clearError = this.clearError.bind(this);
  }
  render () {
    const { sentences, loading, selected, error, inputError } = this.store.getState();
    return (
      <div>
        <ErrorMessage name='StringSplitter' 
                      error={error.message ? error.error : error.statusCode}
                      message={error.message || error.error} 
                      dismiss={this.clearError} 
                      />
        <div className='stringSplitter filter-list'>
          <div className={inputError ? 'form-group has-error' : 'form-group'}>
            <div className='input-group'>
              <input type='text'
                    ref={(input) => { this.StrInput = input; }}
                    className={'form-control'}
                    title={inputError}
                    placeholder={inputError ? inputError + ' Try: thisisawesome' : 'Try: thisisawesome'}                     
                    onChange={this.handleChange}
                    onKeyUp={this.trySubmit}
                    />
              <div className='input-group-addon btn' onClick={this.splitString}>Split...</div>
            </div>
          </div>
          <hr />
          <ListExpanded className='list'
            list={sentences}
            loading={loading}
            selected={selected}
            select={this.changeSelection}
            />
            <br />
        </div>
      </div>
    );
  }
  clearError () {
    this.dispatch(this.actions.CLEAR_ERROR());
  }
  changeSelection (selected) {
    this.dispatch(this.actions.SELECT(selected));
  }
  handleChange (e) {
    if (this.store.getState().inputError) {
      this.dispatch(this.actions.SET_INPUT_ERROR(null));
    }
  }
  trySubmit (e) {
    if (e.key === 'Enter') {
      this.splitString();
    }
  }
  splitString () {
    const { dispatch, StrInput, actions } = this;
    if(StrInput.value) {
      dispatch(actions.REQUEST_SPLIT());
      return fetch(global.API_PATH + '/hard/splitString/' + StrInput.value)
            .then((response) => response.json())
            .then((response) => dispatch(actions.RECEIVE_SPLIT(StrInput.value, response)));
    } else {
      dispatch(actions.SET_INPUT_ERROR('Input Required.'));
    }
  }
}

export default Splitter;
