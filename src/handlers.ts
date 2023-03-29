import { mode } from "./mode-helper";
import { clearLinks } from "./links-tags";
import { getScrollable } from "./scroll";
import { sendMessage } from "./messaging";

export { showLinkTags, handleLinkFn } from "./links-tags";

export const scrollDownABit = () => getScrollable().scrollBy(0, 50);
export const scrollUpABit = () => getScrollable().scrollBy(0, -50);
export const scrollDownHalfPage = () =>
  getScrollable().scrollBy(0, window.innerHeight / 2);
export const scrollUpHalfPage = () =>
  getScrollable().scrollBy(0, -window.innerHeight / 2);
export const insertMode = () => (mode.value = "insert");
export const normalMode = () => (mode.value = "normal");
export const clearLinksAndNormal = () => {
  clearLinks();
  normalMode();
};
export const duplicateTab = () =>
  sendMessage<"duplicateTab">({ type: "duplicateTab" });

// Not supported in safari: https://developer.apple.com/documentation/safariservices/safari_web_extensions/assessing_your_safari_web_extension_s_browser_compatibility
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
