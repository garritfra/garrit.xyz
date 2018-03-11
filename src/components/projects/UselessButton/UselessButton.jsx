import React, { Component } from 'react';
import './UselessButton.scss';

export default class UselessButton extends Component {
  constructor(props) {
    super();
    this.props = props;
  }

  render() {
    return (
      <div className="uselessButton">
        <h1 className="uselessButtonHeader">This is a Useless Button</h1>
        <button className="btn uselessButton">Click Me!</button>
      </div>
    );
  }
}
