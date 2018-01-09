import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ProjectCard from './components/ProjectCard';
import Header from "./components/Header";
import Button from 'material-ui/Button';
import ProjectPreview from './components/ProjectPreview';
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