import React from "react"; // React
import Link from "next/link"; // Next link
import styled from "styled-components"; // Styles
import { theme } from "../../styles/theme"; // Styles

interface Props {
  href: string;
  Icon: React.ElementType;
  title: string;
  currentRoute: string;
}

/**
 * Sidebar + Collection Page: Link Item
 */
const LinkItem = ({ href, Icon, title, currentRoute }: Props) => {
  return (
    <>
      <Link href={href} passHref>
        <a target={title.match("Twitter") ? "_blank" : "_self"}>
          <BorderContainer
            questionMark={title.includes("What is on-chain art?")}
            highlight={currentRoute === href}
          >
            <Icon />
            <span>{title}</span>
          </BorderContainer>
        </a>
      </Link>
    </>
  );
};

const BorderContainer = styled.div<{
  questionMark?: boolean;
  highlight: boolean;
}>`
  display: flex;
  align-items: center;
  border-radius: 8px;
  padding: 8px 8px 8px 16px;
  width: 200px;
  // transition: background-color 0.15s;
  background-color: ${({ highlight }) => highlight && theme.bg2};

  span {
    color: ${({ highlight, theme }) => highlight && theme.text1};
    font-weight: 500;
    // transition: color 0.15s;
  }

  path {
    stroke: ${({ highlight, questionMark, theme }) =>
      highlight && !questionMark && theme.text1};
  }

  // SVG for "What is on-chain art?"
  path:nth-child(odd) {
    stroke: ${({ highlight, questionMark, theme }) =>
      highlight && questionMark && theme.text1};
    // transition: stroke 0.15s;
  }

  path:nth-child(even) {
    fill: ${({ highlight, questionMark, theme }) =>
      highlight && questionMark && theme.text1};
    // transition: fill 0.15s;
  }

  :hover {
    cursor: pointer;
    background-color: ${theme.bg2};
  }

  // All SVGs besides "What is on-chain art?"
  :hover path {
    stroke: ${({ questionMark, theme }) => !questionMark && theme.text1};
  }

  // SVG for "What is on-chain art?"
  :hover path:nth-child(odd) {
    stroke: ${({ questionMark, theme }) => questionMark && theme.text1};
  }
  :hover path:nth-child(even) {
    fill: ${({ questionMark, theme }) => questionMark && theme.text1};
  }

  :hover > span {
    color: ${({ theme }) => theme.text1};
  }

  svg {
    margin-right: 10px;
  }
`;

export default LinkItem;
