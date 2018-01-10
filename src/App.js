import React, { Component } from 'react';
import './App.css';
import { Router, Route, browserHistory } from 'react-router';
import Home from "./routes/Home";
import NotFound from "./routes/NotFound"

class App extends Component {


  render() {
    return (

      <Router history = {browserHistory}>
        <Route path={"/"} component={Home}/>
        <Route path={"/*"} component={NotFound}/>
      </Router>
    );
  }
}

export default App;