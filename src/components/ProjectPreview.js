import React, { Component } from "react";
import { Grid } from 'semantic-ui-react'
import Button from 'material-ui/Button';
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
      <div>
        <h1 className="jumbotron">Projects</h1>
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
      </div>
    );
  }
}

export default ProjectPreview;