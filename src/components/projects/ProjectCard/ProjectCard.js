import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./ProjectCard.scss";
import AnalyticsProvider from "../../../util/AnalyticsProvider";

export default function ProjectCard({ name, description, url, year }) {
  return (
    <div
      className="card"
      onClick={() =>
        AnalyticsProvider.getInstance().logEvent("Project", "clicked", name)
      }
    >
      <div className="text">{name}</div>
    </div>
  );
}

const Container = styled.div`
  position: relative;
  width: fit-content;
  height: 10em;
  height: fit-content;
  align-content: center;
  background: linear-gradient(180deg, #ffffff 0%, #fafafa 100%);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;

  display: flex;
  flex-direction: column;
  height: auto;
  transition-duration: 200ms;
`;
