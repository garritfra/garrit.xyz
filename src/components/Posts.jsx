import React, { Component } from 'react';
import PostCard from './PostCard';

export default class Posts extends Component {
  constructor(props) {
    super();
    this.props = props;
  }

  render() {
    const postList = [
      {
        id: 1,
        title: 'This is the title of the first post',
        body: 'Lorem Ipsum amen',
      },
      {
        id: 2,
        title: 'This is the title of the second post',
        body: 'Lorem Ipsum lkajsdkjalöwd',
      },

    ];
    const postView = () => {
      postList.map(post => (<p>{post.title}</p>));
    };
    return (postView);
  }
}
