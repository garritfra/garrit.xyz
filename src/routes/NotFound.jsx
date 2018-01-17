import React, { Component } from 'react';
import '../index.css';

class NotFound extends Component {
  constructor(props) {
    super();
    this.props = props;
  }

  render() {
    return (

      <div className="App Railway">
        <h1>Oops..</h1>
        <h2>Page not found!</h2>
      </div>
    );
  }
}

export default NotFound;

