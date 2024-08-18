import { Keymap } from "./types";
import * as handlers from "./handlers";
import { log } from "./log";
import { mode } from "./mode-helper";

// to handle p + pa, we need to add a "default" option
const normalKeymaps: Keymap = {
  " ": {
    t: handlers.newTabNextToCurrent,
    Tab: handlers.tabsSearch,
  },
  j: handlers.scrollDownABit,
  k: handlers.scrollUpABit,
  h: handlers.scrollLeftABit,
  l: handlers.scrollRightABit,
  d: handlers.scrollDownHalfPage,
  u: handlers.scrollUpHalfPage,
  f: handlers.showLinkTags,
  g: {
    g: handlers.scrollToTop,
  },
  G: handlers.scrollToBottom,
  y: {
    t: handlers.duplicateTab,
  },
  // "M-S-9": handlers.moveTabLeft,
  // "M-S-0": handlers.moveTabRight,
  "'": handlers.insertMode,
};
const normalInputKeymaps: Keymap = {
  "C-'": handlers.insertMode,
  // j: {
  //   k: handlers.normalMode,
  // },
};
const insertKeymaps: Keymap = {
  '"': handlers.normalMode,
  " ": {
    t: handlers.newTabNextToCurrent,
    " ": handlers.normalMode,
    Tab: handlers.tabsSearch,
  },
};
const insertInputKeymaps: Keymap = {
  'C-"': handlers.normalMode,
  // j: {
  //   k: handlers.normalMode,
  // },
};
const linksKeymaps: Keymap = {
  other: handlers.clearLinksAndNormal,
};
const searchKeymaps: Keymap = {
  Escape: handlers.hideSearchBar,
};
const alpha = [
  ...Array.from(Array(10)).map((_, i) => i + 48),
  ...Array.from(Array(26)).map((_, i) => i + 65),
  ...Array.from(Array(26)).map((_, i) => i + 97),
].map((x) => String.fromCharCode(x));
alpha.push("Backspace");
alpha.forEach((char) => (linksKeymaps[char] = handlers.handleLinkFn(char)));

export function getKeymap(event: KeyboardEvent): Keymap {
  switch (mode.value) {
    case "normal":
      if (getIsInputTarget(event)) {
        return normalInputKeymaps;
      } else {
        return normalKeymaps;
      }
    case "insert":
      if (getIsInputTarget(event)) {
        log("is insert");
        return insertInputKeymaps;
      } else {
        return insertKeymaps;
      }
    case "links":
      return linksKeymaps;
    case "search":
      return searchKeymaps;
    default:
      const exhaustiveCheck: never = mode.value;
      throw new Error(`Unhandled getKeymap case: ${exhaustiveCheck}`);
  }
}

export function getIsInputTarget(event: KeyboardEvent) {
  return (
    event.target instanceof HTMLElement &&
    (event.target.nodeName == "INPUT" ||
      event.target.nodeName == "TEXTAREA" ||
      event.target.isContentEditable)
  );
}
