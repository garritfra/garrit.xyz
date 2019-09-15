import React, { Component } from "react";
import Particles from "react-particles-js";
import "./Home.scss";
import Navbar from "../components/NavBar/Navbar";

import Landing from "../landing/Landing";

export default class Home extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.config = require("./particleConfig");
  }

  render() {
    return (
      <div>
        <Particles params={this.config} className="particles-js" />
        <Navbar />
        <Landing />
      </div>
    );
  }
}
