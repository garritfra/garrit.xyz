import React, { Component } from 'react';
import { Feed } from 'semantic-ui-react';

export default class PostCard extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.post = this.props.post;
  }

  render() {
    return (
      <Feed.Event>
        <Feed.Content>
          <Feed.Summary>
            {this.post.title}
          </Feed.Summary>
          {this.post.body}
        </Feed.Content>
      </Feed.Event>
    );
  }
}
