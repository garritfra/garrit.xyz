import React, { Component } from "react";
import AnalyticsProvider from "../util/AnalyticsProvider";

export default class LinkItem extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.className = this.props.className;
    this.link = this.props.link;
    this.description = this.props.description;
    this.logo = this.props.logo;
  }

  render() {
    return (
      <div className={this.className + " logo"}>
        <a
          href={this.link}
          target="_blank"
          onClick={() =>
            AnalyticsProvider.getInstance().analytics.track("pageVisited", {
              pageName: this.description,
              url: this.link
            })
          }
        >
          <img
            className="animated fadeInUp logo"
            style={this.logoStyle}
            src={this.logo}
          />
        </a>
        <p className="animated fadeInUp description">{this.description}</p>
      </div>
    );
  }
}
