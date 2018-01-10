import React, { Component } from "react";
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import _ from "lodash"
import Typography from "material-ui/Typography"
import { withStyles } from 'material-ui/styles';


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
						<Button dense color="primary">Go to Project</Button>
					</CardActions>
				</Card>
			</div>
		);
	}
}

export default ProjectCard;