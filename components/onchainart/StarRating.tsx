import styled from "styled-components"; // Styles
import { theme } from "../../styles/theme"; // Styles

// Components
import { StarIcon } from "./Icons";

interface Props {
  rating: number;
  collectionItem: boolean;
}

/**
 * Home page: star rating badge UI
 */
const StarRating = ({ rating, collectionItem }: Props) => {
  return (
    <Container collectionItem={collectionItem}>
      <StarIcon />
      {rating}
    </Container>
  );
};

const Container = styled.div<{ collectionItem: boolean }>`
  top: 0;
  align-self: flex-end;

  font-family: ${theme.font1};

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  column-gap: 6px;
  background: ${theme.bg3};
  padding: 5px 9px;
  border: ${({ collectionItem }) =>
    collectionItem ? `1.5px solid ${theme.stroke1}` : null};

  border-radius: 20px;
  font-size: 13px;

  @media screen and (max-width: 354px) {
    padding: 4px 9px;
  }
`;

export default StarRating;
