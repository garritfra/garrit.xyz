import React, { Component } from "react";
import { Card, Icon } from 'semantic-ui-react'
import { withRouter } from "react-router-dom"
import _ from "lodash";


class ProjectCard extends Component {

	constructor(props){
		super();
		this.props = props;
	}
	cardStyle = {
		marginTop: 30,
		padding: "10%",
		Height: "1em",
		width: "100%"
		
	}

	cutString = (str, len) => {

		if (_.lastIndexOf(str) > len){
			return str.slice(0, len) + ".."
		}
		else{
			return str;
		}
	}

	render() {



		return (
			<div>
				<Card style={this.cardStyle}>
					<Card.Content header={this.props.project.name}/>
					<Card.Content description=
							{this.cutString(this.props.project.description, 30)}/>
						<Card.Content button href={"/projects" + this.props.project.path} color="primary">Go to Project</Card.Content>
				</Card>
			</div>
		);
	}
}

export default ProjectCard;