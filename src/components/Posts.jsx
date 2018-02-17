import React, { Component } from 'react';
import PostCard from './PostCard';

export default class Posts extends Component {
  constructor(props) {
    super();
    this.props = props;

    this.state = {
      postList: [
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

      ],
    };
  }

  render() {
    const postItems = this.state.postList.map(post =>
      <PostCard />
    );

    return (postItems);
  }
}
