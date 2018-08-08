import React, { Component } from "react";
import Particles from "react-particles-js";
import styles from "./Home.scss";
import github from "./GitHub.svg";
import stackoverflow from "./StackOverflow.svg";

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
        <h1 className="animated fadeInLeft headline">hi! I'm Garrit.</h1>
        <p id="subheadline" className="animated fadeInRight">
          Junior Software Engineer | Hobbyist
        </p>
        <div className="icon-container">
          <a href="https://github.com/garritfra" target="_blank">
            <img
              className="animated fadeInUp logo"
              id="github"
              src={github}
              alt="GitHub"
            />
          </a>
          <p className="animated fadeInUp description">See My Work</p>
          <a
            href="https://stackoverflow.com/users/story/9046809"
            target="_blank"
          >
            <img
              className="animated fadeInUp logo"
              id="stackoverflow"
              src={stackoverflow}
              alt="Stack Overflow"
            />
          </a>
          <p className="animated fadeInUp description">See my Questions</p>
        </div>
      </div>
    );
  }
}
