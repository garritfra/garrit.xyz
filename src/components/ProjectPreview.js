import React, {Component} from "react";
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import ProjectCard from "./ProjectCard";


class ProjectPreview extends Component{
    
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

    render(){

         return(
            <Grid container spacing={24}>
              <Grid item xs>  
                <ProjectCard project= {this.state.projects[0]}/>
              </Grid>
              <Grid item xs>  
                <ProjectCard project= {this.state.projects[1]}/>
              </Grid>
              <Grid item xs>  
                <ProjectCard className="" project= {this.state.projects[2]}/>
              </Grid>
                <Button raised>See all projects</Button>
            </Grid> 
         );
    }
  }

export default ProjectPreview;