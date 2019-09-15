import React from "react";
import styled from "styled-components";
import SkillCard from "./SkillCard/SkillCard";
import SkillSet from "./assets/skills";
import path from "path";

export default function Skills() {
  return (
    <Container>
      <Title>My Skills</Title>
      {SkillSet.map(topic => {
        return (
          <div key={topic.name}>
            <TopicHeader>{topic.name}</TopicHeader>
            <div key={topic.name}>
              <SkillsContainer>
                {topic.skills.map(skill => {
                  return (
                    <SkillCardContainer key={skill.name}>
                      <SkillCard
                        logo={skill.logo}
                        name={skill.name}
                        rating={skill.rating}
                      />
                    </SkillCardContainer>
                  );
                })}
              </SkillsContainer>
            </div>
          </div>
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  margin-bottom: 1em;
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

const SkillsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  font: inherit;
  justify-content: center;
`;

const SkillCardContainer = styled.div`
  margin: 1em;
`;
