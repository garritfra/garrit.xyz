import React, { Component } from "react";
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
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
        <Grid container spacing={24}>
          <Grid item xs>
            <ProjectCard project={this.state.projects[0]} />
          </Grid>
          <Grid item xs>
            <ProjectCard project={this.state.projects[1]} />
          </Grid>
          <Grid item xs>
            <ProjectCard project={this.state.projects[2]} />
          </Grid>
        </Grid>
    <Button raised href="/projects">See all projects</Button>
      </div>
    );
  }
}

export default ProjectPreview;