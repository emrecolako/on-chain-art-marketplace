import styled from "styled-components"; // Styles
import Image from "next/image"; // Next image

// Component imports
import { LinkIcon } from "./Icons";
import { ReadingType } from "./Types";
import { theme } from "../../styles/theme";

/**
 * Reading page: reading item UI
 */
const ReadingItem = ({ url, baseUrl, title, image }: ReadingType) => {
  return (
    <div>
      <a rel="noreferrer" href={url} target="_blank">
        <ReadingContainer>
          <Container>
            <TextContainer>
              <p>{title}</p>
              <div>
                <LinkIcon />
                <p>{baseUrl}</p>
              </div>
            </TextContainer>
            {image && (
              <ThumbnailContainer>
                <Image
                  src={`${image}`}
                  layout={"fill"}
                  objectFit="cover"
                  alt={`Thumbnail for ${title} on ${baseUrl}`}
                />
              </ThumbnailContainer>
            )}
          </Container>
        </ReadingContainer>
      </a>
    </div>
  );
};

const ReadingContainer = styled.div`
  min-height: 96px;
  box-shadow: 0 0 0 1px ${theme.stroke2};
  cursor: pointer;
  display: grid;
`;

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 0.7fr;
  grid-template-rows: 1fr;

  @media screen and (max-width: 560px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1.5fr 0.5fr;
  }
`;

const TextContainer = styled.div`
  grid-row: 1;
  grid-column: 1/3;

  display: inline-block;
  line-height: 24px;
  align-self: center;
  justify-self: start;
  padding: 64px 24px;

  // Title
  p:first-child {
    color: ${({ theme }) => theme.text1};
    line-height: 24px;
    font-weight: 500;
  }

  // Link preview
  & > div {
    display: flex;
    align-items: center;

    svg {
      margin-right: 4px;
    }
    p {
      display: inline-block;
      line-height: 24px;
    }
  }

  @media screen and (max-width: 560px) {
    grid-row: 2;
    padding: 16px 24px;
  }
`;

const ThumbnailContainer = styled.div`
  grid-row: 1;
  grid-column: 3/-1;
  width: 100%;
  height: 100%;
  position: relative;
  border-left: 1px solid ${theme.stroke1};

  span {
    padding-bottom: 8px;
  }

  @media screen and (max-width: 560px) {
    grid-row: 1;
    grid-column: 1;
    border-left: 0px;
  }
`;
export default ReadingItem;
