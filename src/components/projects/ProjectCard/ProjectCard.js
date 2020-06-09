import React from "react";
import styled from "styled-components";
import "./ProjectCard.scss";
import AnalyticsProvider from "../../../util/AnalyticsProvider";

export default function ProjectCard({ name, description, url, year }) {
  return (
    <Container
      onClick={() =>
        AnalyticsProvider.getInstance().logEvent("Project", "clicked", name)
      }
    >
      <NameText className="text">{name}</NameText>
      <DescriptionText>{description}</DescriptionText>
    </Container>
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

  &:hover {
    transform: scale(1.1);
  }
`;

const NameText = styled.div`
  text-align: center;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  font-size: 18px;
  line-height: 21px;
  margin: 1em;
`;

const DescriptionText = styled.div`
  text-align: center;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  font-size: 14px;
  line-height: 21px;
  margin-bottom: 1em;
  margin-left: 1em;
  margin-right: 1em;
`;
