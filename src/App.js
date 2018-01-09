import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ProjectCard from './components/ProjectCard';
import Header from "./components/Header";
import Button from 'material-ui/Button';
import ProjectPreview from './components/ProjectPreview';
import Home from "./routes/Home";
import { Router, Route, browserHistory } from 'react-router';


class App extends Component {


  render() {
    return (

      <Router history = {browserHistory}>
        <Route path={"/"} component={Home}/>
      </Router>
    );
  }
}

export default App;