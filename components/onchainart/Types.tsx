import { ParsedUrlQuery } from "querystring";
export interface IParams extends ParsedUrlQuery {
  name: string;
}

export interface CollectionArrayType {
  collections: Array<CollectionType>;
}

export interface HomeCollectionArrayType {
  collections: Array<HomeCollectionType>;
}

export interface CollectionType {
  rating: number;
  dateAdded: number;
  createdDate: number;
  creatorAddress: string;
  ensName: string | null;
  name: string;
  contractDate: string;
  description: string;
  websiteLink: string;
  slug: string;
  contractAddress: string;
  contractLink: string;
  collectionLink: string;
  assets: Array<string>;
  license: string;
}

export interface HomeCollectionType {
  rating: number;
  dateAdded: number;
  createdDate: number;
  creatorAddress: string;
  ensName: string | null;
  name: string;
  slug: string;
  assets: string;
  license: string;
}

export interface ReadingType {
  title: string | null | undefined;
  url: string;
  baseUrl: string;
  image: string | null | undefined | void;
}

export interface HighlightStyles {
  transitionDuration: string;
  opacity: number;
  width: string;
  transform: string;
}

export interface BoundingClientRect {
  bottom: number;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
  x: number;
  y: number;
}

export interface LinkType {
  title: string;
  url: string;
  icon?: JSX.Element;
}
