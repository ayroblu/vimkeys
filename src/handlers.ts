import { mode } from "./mode-helper";
import { clearLinks } from "./links-tags";
import { getScrollable } from "./scroll";

export { showLinkTags, handleLinkFn } from "./links-tags";

export const scrollDownABit = () => getScrollable().scrollBy(0, 50);
export const scrollUpABit = () => getScrollable().scrollBy(0, -50);
export const scrollDownHalfPage = () =>
  getScrollable().scrollBy(0, window.innerHeight / 2);
export const scrollUpHalFPage = () =>
  getScrollable().scrollBy(0, -window.innerHeight / 2);
export const insertMode = () => (mode.value = "insert");
export const normalMode = () => (mode.value = "normal");
export const clearLinksAndNormal = () => {
  clearLinks();
  normalMode();
};
