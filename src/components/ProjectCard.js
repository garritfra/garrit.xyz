import React, { Component } from "react";
import { Card, Icon } from 'semantic-ui-react'
import { withRouter } from "react-router-dom"


class ProjectCard extends Component {

	constructor(props){
		super();
		this.props = props;
	}
	cardStyle = {
		//marginTop: 30,
		//margin: 16,
		Height: "1em",
		width: "100%",
		
	}

	render() {



		return (
			<div>
				<Card style={this.cardStyle}>
					<Card.Content header={this.props.project.name}/>
					<Card.Content description=
							{this.props.project.description}/>
						<Card.Content button href={"/projects" + this.props.project.path} color="primary">Go to Project</Card.Content>
				</Card>
			</div>
		);
	}
}

export default ProjectCard;