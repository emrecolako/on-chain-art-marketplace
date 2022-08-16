// ==== CONST: FORM LENGTHS + REGEX ====
export const CREATOR_MAX_LENGTH = 42;
export const MEDIA_MAX_LENGTH = 8;
export const WEBSITE_REGEX =
  /(?!.*")(((https?|ftp|smtp):\/\/)(www.)?[a-zA-Z0-9]+\.[A-Za-z\.\-]+(\/[a-zA-Z0-9#\-]+\/??)*)/g;
export const BASE_WEBSITE_REGEX =
  /((?!(ftp|http|https):\/\/)?(?!(w))[a-zA-Z0-9]+\.[A-Za-z\.\-]+)/g;
export const ETH_REGEX = /^0x[a-fA-F0-9]{40}$/;
export const ENS_REGEX = /^[a-zA-Z0-9]{2,}\.eth$/;

// ERC165: inside ERC721 contracts. Helps us validate if address is ERC721
export const ERC721InterfaceId: string = "0x80ac58cd";
export const ERC165Abi: any = [
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
