import React, { Component } from 'react';
import Posts from '../components/Posts';

export default class Blog extends Component {
  constructor(props) {
    super();
    this.props = props;
  }

  render() {
    return (
      <div>
        <h1>Hello World</h1>
        {/*<Posts />*/}
      </div>
    );
  }
}

