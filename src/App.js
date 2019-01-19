import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login/login';
import Home from './pages/Home/home';
import Find from './pages/Find/find';
import Mrtj from './pages/Mrtj/mrtj';
import singleMusic from './component/SingleMusic/singleMusic';
import player from './component/MusicPlayer/musicPlayer';
import loginDetails from './pages/LoginDetails/loginDetails';
import './App.scss';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/loginDetails" component={loginDetails} />
          <Route path="/home" component={Home} />
          <Route path="/find" component={Find} />
          <Route path="/mrtj" component={Mrtj} />
          <Route path="/singleMusic" component={singleMusic} />
          <Route path="/player" component={player} />
        </div>
      </Router>
    );
  }
}

export default App;
