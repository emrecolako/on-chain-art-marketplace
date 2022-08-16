import type { NextPage, GetStaticProps } from "next"; // Types
import { useState, useRef, useEffect } from "react"; // State management
import styled from "styled-components"; // Styles
import path from "path"; // Interact w/ file system
import fs from "fs"; // Filesystem: Read file data

// Component imports
import CollectionItem from "../components/onchainart/CollectionItem";

import Page from "../components/onchainart/Page";
import { DropdownIcon, SearchIcon } from "../components/onchainart/Icons";

// Constants + Type imports
import { ENS_REGEX } from "../utils/constants";
import {
  HomeCollectionArrayType,
  HomeCollectionType,
} from "../components/onchainart/Types";
// Styles
import { theme } from "../styles/theme";

interface Props {
  collections: Array<HomeCollectionType>;
}

const Home: NextPage<Props> = ({ collections }) => {
  // States
  const [searchText, setSearchText] = useState(""); // Search value
  const [dropdown, setDropdown] = useState("Recent"); // Dropdown Value
  const [collectionOutput, setCollectionOutput] =
    useState<Array<HomeCollectionType>>(collections); // Collections being rendered

  // Refs
  const inputRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);

  // When search input changes, update the rendered data
  useEffect(() => {
    let searchResults: Array<HomeCollectionType> = [];
    collections.map((c: HomeCollectionType) => {
      if (c.name.toLowerCase().includes(searchText.toLowerCase()))
        searchResults.push(c);
    });
    setCollectionOutput(searchResults);
  }, [searchText]);

  // When dropdown data changes, update the rendered data
  useEffect(() => {
    let sortedArray: Array<HomeCollectionType>;
    switch (dropdown) {
      // Alphabetical
      case "Name":
        sortedArray = collections.sort(
          (a: HomeCollectionType, b: HomeCollectionType) => {
            const aName = a.name.toLowerCase();
            const bName = b.name.toLowerCase();
            return aName < bName ? -1 : bName > aName ? 1 : 0;
          }
        );
        setCollectionOutput([...sortedArray]);
        break;
      // Sort by Number
      case "Rating":
        sortedArray = collections.sort(
          (a: HomeCollectionType, b: HomeCollectionType) => {
            // If same rating, sort by alphabetical
            if (b.rating === a.rating) {
              const aName = a.name.toLowerCase();
              const bName = b.name.toLowerCase();
              return aName < bName ? -1 : bName > aName ? 1 : 0;
            }
            return b.rating - a.rating;
          }
        );
        setCollectionOutput([...sortedArray]);
        break;
      // Sort ENS alphabetically first. Then sort 0x123..
      case "Creator":
        sortedArray =
          collections &&
          collections.sort(function (
            a: HomeCollectionType,
            b: HomeCollectionType
          ) {
            const getName = (collection: HomeCollectionType): string => {
              return collection.ensName
                ? collection.ensName.toLowerCase()
                : collection.creatorAddress.toLowerCase();
            };
            const aName: string = getName(a);
            const bName: string = getName(b);

            // Comparing creator addresses. Sort ".eth" address first (a-z), Then sort 0x123... address
            // If both are ENS, compare to sort (a-z)
            if (ENS_REGEX.test(aName) && ENS_REGEX.test(bName)) {
              return aName < bName ? -1 : aName > bName ? 1 : 0;
            }
            // If "a" is ENS, but "b" is not ENS, place "a" in front
            else if (ENS_REGEX.test(aName) && !ENS_REGEX.test(bName)) {
              return -1;
            }
            // If "a" is not ENS, but "b" is ENS, place "b" in front
            else if (!ENS_REGEX.test(bName) && ENS_REGEX.test(bName)) {
              return 1;
            }
            // If neither are ENS, send to back.
            return aName < bName ? 1 : aName > bName ? -1 : 0;
          });
        setCollectionOutput([...sortedArray]);
        break;
      // Sort by earliest date
      case "Created":
        sortedArray =
          collections &&
          collections.sort(
            (a: HomeCollectionType, b: HomeCollectionType) =>
              b.createdDate - a.createdDate
          );
        setCollectionOutput([...sortedArray]);
        break;
      // Sort by earliest date
      case "Recent":
        setCollectionOutput([...collections]);
        break;
      default:
        setCollectionOutput([...collections]);
    }
  }, [dropdown]);

  /**
   *  Handle search input focus
   */
  const handleInputFocus = (): void => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  /**
   *  Handle select filter focus
   */
  const handleSelectFocus = (): void => {
    if (selectRef.current) {
      selectRef.current.focus();
    }
  };

  /**
   * Handle select filter change
   * @param e: Select value
   */
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setDropdown(e.target.value);
  };

  /**
   * Handle search input change
   * @param e: Search value
   */
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchText(e.target.value);
  };

  return (
    <Page>
      {/* Navigation bar: search + filter */}
      <Nav>
        <SearchInput onClick={() => handleInputFocus()}>
          <SearchIcon />
          <input
            value={searchText}
            ref={inputRef}
            placeholder={`Search Collections`}
            onChange={(e) => handleInput(e)}
          ></input>
        </SearchInput>
        <SelectContainer onClick={() => handleSelectFocus()}>
          <div>
            <select
              ref={selectRef}
              value={dropdown}
              onChange={(e) => handleSelect(e)}
            >
              {["Recent", "Created", "Rating", "Name", "Creator"].map(
                (text, i) => (
                  <option value={text} key={i}>
                    {text}
                  </option>
                )
              )}
            </select>
            <DropdownIcon />
          </div>
        </SelectContainer>
      </Nav>
      {/* Rendering collections */}
      <ProjectContainer>
        {collectionOutput?.map((c: HomeCollectionType, i: number) => {
          return (
            <CollectionItem
              key={i}
              name={c.name}
              creatorName={
                c.ensName && c.ensName !== "null" ? c.ensName : c.creatorAddress
              }
              rating={c.rating}
              url={c.assets}
              slug={c.slug}
            />
          );
        })}
      </ProjectContainer>
    </Page>
  );
};

