// Editing: https://emilkowal.ski/ui/tabs
import React, { useState, useRef } from "react"; // State management
import styled from "styled-components"; // Styles

// Components
import { ArrowLinkIcon } from "./Icons";

// Types + Styles
import { LinkType, HighlightStyles, BoundingClientRect } from "./Types";
import { theme } from "../../styles/theme";

interface Props {
  linkData: Array<LinkType>;
}

/**
 * Profile page: Link Wrapper Animation
 */
const LinkWrapper = ({ linkData }: Props) => {
  // States
  const [linkBox, setLinkBox] = useState<BoundingClientRect | null>(null); // Link padding
  const [linkContainerBox, setLinkContainerBox] =
    useState<BoundingClientRect | null>(null); // Link Box size padding
  const [highlightedLink, setHighlightedLink] = useState<boolean>(false); // Current highlighted Link
  const [isHoveredFromNull, setIsHoveredFromNull] = useState<boolean>(true); // Cursor come from outside linkContainerBox?

  // Ref
  const linkContainerRef = useRef<HTMLDivElement>(null);

  // Movement inside LinkContainer
  const repositionHighlight = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Get Link + Link Box dimensions
    setLinkBox(e.currentTarget.getBoundingClientRect());
    setLinkContainerBox(
      linkContainerRef.current &&
        linkContainerRef.current.getBoundingClientRect()
    );
    // Come from outside the Container? return true. Come inside Container? return false
    setIsHoveredFromNull(!highlightedLink);
    setHighlightedLink(true);
  };

  // Going outside the Link Container. Reset values.
  const resetHighlight = (): void => {
    setHighlightedLink(false);
    setIsHoveredFromNull(true);
  };

  // Smoother than useEffect()
  const highlightStyles: HighlightStyles = {
    opacity: 0,
    transform: "",
    transitionDuration: "",
    width: "",
  };
  if (linkBox && linkContainerBox) {
    // If coming from outside Container, 0ms animation. If coming from link, 150ms
    highlightStyles.transitionDuration = isHoveredFromNull ? "0ms" : "150ms";
    highlightStyles.opacity = highlightedLink ? 1 : 0;
    highlightStyles.width = `${linkBox.width}px`;
    highlightStyles.transform = `translate(${
      linkBox.left - linkContainerBox.left
    }px)`;
  }

  return (
    <LinkContainer ref={linkContainerRef} onMouseLeave={resetHighlight}>
      <LinkHighlight style={highlightStyles} />
      {linkData.map((link: LinkType, i: number) => (
        <Link
          href={link.url}
          target="_blank"
          rel="noreferrer"
          key={i}
          onMouseOver={repositionHighlight}
        >
          {link.title}
          <ArrowLinkIcon />
        </Link>
      ))}
    </LinkContainer>
  );
};

const LinkContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, auto);

  @media screen and (max-width: 550px) {
    grid-template-columns: repeat(2, auto);
    grid-template-rows: repeat(2, auto);
    column-gap: 48px;
  }
`;

const Link = styled.a`
  padding: 16px 12px;
  // color: hsl(0 0% 43.5%);
  color: ${({ theme }) => theme.text1};
  display: inline-block;
  position: relative;
  cursor: pointer;
  transition: color 250ms;

  svg {
    margin-left: 4px;

    & > path {
      transition: fill 250ms;
      // fill: hsl(0 0% 43.5%);
    }
  }

  &:hover {
    // color: hsl(0 0% 9%);
    path {
      fill: hsl(0 0% 9%);
    }
  }
`;

const LinkHighlight = styled.div`
  background: ${theme.bg2};
  position: absolute;
  top: 10px;
  left: 0;
  border-radius: 8px;
  height: 32px;
  transition: 0.15s ease;
  transition-property: width, transform, opacity;
`;

export default LinkWrapper;
