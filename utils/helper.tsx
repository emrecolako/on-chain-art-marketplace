import { micromark } from "micromark";
import { WEBSITE_REGEX } from "./constants";

/**
 * Format 0x1234... address to 0x1234
 * @param {string} creator address
 * @returns {string} formatted creator address
 */
export function getFormatedAddress(address: string): string {
  let formatedAddress = address.substr(0, 6);
  return formatedAddress;
}

/**
 * Converts Markdown to HTML
 * @param {string} md
 * @returns {string} stringify HTML
 */
export const mdToHTML = (md: string): string => {
  let html = micromark(md);

  // Remove HR tags
  html = html.replace(/(<hr[.\s]*\/>)/g, "");
  // Remove headers
  html = html.replace(/<(h[0-9])+(\/)?>/g, "");
  // Remove <strong>
  html = html.replace(/<(\/)?(strong)+>/g, "");
  // Remove stars
  html = html.replace(/[(\*)]+/g, "");
  // Find links (<a> tags) to add target="_blank" rel="noreferrer"
  html = html.replace(
    /(<a)( href=)/g,
    '$1 target="_blank" rel="noreferrer" $2'
  );
  // Find links (www, ftp, https) with no <a> tag + wrap with <a> tag
  html = html.replace(
    WEBSITE_REGEX,
    ' <a href="$1" target="_blank" rel="noreferrer">$1</a>'
  );
  // Find @(.+) for twitter links + wrap with an <a> tag
  html = html.replace(
    /(@)([0-9a-zA-Z_]+)/g,
    '<a href="https://twitter.com/$2" target="_blank" rel="noreferrer">$1$2</a>'
  );
  // Replacing more than one space with one space
  html = html.replace(/[ ]{2,}/g, " ");

  // Replacing all </p>\n with just </p>
  html = html.replace(/([^(<\/p>)])([\n])/g, "$1");

  return html;
};
