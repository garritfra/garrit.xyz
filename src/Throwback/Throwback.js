import React from "react";
import construction from "./construction.gif";
import styled from "styled-components";
import rainbow from "./rainbow_stars.gif";
import smiley from "./smiley.gif";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${rainbow});
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
`;

const Item = styled.div`
  margin: 1rem auto;

  @media screen and (max-width: 594px) {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
`;

const ConstructionImage = styled.img`
  margin: 0 auto;
  width: 100vw;

  max-width: 1000px;
`;

const WordArtContainer = styled(Item)`
  font-family: Arial, sans-serif;
  font-size: 4em;
  font-weight: bold;
  position: relative;
  z-index: 1;
  display: inline-block;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  transform: skew(0, -10deg) scale(1, 1.5);
  -webkit-transform: skew(0, -10deg) scale(1, 1.5);
  -moz-transform: skew(0, -10deg) scale(1, 1.5);
  -o-transform: skew(0, -10deg) scale(1, 1.5);
  -ms-transform: skew(0, -10deg) scale(1, 1.5);
`;

const WordArtText = styled.span`
  letter-spacing: -0.01em;
  font-family: Impact;
  background: #4222be;
  background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJod…IgaGVpZ2h0PSIxIiBmaWxsPSJ1cmwoI2dyYWQtdWNnZy1nZW5lcmF0ZWQpIiAvPgo8L3N2Zz4=);
  background: -moz-linear-gradient(top, #4222be 0%, #a62cc1 73%);
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0%, #4222be),
    color-stop(73%, #a62cc1)
  );
  background: -webkit-linear-gradient(top, #4222be 0%, #a62cc1 73%);
  background: -o-linear-gradient(top, #4222be 0%, #a62cc1 73%);
  background: -ms-linear-gradient(top, #4222be 0%, #a62cc1 73%);
  background: linear-gradient(to bottom, #4222be 0%, #a62cc1 73%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#4222be', endColorstr='#a62cc1', GradientType=0);
  -webkit-text-stroke: 0.01em #b28ffd;
  filter: progid:DXImageTransform.Microsoft.Glow(Color=#b28ffd, Strength=1);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const WordArt = (props) => {
  return (
    <WordArtContainer>
      <WordArtText>{props.children}</WordArtText>
    </WordArtContainer>
  );
};

const WhiteMarquee = styled.marquee`
  color: white;
`;

const Text = styled(Item)`
  color: white;
`;

export default function Throwback() {
  return (
    <Container>
      <Item>
        <span>
          <img src={smiley}></img>
        </span>
        <span>
          <WordArt>Welcome!</WordArt>
        </span>
        <span>
          <img src={smiley}></img>
        </span>
      </Item>
      <ConstructionImage src={construction}></ConstructionImage>
      <WhiteMarquee>You are the 79812th visitor!</WhiteMarquee>
      <Text>Copyright 1998 (c) Garrit Franke</Text>
    </Container>
  );
}
