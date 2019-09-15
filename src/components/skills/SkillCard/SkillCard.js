import React, { useState } from "react";
import "./SkillCard.scss";

export default function SkillCard({ name, logo, rating }) {
  return (
    <div className="card">
      <img className="skill-logo" src={logo} />
      <div className="text">{name}</div>
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
