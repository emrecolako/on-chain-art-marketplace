import React from "react"; // React
import styled from "styled-components"; // Styles
import { theme } from "../../styles/theme"; // Styles

interface Props {
  children: React.ReactElement;
  width?: string;
  collectionItem: boolean;
  profileItem: boolean;
}

/**
 * Image container
 * @param {children} img, video, svg (div innerHTML) tags
 */
const ImgWrapper = ({
  children,
  width,
  collectionItem,
  profileItem,
}: Props) => {
  return (
    <ImgWidth width={width} profileItem={profileItem}>
      <ImgContainer collectionItem={collectionItem}>{children}</ImgContainer>
    </ImgWidth>
  );
};

const ImgWidth = styled.div<{
  width: string | undefined;
  profileItem: boolean;
}>`
  display: inline-block;
  flex-shrink: 0;

  // Width for all images
  width: ${({ width }) => (width ? `${width}` : "100%")};

  // Profile Item (/collections/[name]) width
  width: ${({ profileItem }) => profileItem && "calc( (100% / 1) - 64px)"};
  @media screen and (min-width: 560px) {
    width: ${({ profileItem }) => profileItem && "calc( (100% / 2) - 64px)"};
    row-gap: 24px;
  }
  @media screen and (min-width: 850px) {
    width: ${({ profileItem }) => profileItem && "calc( (100% / 3) - 64px)"};
  }
  @media screen and (min-width: 1050px) {
    grid-template-columns: repeat(4, 1fr);
    width: ${({ profileItem }) => profileItem && "calc( (100% / 4) - 64px)"};
  }
  @media screen and (min-width: 1800px) {
    width: ${({ profileItem }) => profileItem && "calc( (100% / 5) - 64px)"};
  }
  @media screen and (min-width: 2000px) {
    width: ${({ profileItem }) => profileItem && "calc( (100% / 6) - 64px)"};
  }
`;

const ImgContainer = styled.div<{ collectionItem: boolean }>`
  width: 100%;
  height: 100%;
  padding-bottom: 100%;
  position: relative;
  overflow: hidden;
  display: block;
  margin: 0;

  border-radius: 8px;

  & > img,
  & > div,
  & > video,
  & > svg,
  & > span,
  & > iframe {
    display: block;
    position: relative;
    position: absolute;
    overflow: hidden;
    width: 100%;
    -webkit-user-select: none;
    user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    border-radius: 11px;
  }

  iframe {
    height: 100%;
    overflow: hidden;
    border-radius: 8px;
    border: 0px;
  }

  & > span {
    position: absolute !important;
  }

  :after {
    content: "";
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 1px solid ${theme.stroke1};
    border-radius: 8px;
    position: absolute;
    z-index: 2;
  }
`;

export default ImgWrapper;
