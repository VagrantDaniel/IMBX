import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login/login';
import Home from './pages/Home/home';
import './App.less';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/home" component={Home} />
        </div>
      </Router>
    );
  }
}

export default App;
