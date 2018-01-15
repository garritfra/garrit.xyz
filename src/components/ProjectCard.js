import React, { Component } from "react";
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from "material-ui/Typography"
import { withRouter } from "react-router-dom"


class ProjectCard extends Component {
	render() {

		const cardStyle = {
			marginTop: 30,
			margin: 16,
			maxHeight: 200
		}



		return (
			<div>
				<Card className="Card" style={cardStyle}>
					<CardContent>
						<Typography type="headline">
							{this.props.project.name}
						</Typography>
						<Typography component="p">
							{this.props.project.description}
						</Typography>
					</CardContent>
					<CardActions>
						<Button href={"/projects" + this.props.project.path} dense color="primary">Go to Project</Button>
					</CardActions>
				</Card>
			</div>
		);
	}
}

export default ProjectCard;