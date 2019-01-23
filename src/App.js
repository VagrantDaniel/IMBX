import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login/login';
import LoginDetails from './pages/LoginDetails/loginDetails';
import Home from './pages/Home/home';
import Find from './pages/Find/find';
import Mrtj from './pages/Mrtj/mrtj';
import PlayDetails from './pages/PlayDetails/playDetails';
// import createBrowserHistory from 'history/createBrowserHistory';
// import { ConnectedRouter } from "react-router-redux";
import './App.scss';

// const history = createBrowserHistory();
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/loginDetails" component={LoginDetails} />
          <Route path="/home" component={Home} />
          <Route path="/find" component={Find} />
          <Route path="/mrtj" component={Mrtj} />
          <Route exact path="/playDetails" component={PlayDetails} />
        </div>
      </Router>
    );
  }
}

export default App;
