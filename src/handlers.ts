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
export const moveTabLeft = () =>
  browser.tabs.getCurrent().then(({ id, index }) => {
    if (!id) return;
    browser.tabs.move(id, { index: index - 1 });
  });

export const moveTabRight = () =>
  browser.tabs.getCurrent().then(({ id, index }) => {
    if (!id) return;
    browser.tabs.move(id, { index: index + 1 });
  });
