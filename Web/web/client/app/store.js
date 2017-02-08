'use strict';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { browserHistory } from 'react-router';
import { routerMiddleware, routerReducer } from 'react-router-redux';

import fibonacciReducer from './reducers/fibonacci-reducer';

const rootReducer = combineReducers({
	fibonacci: fibonacciReducer,
	routing: routerReducer
});

const middlewares = [thunkMiddleware, routerMiddleware(browserHistory)];

// only show redux logs in development or test.
if (['development', 'test'].indexOf(process.env.NODE_ENV) >= 0) {
	const createLogger = require('redux-logger');
	const logger = createLogger();
	middlewares.push(logger);
}

const store = createStore(
	rootReducer,
	applyMiddleware(
		...middlewares
	));

export default store;
