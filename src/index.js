import ReactDOM from 'react-dom';
import 'lib-flexible';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/index';
import * as serviceWorker from './serviceWorker';
import React, { Component } from 'react';
import { Router, Route, Redirect } from 'react-router';
import Login from './pages/Login/login';
import LoginDetails from './pages/LoginDetails/loginDetails';
import Home from './pages/Home/home';
import Find from './pages/Find/find';
import Mrtj from './pages/Mrtj/mrtj';
import PlayDetails from './pages/PlayDetails/playDetails';
import createBrowserHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from "react-router-redux";

const history = createBrowserHistory();
ReactDOM.render(<Provider store={store}>
    <ConnectedRouter history={ history }>
      <div className="App">
        <Route exact path="/" component={Login} />
        <Route path="/login" component={Login} />
        <Route path="/loginDetails" component={LoginDetails} />
        <Route path="/home" component={Home} />
        <Route path="/find" component={Find} />
        <Route path="/mrtj" component={Mrtj} />
        <Route path="/playDetails" component={PlayDetails} />
      </div>
    </ConnectedRouter>
  </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
