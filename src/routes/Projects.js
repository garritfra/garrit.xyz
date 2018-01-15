import React, { Component } from 'react';
import '../index.css';
import P5Wrapper from 'react-p5-wrapper';
import PerlinNoise from "../components/projects/PerlinNoise/PerlinNoise"
import ProjectCard from '../components/ProjectCard';
class Projects extends Component {


  render() {
    return (

      <div>
        <ProjectCard project={{
          name: "Perlin Noise",
          description: "Awesome Perlin Noise Sketch",
          path: "/perlinnoise"
        }} />
      </div>
    );
  }
}

export default Projects;
