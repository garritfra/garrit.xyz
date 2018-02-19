import React, { Component } from 'react';
import Container, { Card } from 'semantic-ui-react';

export default class PostCard extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.post = this.props.post;
  }

  render() {
    return (
      <div className="BlogEntry">
        <Card fluid>
          <Card.Content header={this.post.title} />
          <Card.Content fluid description={this.post.body} />
          <Card.Content extra>
            {this.post.datePosted}
          </Card.Content>
        </Card>
      </div>
    );
  }
}
