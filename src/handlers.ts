import { mode } from "./mode-helper";
import { clearLinks } from "./links-tags";

export { showLinkTags, handleLinkFn } from "./links-tags";

export const scrollDownABit = () => scrollBy(0, 50);
export const scrollUpABit = () => scrollBy(0, -50);
export const scrollDownHalfPage = () => scrollBy(0, window.innerHeight / 2);
export const scrollUpHalFPage = () => scrollBy(0, -window.innerHeight / 2);
export const insertMode = () => (mode.value = "insert");
export const normalMode = () => (mode.value = "normal");
export const clearLinksAndNormal = () => {
  clearLinks();
  normalMode();
};
