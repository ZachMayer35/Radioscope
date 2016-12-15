'use strict';

import { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';

const ReduxComponentException = function (message) {
   this.message = message;
   this.name = 'ReduxComponentException';
};

const validate = (name, fn, type, checkAgainst, hasFunction = true) => {
    if (typeof name !== 'string') {            
        throw new ReduxComponentException(type + ' names must be a string');
    }
    if (hasFunction && typeof fn !== 'function') {
        throw new ReduxComponentException(type + ' functions must be a function');
    }
    if (checkAgainst[name]) {
        throw new ReduxComponentException(type + ' for this class already has a key for "' + name + '"');
    }
};

class ReduxComponent extends Component {
    constructor (props) {
        super(props);

        this.syncToReactState = true;
        
        // Hold reducer functions.
        this.reducerFunctions = { };

        // Hold action generators.
        this.actions = { };

        // Hold action types.
        this.actionTypes = { };

        // The redux store object.
        this.store = null; 

        this.dispatch = this.dispatch.bind(this);
        this.addAction = this.addAction.bind(this);
        this._addActionType = this._addActionType.bind(this);
        this.addReducer = this.addReducer.bind(this);
        this._reducer = this._reducer.bind(this);
        this.createStore = this.createStore.bind(this);
        this._checkStore = this._checkStore.bind(this);
    }
    _checkStore (fnName) {
        if (this.store === null) {
            throw new ReduxComponentException('Store must be initialized with this.createStore() before using ' + fnName);
        }
    }
    dispatch (action) {  
        this._checkStore('dispatch');
        const previousState = Object.assign({}, this.store.getState());   
        this.store.dispatch(action);
        if (JSON.stringify(previousState) !== JSON.stringify(this.store.getState())) {
            if (this.syncToReactState) {
                this.setState(this.store.getState());
            } else {
                this.setState({ _storeRender: (this.state._storeRender || 0) + 1 });
            }
        }
        return action;
    }
    addAction (name, fn) {
        this._checkStore('addAction');
        validate(name, fn, 'Action', this.actions);
        this._addActionType(name);
        this.actions[this.actionTypes[name]] = fn;
    }
    _addActionType (name) {
        this._checkStore('addActionType');
        validate(name, null, 'ActionTypes', this.actionTypes, false);
        this.actionTypes[name] = name;
    }
    addReducer (name, fn) {
        this._checkStore('addReducer');
        validate(name, fn, 'Reducer', this.reducerFunctions);
        this.reducerFunctions[name] = fn;
    }
    _reducer (state, action) {
        if (this.reducerFunctions[action.type]) {
            return this.reducerFunctions[action.type](state, action);
        }        
        return state;        
    }
    createStore (initialState, syncToReactState) {
        if (this.store === null) {
            this.store = createStore(
                            this._reducer,
                            (initialState || {}),
                            applyMiddleware(
                                createLogger({ titleFormatter: (action, time) => (`${this.constructor.name} component_action @ ${time} ${action.type}`) })
                        ));
            this.syncToReactState = syncToReactState;
        } else {
            throw new ReduxComponentException('Store has already been created for this component');
        }
    }
}

export default ReduxComponent;
