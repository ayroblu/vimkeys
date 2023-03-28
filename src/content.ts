import { insertText } from "./insert-text";
import { modeHelper } from "./modeHelper";
import { Keymap } from "./types";

browser.runtime.sendMessage({ greeting: "hello" }).then((response) => {
  console.log("Received response: ", response);
});

browser.runtime.onMessage.addListener(
  (request: any, _sender: any, _sendResponse: any) => {
    console.log("Received request: ", request);
  }
);
const mode = modeHelper();

addEventListener("keydown", handleKeyEvent, true);

function handleKeyEvent(event: KeyboardEvent) {
  const key = getKey(event);
  const mapped = (mode.getState() ?? getKeymap(event))[key];
  // I don't think this handles modifier presses well
  if (mapped) {
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
      event.shiftKey ? "S-" : null,
    ]
      .filter(Boolean)
      .join("") + event.key
  );
}
// to handle p + pa, we need to add a "default" option
const normalKeymaps: Keymap = {
  j: () => scrollBy(0, 50),
  k: () => scrollBy(0, -50),
  d: () => scrollBy(0, window.innerHeight / 2),
  u: () => scrollBy(0, -window.innerHeight / 2),
  "'": () => (mode.value = "insert"),
};
const insertKeymaps: Keymap = {
  j: {
    k: () => {
      mode.value = "normal";
    },
  },
  '"': () => {
    mode.value = "normal";
  },
};
const insertInputKeymaps: Keymap = {
  'C-"': () => (mode.value = "normal"),
  j: {
    k: () => (mode.value = "normal"),
  },
};

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
