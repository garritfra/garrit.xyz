import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import "./components/Button"
import Button from './components/Button';
import ProjectPreview from './components/ProjectPreview';
import Header from "./components/Header";

class App extends Component {


  render() {
    let projects = [
        {
          name: "Caesar Cipher",
          description: "Decrypt a string with the Ceasar Cipher method!",
          path: ""
        }
      ]
    return (

      <div className = "App">
        <Header/>
        <ProjectPreview project = {projects[0]}/>
        <ProjectPreview project= {projects[0]}/>
        <ProjectPreview project= {projects[0]}/>
      </div>
    );
  }
}

export default App;