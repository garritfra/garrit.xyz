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
        <Posts />
      </div>
    );
  }
}

