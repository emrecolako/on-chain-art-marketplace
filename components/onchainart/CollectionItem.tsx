import styled from "styled-components"; // styles
import Image from "next/image"; // Next image
import Link from "next/link"; // Next link

// Component imports
import StarRating from "./StarRating";
import ImgWrapper from "./ImgWrapper";

// Helper functions + constants
import { getFormatedAddress } from "../../utils/helper"
import { ETH_REGEX } from "../../utils/constants";
import { theme } from "../../styles/theme";

interface Props {
  name: string;
  creatorName: string;
  rating: number;
  url?: string;
  slug: string;
}

/**
 * Collection item preview rendered on home page
 */
const CollectionItem = ({ name, creatorName, rating, url, slug }: Props) => {
  // If not ENS, format to 0x1234..
  if (ETH_REGEX.test(creatorName)) {
    creatorName = getFormatedAddress(creatorName);
  }

  return (
    <Link href={`/collection/${slug}`} passHref>
      <a>
        <Container>
          {/* Padding around container */}
          <PaddingContainer>
            {/* Star Rating */}
            <StarContainer>
              <StarContainer2>
                <StarRating collectionItem={true} rating={rating} />
              </StarContainer2>
            </StarContainer>

            {/* Thumbnail Image */}
            <ImgWrapper profileItem={false} collectionItem={true}>
              {url && url.includes(".mp4") ? (
                <video muted autoPlay loop playsInline src={url} />
              ) : !url?.includes("storage.opensea.io") &&
                !url?.includes("lh3.googleusercontent.com") ? (
                <iframe scrolling="no" src={url}></iframe>
              ) : (
                <Image
                  layout="fill"
                  alt={`Picture of ${name}`}
                  src={url ? url : "/"}
                  objectFit="contain"
                />
              )}
            </ImgWrapper>

            {/* Collection name + creator */}
            <TextContainer>
              <Name>{name}</Name>
              <CreatorName>{creatorName}</CreatorName>
            </TextContainer>
          </PaddingContainer>
        </Container>
      </a>
    </Link>
  );
};

const Container = styled.div`
  background: ${theme.bg1};
  box-sizing: border-box;
  cursor: pointer;
  box-shadow: 0 0 0 1px ${theme.stroke1};
  height: 100%;
`;

const PaddingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  position: relative;
  padding: 80px 32px 48px 32px;
`;

const StarContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 2;
`;

const StarContainer2 = styled.div`
  margin: 8px 8px 0 0;
  position: absolute;
  right: 0;
`;

const TextContainer = styled.div`
  margin-top: 16px;
  margin-left: 8px;
`;

const Name = styled.p`
  color: ${({ theme }) => theme && theme.text1};
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
`;

const CreatorName = styled.p`
  font-family: ${theme.font2};
  font-size: ${theme.size2};
  color: ${theme.text2};
`;

export default CollectionItem;
