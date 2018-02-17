import React, { Component } from 'react';

export default class PostCard extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.post = this.props.post;
  }

  render() {
    return (
      <div>
        <p>{this.post.id}</p>
        <p>{this.post.title}</p>
        <p>{this.post.body}</p>
      </div>
    );
  }
}
