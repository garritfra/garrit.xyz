import React from "react";
import styled from "styled-components";

const Footer = styled.div`
  width: 100%;
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

const Line = styled.p`
  color: white;
  text-align: center;
`;

const Link = styled.a`
  color: white;
`;

export default () => {
  return (
    <Footer>
      <Line>Copyright © 2020 Garrit Franke</Line>
      <Line>
        Licensed under the{" "}
        <Link href="https://mit-license.org/">MIT License</Link>. The source
        code for this website can be found{" "}
        <Link href="https://github.com/garritfra/garritfra.github.io">
          here
        </Link>
      </Line>
    </Footer>
  );
};