const Nav = styled.div`
  column-gap: 24px;
  border-bottom: 1px solid ${theme.stroke1};
  background: white;
  z-index: 99;
  height: 96px;

  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 128px;

  @media screen and (max-width: 450px) {
    grid-template-columns: 1fr 120px;
    column-gap: 8px;
  }
`;

const ProjectContainer = styled.div`
  overflow-x: hidden;
  display: grid;
  justify-content: start;
  grid-template-columns: repeat(1, 1fr);
  overflow-x: hidden;
  padding-bottom: 56px;

  @media screen and (min-width: 560px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (min-width: 850px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (min-width: 1050px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media screen and (min-width: 1800px) {
    grid-template-columns: repeat(5, 1fr);
  }
  @media screen and (min-width: 2000px) {
    grid-template-columns: repeat(6, 1fr);
  }
`;

const SearchInput = styled.div`
  grid-column: 1;
  grid-row: 1;
  background: ${theme.bg2};
  box-sizing: border-box;
  border-radius: 4px;
  border-radius: ${theme.borderRadius};
  padding: 14px 0 14px 16px;
  display: flex;
  align-items: center;
  margin: 24px 0 24px 32px;
  svg {
    position: relative;
    margin-right: 10px;
    bottom: -1px;
  }
  input {
    background: ${theme.bg2};
    width: 100%;
    border: 0px;
    color: ${theme.text1};
    font-size: ${theme.size1};
    transform: scale(0.875);
    transform-origin: left center;
    margin-right: -14.28%;
  }
  input::placeholder {
    color: ${theme.text2};
  }
  path {
    fill: ${theme.text2};
  }
`;

const SelectContainer = styled.div`
  grid-column: 2;
  grid-row: 1;
  display: flex;
  align-items: center;
  margin-right: 24px;
  height: 100%;
  border-radius: 8px;
  select {
    border: 0px;
    padding: 15.5px 12px;
    /* reset */
    grid-column: 1;
    grid-row: 1;
    margin: 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-appearance: none;
    -moz-appearance: none;
    padding-right: 8px;
    border-radius: ${theme.borderRadius};
    width: 100%;
    color: ${theme.text1};
    background: ${theme.bg2};
  }
  & > div {
    display: flex;
    width: 100%;
    align-items: center;
    justify-items: end;
  }
  svg {
    position: absolute;
    right: 36px;
    margin-top: 2px;
  }
  path {
    stroke: ${theme.text2};
  }
`;

// Load JSON data locally
export const getStaticProps: GetStaticProps = async (context) => {
  const dataFilePath = path.join(process.cwd(), "data", "homeData.json");
  const fileContents = fs.readFileSync(dataFilePath, "utf8");
  const data: HomeCollectionArrayType = JSON.parse(fileContents);
  const collectionsUnfiltered: Array<HomeCollectionType> =
    data.collections.filter((c) => c.rating !== 0);
  const collections =
    collectionsUnfiltered &&
    collectionsUnfiltered.sort(
      (a: HomeCollectionType, b: HomeCollectionType) =>
        b.dateAdded - a.dateAdded
    );
  return { props: { collections } };
};

export default Home;
