import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import ReduxThunk from 'redux-thunk';

import { userReducer } from './reducers/user';
import { todosReducer } from './reducers/todos';

const rootReducer = combineReducers({
	user: userReducer,
	todos: todosReducer
});

const middleWares = [ ReduxThunk ];

if (process.env.NODE_ENV === 'development') {
	middleWares.push(logger);
}

const store = createStore(rootReducer, applyMiddleware(...middleWares));

export default store;
