import React, {Component} from "react";
import Button from "./Button";

class ProjectPreview extends Component{
    render(){

        this.divStyle = {
            width: "30%",
            height: "200px",
            border: "2px solid black",
            margin: "1em",
            float: "left"
          }
          let loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

        this.project = this.props.project;

        return(
            <div id="container" style={this.divStyle}>
                <h3>Name of Project</h3>
                <p>{loremIpsum}</p>
                <Button name="Go to Project" style={{float: "bottom"}}/>

            </div>
        );
    }
}

export default ProjectPreview;