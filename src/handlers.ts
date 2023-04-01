import { mode } from "./mode-helper";
import { clearLinks } from "./links-tags";
import { getScrollable, handleScrollToBottom, scrollHalfPage } from "./scroll";
import { sendMessage } from "./messaging";
import { searchTabs } from "./search-bar";

export { showLinkTags, handleLinkFn } from "./links-tags";
export { hideSearchBar } from "./search-bar";

export const scrollDownABit = () => getScrollable().scrollBy(0, 50);
export const scrollUpABit = () => getScrollable().scrollBy(0, -50);
export const scrollLeftABit = () => getScrollable().scrollBy(-50, 0);
export const scrollRightABit = () => getScrollable().scrollBy(50, 0);
export const scrollDownHalfPage = () => scrollHalfPage("down");
export const scrollUpHalfPage = () => scrollHalfPage("up");
export const scrollToTop = () => getScrollable().scrollTo(0, 0);
export const scrollToBottom = () => handleScrollToBottom();
export const insertMode = () => (mode.value = "insert");
export const normalMode = () => (mode.value = "normal");
export const clearLinksAndNormal = () => {
  clearLinks();
  normalMode();
};
export const duplicateTab = () =>
  sendMessage<"duplicateTab">({ type: "duplicateTab" });
export const newTabNextToCurrent = () =>
  sendMessage<"newTabNextToCurrent">({ type: "newTabNextToCurrent" });
export const tabsSearch = () => searchTabs("");

// Not supported in safari: https://developer.apple.com/documentation/safariservices/safari_web_extensions/assessing_your_safari_web_extension_s_browser_compatibility
// export const bookmarksSearch = () => searchBookmarks("");
// export const moveTabLeft = () =>
//   getCurrentTab().then((tab) => {
//     if (!tab || !tab.id) return;
//     browser.tabs.move(tab.id, { index: tab.index - 1 });
//   });

// export const moveTabRight = () =>
//   getCurrentTab().then((tab) => {
//     if (!tab || !tab.id) return;
//     browser.tabs.move(tab.id, { index: tab.index + 1 });
//   });
