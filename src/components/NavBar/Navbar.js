import React from "react";
import "./Navbar.scss";
const NavItem = ({ title, link }) => {
  return (
    <div className="nav-item">
      <a href={link} target="_blank">
        {title}
      </a>
    </div>
  );
};

export default () => {
  return (
    <div className="nav-container">
      <NavItem title="Portfolio" link="https://github.com/garritfra" />

      <NavItem
        title="My Profile"
        link="https://www.linkedin.com/in/garrit-franke-0558b1172"
      />
    </div>
  );
};
