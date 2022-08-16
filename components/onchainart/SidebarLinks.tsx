// Editing: https://emilkowal.ski/ui/tabs
import { useRouter } from "next/router"; // Next router
import Link from "next/link"; // Next link
import React, { useState, useRef } from "react"; // State management
import styled from "styled-components"; // Styles

// Components
import {
  CollectionMediumIcon,
  InfoMediumIcon,
  ReadingMediumIcon,
  TwitterMediumIcon,
  CC0Icon,
} from "./Icons";

// Types
import { LinkType, HighlightStyles, BoundingClientRect } from "./Types";
import { theme } from "../../styles/theme";

/**
 * Sidebar link data + animation
 */
const SideBarLinks = () => {
  const data: Array<LinkType> = [
    {
      title: "On-Chain ",
      url: "/",
      icon: <CollectionMediumIcon />,
    },
    
    {
      title: "CC0 Collections",
      url: "/cc0",
      icon: <CC0Icon />,
    },
    {
      title: "What is on-chain art?",
      url: "/info",
      icon: <InfoMediumIcon />,
    },
    {
      title: "Readings",
      url: "/readings",
      icon: <ReadingMediumIcon />,
    },
    {
      title: "Twitter",
      url: "https://twitter.com/0xchainart",
      icon: <TwitterMediumIcon />,
    },
  ];

  // States
  // Link + Link Box size + padding
  const [linkBox, setLinkBox] = useState<BoundingClientRect | null>(null);
  const [linkContainerBox, setLinkContainerBox] =
    useState<BoundingClientRect | null>(null);
  // Current highlighted Link
  const [highlightedLink, setHighlightedLink] = useState<boolean>(false);
  // Did cursor come from outside LinkContainerBox?
  const [isHoveredFromNull, setIsHoveredFromNull] = useState<boolean>(true);
  const router = useRouter();

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
    // Come from outside the Container? return true. Come from Link? return false
    setIsHoveredFromNull(!highlightedLink);
    setHighlightedLink(true);
  };

  // Going outside the Link Container. Reset values.
  const resetHighlight = (): void => {
    setHighlightedLink(false);
    setIsHoveredFromNull(true);
  };

  // Faster than useEffect()
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
    highlightStyles.transform = `translateY(${
      linkBox.top - linkContainerBox.top
    }px)`;
  }

  return (
    <>
      <LinkContainer ref={linkContainerRef} onMouseLeave={resetHighlight}>
        <LinkHighlight style={highlightStyles} />
        {data.map((link: LinkType, i: number) => {
          return (
            <Link key={i} href={link.url} passHref>
              <LinkStyles
                selected={router.asPath == link.url}
                onMouseOver={repositionHighlight}
                target={link.title === "Twitter" ? "_blank" : undefined}
                rel={link.title === "Twitter" ? "noreferrer" : undefined}
              >
                <SelectedHighlight selected={router.asPath == link.url}>
                  {link.icon}
                  <span>{link.title}</span>
                </SelectedHighlight>
              </LinkStyles>
            </Link>
          );
        })}
      </LinkContainer>
    </>
  );
};

const LinkContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  row-gap: 2px;
`;

const SelectedHighlight = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: center;
  padding: 8px 8px 8px 16px;

  background: ${({ selected }) => selected && theme.bg2};
  border-radius: 8px;
  height: 37px;
  transition: 0.15s ease;
  transition-property: width, transform, opacity;
  width: 200px;
`;

const LinkStyles = styled.a<{ selected: boolean }>`
  font-weight: 500;
  display: inline-block;
  position: relative;
  cursor: pointer;
  transition: color 250ms;

  display: flex;
  align-items: center;
  border-radius: 8px;
  width: 200px;

  div > svg {
    margin-right: 10px;

    & > path {
      stroke: ${({ selected }) =>
        selected ? `hsl(0 0% 9%)` : `hsl(0 0% 43.5%)`};
      transition: stroke 250ms;
    }
  }

  div > span {
    font-weight: 500;
    transition: color 250ms;
    color: ${({ selected }) => (selected ? `hsl(0 0% 9%)` : `hsl(0 0% 43.5%)`)};
  }

  &:hover {
    span {
      color: hsl(0 0% 9%);
    }
    path {
      stroke: hsl(0 0% 9%);
    }
  }
`;

const LinkHighlight = styled.div`
  left: 0;
  position: absolute;
  background: ${theme.bg2};
  border-radius: 8px;
  height: 37px;
  transition: 0.15s ease;
  transition-property: width, transform, opacity;
  width: 200px;
`;

export default SideBarLinks;
