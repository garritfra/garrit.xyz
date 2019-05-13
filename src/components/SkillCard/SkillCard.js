import React, { useState } from "react";
import "./SkillCard.scss";

export default function SkillCard() {
  return (
    <div className="card">
      <img
        className="skill-logo"
        src="https://cdn4.iconfinder.com/data/icons/logos-and-brands-1/512/97_Docker_logo_logos-128.png"
      />
      <div className="text">Docker</div>
      <div className="star-container">
        <div className="star" />
        <div className="star" />
        <div className="star" />
        <div className="star" />
        <div className="star" />
      </div>
    </div>
  );
}
