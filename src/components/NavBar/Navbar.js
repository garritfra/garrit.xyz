import React from "react";
import "./Navbar.scss";
import AnalyticsProvider from "../../util/AnalyticsProvider";
const NavItem = ({ title, link }) => {
  return (
    <div
      className="nav-item"
      onClick={() =>
        AnalyticsProvider.getInstance().logEvent(
          "Social Links",
          "clicked",
          link
        )
      }
    >
      <a href={link}>{title}</a>
    </div>
  );
};

export default () => {
  return (
    <div className="nav-container">
      <NavItem title="Resume" link="https://garritfra.github.io/cv"></NavItem>
      <NavItem title="Blog" link="https://garritfra.github.io/blog"></NavItem>
      <NavItem title="GitHub" link="https://github.com/garritfra" />

      <NavItem
        title="LinkedIn"
        link="https://www.linkedin.com/in/garrit-franke-0558b1172"
      />
    </div>
  );
};
