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
          name: 'Blockchain Demo',
          description: 'Blockchain in action!',
          path: '/blockchain',
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
      <div className="centered">
        <CardGroup className="centered" style={{ margin: '1em' }}>
          {projects}
        </CardGroup>
      </div>
    );
  }
}
