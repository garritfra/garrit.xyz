import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
import _ from 'lodash';
import propTypes from 'prop-types';


class ProjectCard extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.cardStyle = {
      margin: '2em',
    };
  }


  render() {
    const cutString = (str, len) => {
      if (_.lastIndexOf(str) > len) {
        const shortStr = `${str.slice(0, len)}..`;
        return shortStr;
      }

      return str;
    };

    return (
      <div>
        <Card style={this.cardStyle}>
          <Card.Content header={this.props.project.name} />
          <Card.Content description={cutString(this.props.project.description, 30)} />
          <Card.Content button href={`/projects${this.props.project.path}`} color="primary">Go to Project</Card.Content>
        </Card>
      </div>
    );
  }
}

ProjectCard.propTypes = {
  project: {
    name: propTypes.string.isRequired,
    description: propTypes.string.isRequired,
    url: propTypes.string.isRequired,
  },
};

ProjectCard.defaultProps = {
  project: {
    name: '',
    description: '',
    url: '',
  },
};

export default ProjectCard;
