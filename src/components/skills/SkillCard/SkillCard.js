import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./SkillCard.scss";
import AnalyticsProvider from "../../../util/AnalyticsProvider";

export default function SkillCard({ name, logo, rating }) {
  return (
    <div
      className="card"
      onClick={() =>
        AnalyticsProvider.getInstance().logEvent("Skills", "clicked", name)
      }
    >
      <img className="skill-logo" src={logo} />
      <div className="text">{name}</div>
      <div className="star-container">
        {Array.from({ length: rating }).map(x => {
          return (
            <FontAwesomeIcon
              color="gold"
              icon={faStar}
              style={{ margin: "2px" }}
            />
          );
        })}
      </div>
    </div>
  );
}
