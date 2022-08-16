import React from "react"; // React
import styled from "styled-components"; // Styles

interface Props {
  children: React.ReactNode;
}

/**
 * Template for non-sticky-header pages (i.e. home page)
 * @param { children } content
 */
const Page = ({ children }: Props) => {
  return (
    <Container>
      <section>{children}</section>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  h2 {
    margin-bottom: 24px;
    grid-column: 1;
  }
  section {
    width: 100%;
  }
`;

export default Page;
