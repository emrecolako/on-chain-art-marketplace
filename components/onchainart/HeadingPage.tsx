import React from "react"; // React
import styled from "styled-components"; // Styles

interface Props {
  children: React.ReactNode;
}

/**
 * Template for pages with sticky headers
 */
const HeadingPage = ({ children }: Props) => {
  return (
    <Container>
      <section>{children}</section>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: grid;

  grid-template-columns: 0.5fr 1fr 1fr 0.5fr;

  section {
    grid-row: 1;
    grid-column: 2 / 4;
    width: 100%;
  }

  @media screen and (max-width: 560px) {
    grid-template-columns: 1fr;
    margin: 0 32px;

    section {
      grid-column: 1 / -1;
    }
  }
`;

export default HeadingPage;
