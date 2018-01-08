import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import "./components/Button"
import Button from './components/Button';
import ProjectPreview from './components/ProjectPreview';
import Header from "./components/Header";

class App extends Component {

  constructor(){
    super();
    this.state = {
      projects: [
        {
          name: "Caesar Cipher",
          description: "Decrypt a string with the Ceasar Cipher method!",
          path: ""
        },
        {
          name: "Tic Tac Toe",
          description: "Plain ol' Tic Tac Toe",
          path: ""
        },
        {
          name: "Another Sample",
          description: "Lorem Ipsum",
          path: ""
        }
      ]
    }
  }

  render() {
    return (

      <div className = "App Railway">
        <Header/>
        <ProjectPreview project= {this.state.projects[0]}/>
        <ProjectPreview project= {this.state.projects[1]}/>
        <ProjectPreview project= {this.state.projects[2]}/>
        <Button>See all projects</Button>
      </div>
    );
  }
}

export default App;