import React, { Component } from 'react';
import { Grid, Button, Header, Container, Icon } from 'semantic-ui-react';
import ProjectCard from './ProjectCard';


class ProjectPreview extends Component {
  constructor() {
    super();
    this.state = {
      projects: [
        {
          name: 'Perlin Noise',
          description: 'Colorful Sketch done in p5',
          path: '/cipher',
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
      <Container>
        <Header as="h1" icon textAlign="center">

          <Icon name="puzzle" />
          <Header.Content>
            Projects
          </Header.Content>
        </Header>
        <Grid container columns={3}>
          <Grid.Column>
            <ProjectCard project={this.state.projects[0]} />
          </Grid.Column>
          <Grid.Column>
            <ProjectCard project={this.state.projects[1]} />
          </Grid.Column>
          <Grid.Column>
            <ProjectCard project={this.state.projects[2]} />
          </Grid.Column>
        </Grid>
        <Button raised href="/projects">See all projects</Button>
      </Container>
    );
  }
}

export default ProjectPreview;
