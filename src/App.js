import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ProjectCard from './components/ProjectCard';
import Header from "./components/Header";
import Button from 'material-ui/Button';
import ProjectPreview from './components/ProjectPreview';

class App extends Component {

  constructor(){
    //super();

  }

  render() {
    return (

      <div className = "App Railway">
        <Header/>
        <ProjectPreview/>
      </div>
    );
  }
}

export default App;