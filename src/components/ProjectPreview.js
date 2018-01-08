import React, {Component} from "react";
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';


class ProjectPreview extends Component{
    render(){

        const cardStyle = {
            marginTop: 30,
            margin: 16
          }
          //let loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

        return(
            <Card className="Card" style={cardStyle}>
            <CardContent>
                <h1>{this.props.project.name}</h1>
                <p>{this.props.project.description}</p>
            </CardContent>
            <CardActions>
                <Button dense color="primary">Go to Project</Button>
            </CardActions>
            </Card>
        );
    }
}

export default ProjectPreview;