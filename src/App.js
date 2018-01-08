import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import "./components/Button"
import ProjectPreview from './components/ProjectPreview';
import Header from "./components/Header";
import Button from 'material-ui/Button';
import Grid from "material-ui/Grid";

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
          <Grid container spacing={24}>
            <Grid item xs>  
              <ProjectPreview project= {this.state.projects[0]}/>
            </Grid>
            <Grid item xs>  
              <ProjectPreview project= {this.state.projects[1]}/>
            </Grid>
            <Grid item xs>  
              <ProjectPreview className="" project= {this.state.projects[2]}/>
             {/*  <Button raised>See all projects</Button> */}
            </Grid>
          </Grid>
      </div>
    );
  }
}

export default App;