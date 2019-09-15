import React from "react";
import SkillCard from "./SkillCard/SkillCard";
import "./Skills.scss";

export default function Skills() {
  return (
    <div id="container">
      <SkillCard name="HTML" logo={require("./assets/html.svg")} />
      <SkillCard name="HTML" logo={require("./assets/html.svg")} />
    </div>
  );
}
