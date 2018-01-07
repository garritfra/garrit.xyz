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
          //let loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

        return(
            <div id="container" style={this.divStyle}>
                <h3>{this.props.project.name}</h3>
                <p>{this.props.project.description}</p>
                <Button name="Go to Project"/>

            </div>
        );
    }
}

export default ProjectPreview;