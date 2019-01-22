import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import * as reducer from './reducer';
import createBrowserHistory from 'history/createBrowserHistory';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

const history = createBrowserHistory();
const middleware = routerMiddleware(history);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(combineReducers({...reducer, router: routerReducer}), applyMiddleware(middleware));

export default store;
