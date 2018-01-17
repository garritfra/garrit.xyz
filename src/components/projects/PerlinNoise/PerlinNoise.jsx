import React, { Component } from 'react';
import P5Wrapper from 'react-p5-wrapper';
import sketch from './sketch';

class PerlinNoise extends Component {
  constructor(props) {
    super();
    this.props = props;
  }

  render() {
    return (
      <div>
        <P5Wrapper sketch={sketch} />
      </div>
    );
  }
}

export default PerlinNoise;
