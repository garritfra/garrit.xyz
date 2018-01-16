import React, { Component } from "react";
import { Grid, Button, Header, Container } from 'semantic-ui-react';
import ProjectCard from "./ProjectCard";


class ProjectPreview extends Component {

  constructor() {
    super();
    this.state = {
      projects: [
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

    return (
      <Container>
        <Header as='h1' icon textAlign='center'>
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