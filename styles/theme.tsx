// theme.js

export type ThemeType = typeof theme;

export const theme = {
  // Light mode
  grey2: "#9C9C9C", // Artist text

  // ===== NEW ======
  // Border radius:
  borderRadius: "8px",

  // Non-monochrome Colours
  red: "#FF7171",
  green: "",

  // Animation
  hoverBorder: "4px",
  hoverTime: "",

  // Sidebar
  sbWidth: "272px",
  hHeight: "96px",

  // Font Details
  font1: "Inter, Arial, serif",
  font2: "Roboto Mono, mono",
  size1: "16px", // Headers
  size2: "14px", // Secondary text
  size3: "18px", // Header text
  size4: "11px", // Minor text
  size5: "24px", // Minor text
  lh1: "24px", // Line Height: Headers
  lh2: "21px", // Line Height: Secondary Text
  weight1: "500", // Headers
  weight2: "400", // Secondary Text

  // Text colors
  text1: "#171717", // Primary (black)
  text2: "#696969", // Secondary (grey)
  text3: "#A7A7A7", // Mute Colors (light grey)

  // Stroke colors
  // stroke1: "rgba(0,0,0,0.1)", // Divides
  stroke1: "#E6E6E6", // Divides (10% black)
  stroke2: "#D9D9D9", // Borders (15% black)
  stroke3: "#d1d1d1", // Submit Button

  // Background colors
  bg1: "#FFFFFF", // White
  bg2: "#F4F4F4", // Inputs + Hovers
  bg3: "#F7F7F7", // Ratings
  bg4: "#B3B3B3", // On Press Buttons
};
