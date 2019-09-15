import React from "react";
import styled from "styled-components";
import SkillCard from "./SkillCard/SkillCard";
import SkillSet from "./assets/skills";
import path from "path";

export default function Skills() {
  return SkillSet.map(topic => {
    return (
      <div key={topic.name}>
        <h1>{topic.name}</h1>
        {topic.subtopics.map(subtopic => {
          return (
            <div key={subtopic.name}>
              <h2>{subtopic.name}</h2>
              <SkillsContainer>
                {subtopic.skills.map(skill => {
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
          );
        })}
      </div>
    );
  });
}

const SkillsContainer = styled.div`
  display: flex;
  flex-direction: row;
  font: inherit;
`;

const SkillCardContainer = styled.div`
  margin: 1em;
`;
