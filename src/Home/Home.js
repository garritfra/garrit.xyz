import React, { Component } from "react";
import Particles from "react-particles-js";
import "./Home.scss";
import github from "./GitHub.svg";
import Typed from "react-typed";

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
        <div className="container">
          <div className="section-header">
            <h1 className="animated fadeInLeft headline">Hi, I'm Garrit</h1>
            <p id="subheadline" className="animated fadeInRight">
              I love{" "}
              <Typed
                strings={[
                  "JavaScript",
                  "doing web stuff with React",
                  "doing web stuff with Express.js",
                  "building Apps for Android",
                  "building Apps for iOS",
                  "building Apps with Flutter",
                  "going deep with Rust",
                  "you! ❤️"
                ]}
                typeSpeed={50}
                backSpeed={40}
                backDelay={1000}
                startDelay={1000}
                smartBackspace
              />
            </p>
          </div>
        </div>
      </div>
    );
  }
}
