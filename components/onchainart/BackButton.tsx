import styled from "styled-components"; // Styles
import { useRouter } from "next/router"; // Next Router

// Components
import { BackIcon } from "./Icons";
import { theme } from "../../styles/theme";

/**
 * Back Button header on profile pages.
 */
const BackButton = (): JSX.Element => {
  const router = useRouter();
  return (
    <FixedHeader>
      <Container onClick={() => router.back()}>
        <BackIcon />
        <span>View Collections</span>
      </Container>
    </FixedHeader>
  );
};

const FixedHeader = styled.div`
  grid-column: 1/-1;
  display: flex;
  align-self: flex-start;
  align-items: center;
  top: 0;
  left: ${theme.sbWidth};
  position: sticky;
  background: ${theme.bg1};
  z-index: 99;
  height: ${theme.hHeight};
  border-bottom: 1px solid ${theme.stroke1};
`;

const Container = styled.div`
  display: inline-flex;
  align-items: center;
  flex-direction: row;
  column-gap: 8px;
  cursor: pointer;
  margin-left: 32px;

  svg {
    width: 14px;
    height: 14px;
  }

  span {
    color: ${theme.text3};
  }

  :hover {
    span {
      box-shadow: 0 0.5px 0 0 ${theme.text3};
    }
  }
`;

export default BackButton;
