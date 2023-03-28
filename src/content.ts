import { insertText } from "./insert-text";
import { mode } from "./mode-helper";
import { Keymap } from "./types";
import * as handlers from "./handlers";
import { log } from "./log";

browser.runtime.sendMessage({ greeting: "hello" }).then((response) => {
  log("Received response: ", response);
});

browser.runtime.onMessage.addListener(
  (request: any, _sender: any, _sendResponse: any) => {
    log("Received request: ", request);
  }
);

addEventListener("keydown", handleKeyEvent, true);

function handleKeyEvent(event: KeyboardEvent) {
  const key = getKey(event);
  const keymap = getKeymap(event);
  log("key", key);
  const mapped = (mode.getState() ?? keymap)[key];
  // I don't think this handles modifier presses well
  if (mapped) {
    log("mapped", mapped);
    event.preventDefault();
    if (typeof mapped === "function") {
      mode.setState(null);
      mode.clearInsertState();
      mapped();
    } else {
      if (getIsInsertInput(event)) {
        const char = event.key;
        if (char.length === 1) {
          mode.addInsertState(char);
        }
      }
      mode.setState(mapped);
    }
  } else if (keymap.other && typeof keymap.other === "function") {
    mode.setState(null);
    mode.clearInsertState();
    keymap.other();
  } else {
    if (getIsInsertInput(event) && event.target instanceof HTMLElement) {
      insertText(event.target, mode.insertState);
    }
    mode.setState(null);
    mode.clearInsertState();
  }
}

function getKey(event: KeyboardEvent) {
  return (
    [
      event.ctrlKey ? "C-" : null,
      event.metaKey ? "M-" : null,
      event.altKey ? "A-" : null,
      event.shiftKey && event.key.toUpperCase() !== event.key ? "S-" : null,
    ]
      .filter(Boolean)
      .join("") + event.key
  );
}
// to handle p + pa, we need to add a "default" option
const normalKeymaps: Keymap = {
  j: handlers.scrollDownABit,
  k: handlers.scrollUpABit,
  d: handlers.scrollDownHalfPage,
  u: handlers.scrollUpHalFPage,
  f: handlers.showLinkTags,
  "'": handlers.insertMode,
};
const insertKeymaps: Keymap = {
  '"': handlers.normalMode,
};
const insertInputKeymaps: Keymap = {
  'C-"': handlers.normalMode,
  j: {
    k: handlers.normalMode,
  },
};
const linksKeymaps: Keymap = {
  other: handlers.clearLinksAndNormal,
};
const alpha = [
  ...Array.from(Array(10)).map((_, i) => i + 48),
  ...Array.from(Array(26)).map((_, i) => i + 65),
  ...Array.from(Array(26)).map((_, i) => i + 97),
];
alpha
  .map((x) => String.fromCharCode(x))
  .forEach((char) => (linksKeymaps[char] = handlers.handleLinkFn(char)));

function getIsInsertInput(event: KeyboardEvent) {
  return mode.value === "insert" && getIsInputTarget(event);
}
function getKeymap(event: KeyboardEvent): Keymap {
  switch (mode.value) {
    case "normal":
      return normalKeymaps;
    case "insert":
      if (getIsInputTarget(event)) {
        return insertInputKeymaps;
      } else {
        return insertKeymaps;
      }
    case "links":
      return linksKeymaps;
    default:
      const exhaustiveCheck: never = mode.value;
      throw new Error(`Unhandled getKeymap case: ${exhaustiveCheck}`);
  }
}
function getIsInputTarget(event: KeyboardEvent) {
  return (
    event.target instanceof HTMLElement &&
    (event.target.nodeName == "INPUT" ||
      event.target.nodeName == "TEXTAREA" ||
      event.target.isContentEditable)
  );
}
