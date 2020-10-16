import React from "react";
import styled from "styled-components";
import ProjectCard from "./ProjectCard/ProjectCard";
import ProjectSet from "./assets/projects";

export default function Projects() {
  return (
    <Container id="skills">
      <Title>Projects</Title>
      {ProjectSet.map(topic => {
        return (
          <div key={topic.name}>
            <TopicHeader>{topic.name}</TopicHeader>
            <div key={topic.name}>
              <ProjectsContainer>
                {topic.projects.map(project => {
                  return (
                    <ProjectCardContainer key={project.name}>
                      <ProjectCard
                        name={project.name}
                        description={project.description}
                        url={project.url}
                        year={project.year}
                      />
                    </ProjectCardContainer>
                  );
                })}
              </ProjectsContainer>
            </div>
          </div>
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  margin-bottom: 1em;
  padding-top: 2em;
`;

const Title = styled.h1`
  text-align: center;
  font-family: Montserrat, sans-serif;
  font-size: 6em;
  color: white;
  position: relative;
`;

const TopicHeader = styled.p`
  text-align: center;
  font-family: Montserrat, sans-serif;
  font-size: 2em;
  color: white;
  position: relative;
`;

const ProjectsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  font: inherit;
  justify-content: center;
`;

const ProjectCardContainer = styled.div`
  margin: 1em;
`;
