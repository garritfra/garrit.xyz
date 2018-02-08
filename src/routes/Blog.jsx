import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import Info from '../components/Info';

export default class Blog extends Component {
  constructor(props) {
    super();
    this.props = props;
  }

  render() {
    return (
      <div>
        <Info />
      </div>
    );
  }
}

