import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import * as reducer from './reducer';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(combineReducers({...reducer}), composeEnhancers(applyMiddleware(thunk)));

export default store;
