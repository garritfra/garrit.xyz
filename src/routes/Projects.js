import React, { Component, createElement } from 'react';
import '../index.css';
import P5Wrapper from 'react-p5-wrapper';
import PerlinNoise from "../components/projects/PerlinNoise/PerlinNoise"
import ProjectCard from '../components/ProjectCard';
import { type } from 'os';
class Projects extends Component {

  constructor(){
    super();
    this.state = {
      projects: [
        {
          name: "Perlin Noise",
          description: "Awesome Perlin Noise Sketch",
          path: "/perlinnoise"
        },
        {
          name: "Caesar Cipher",
          description: "Decrypt a string with the Ceasar Cipher method!",
          path: "/cipher"
        },
        {
          name: "Tic Tac Toe",
          description: "Plain ol' Tic Tac Toe",
          path: "/tictactoe"
        },
        {
          name: "Another Sample",
          description: "Lorem Ipsum",
          path: "/sample"
        }
      ]
    }
  }

  render() {

    let projects = this.state.projects.map((element) => {return <ProjectCard project={element}/>})

    return (

      <div>
        {projects}
      </div>
    );
  }
}

export default Projects;
