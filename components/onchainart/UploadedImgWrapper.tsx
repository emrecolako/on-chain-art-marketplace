import styled from "styled-components"; // Styles
import { theme } from "../../styles/theme"; // Styles

interface Props {
  children: React.ReactElement;
}

/**
 * Submit Page uploaded image container
 * @param { children } image, video or svg (div innerHTML) tags
 */
const UploadedImageWrapper = ({ children }: Props) => {
  return (
    <ImgWidth>
      <ImgContainer>{children}</ImgContainer>
    </ImgWidth>
  );
};

const ImgWidth = styled.div`
  display: inline-block;
  width: 100%;
  flex-shrink: 0;
  border-radius: 8px;
`;

const ImgContainer = styled.div`
  width: 100%;
  padding-bottom: 100%;
  position: relative;
  overflow: hidden;
  display: block;
  margin: 0;

  & > img,
  & > video,
  & > svg,
  & > span {
    display: block;
    position: absolute;
    overflow: hidden;
    width: 100%;
    object-fit: contain;
    border-radius: 8px;
    -webkit-user-select: none;
    user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    pointer-events: none;
    z-index: -1;
  }
  :after {
    content: "";
    pointer-events: none;
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

export default UploadedImageWrapper;
