import React, { Component } from 'react';
import { Grid, CardGroup } from 'semantic-ui-react';
import '../index.css';
import ProjectCard from '../components/ProjectCard';

export default class Projects extends Component {
  constructor() {
    super();
    this.state = {
      projects: [
        {
          name: 'Perlin Noise',
          description: 'Awesome Perlin Noise Sketch',
          path: '/perlinnoise',
        },
        {
          name: 'Caesar Cipher',
          description: 'Decrypt a string with the Ceasar Cipher method!',
          path: '/cipher',
        },
        {
          name: 'Tic Tac Toe',
          description: "Plain ol' Tic Tac Toe",
          path: '/tictactoe',
        },
        {
          name: 'Another Sample',
          description: 'Lorem Ipsum',
          path: '/sample',
        },
        {
          name: 'Another Sample',
          description: 'Lorem Ipsum',
          path: '/sample',
        },
        {
          name: 'Another Sample',
          description: 'Lorem Ipsum',
          path: '/sample',
        },
      ],
    };
  }

  render() {
    const projects = this.state.projects.map(element => (
      <ProjectCard project={element} />
    ));

    return (

      <Grid container colums={3}>
        <CardGroup style={{ margin: '1em' }}>
          {projects}
        </CardGroup>
      </Grid>
    );
  }
}
