import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { useRouterHistory } from 'react-router';

import fibonacci from '../components/fibonacci/reducer';

const rootReducer = combineReducers({
    fibonacci
});

const loggerMiddleware = createLogger();

const store = createStore(
	rootReducer,
	applyMiddleware(
		thunkMiddleware,
		//loggerMiddleware
	));

export default store;