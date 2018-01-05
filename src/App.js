import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import "./components/Button"
import Button from './components/Button';
import ProjectPreview from './components/ProjectPreview';

class App extends Component {

  render() {

      this.projects =  [
        {
          name: "Caesar Cipher",
          description: "Decrypt a string with the Ceasar Cipher method!",
          path: ""
        }
      ]
    return (

      <div className="App">
        <ProjectPreview project = {this.projects[0]}/>
        <ProjectPreview projectName="Tic-Tac-Toe"/>
        <ProjectPreview projectName="Caesar Cipher"/>
      </div>
    );
  }
}

export default App;
