import React, { Component } from "react";
import Particles from "react-particles-js";
import styles from "./Home.scss";
import github from "./GitHub.svg";
import stackoverflow from "./StackOverflow.svg";
import LinkItem from "./LinkItem";

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
            <h1 className="animated fadeInLeft headline">hi!</h1>
            <p id="subheadline" className="animated fadeInRight">
              Junior Software Engineer | Hobbyist
            </p>
          </div>
          <LinkItem
            link="https://github.com/garritfra"
            description="See my Work"
            logo={github}
            className="github"
          />

          <LinkItem
            link="https://stackoverflow.com/users/story/9046809"
            description="See my Questions"
            logo={stackoverflow}
            className="stackoverflow"
          />
        </div>
      </div>
    );
  }
}
