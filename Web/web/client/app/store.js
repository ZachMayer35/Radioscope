'use strict';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerReducer } from 'react-router-redux';

import fibonacciReducer from './reducers/fibonacci-reducer';

const rootReducer = combineReducers({
	fibonacci: fibonacciReducer,
	routing: routerReducer
});

const middlewares = [thunkMiddleware];

if (process.env.NODE_ENV !== 'test') {
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
