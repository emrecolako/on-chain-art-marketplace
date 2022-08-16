import styled from "styled-components"; // Styles
import { theme } from "../../styles/theme"; // Styles

interface Props {
  headings: string;
  show: boolean;
}

/**
 * Sticky Header above content page
 */
const Header = ({ headings, show }: Props) => {
  return (
    <Container show={show}>
      <h1>{headings}</h1>
    </Container>
  );
};

const Container = styled.div<{ show: boolean }>`
  grid-column: 1/-1;
  display: flex;
  position: sticky;
  justify-content: center;
  align-items: center;

  top: 0;
  width: 100%;
  background: ${theme.bg1};
  z-index: 99;
  border-bottom: 1px solid ${theme.stroke1};
  overflow: hidden;

  h1 {
    display: inline-block;
    font-size: ${theme.size3};
    font-weight: 500;
  }
`;

export default Header;
