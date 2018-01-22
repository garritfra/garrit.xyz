import React, { Component } from 'react';
import { CardGroup, Button, Header, Icon } from 'semantic-ui-react';
import ProjectCard from './ProjectCard';


class ProjectPreview extends Component {
  constructor() {
    super();
    this.state = {
      projects: [
        {
          name: 'Perlin Noise',
          description: 'Colorful Sketch done in p5',
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
      ],
    };
  }

  render() {
    return (
      <div className="centered">
        <Header as="h1" icon textAlign="center">

          <Icon name="puzzle" />
          <Header.Content>
            Projects
          </Header.Content>
        </Header>
        <CardGroup className="centered">
          <ProjectCard project={this.state.projects[0]} />
          <ProjectCard project={this.state.projects[1]} />
          <ProjectCard project={this.state.projects[2]} />
        </CardGroup>
        <Button raised href="/projects">See all projects</Button>
      </div>
    );
  }
}

export default ProjectPreview;
