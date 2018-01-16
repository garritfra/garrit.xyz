import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
import _ from 'lodash';


class ProjectCard extends Component {
  constructor(props) {
    super();
    this.props = props;
  }

  cutString(str, len) {
    if (_.lastIndexOf(str) > len) {
      const shortStr = `${str.slice(0, len)}..`;
      return shortStr;
    }

    return this.str;
  }

  render() {


    return (
      <div>
        <Card style={this.cardStyle}>
          <Card.Content header={this.props.project.name} />
          <Card.Content description={this.cutString(this.props.project.description, 30)} />
          <Card.Content button href={`/projects${this.props.project.path}`} color="primary">Go to Project</Card.Content>
        </Card>
      </div>
    );
  }
}

export default ProjectCard;
