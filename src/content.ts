browser.runtime.sendMessage({ greeting: "hello" }).then((response) => {
  console.log("Received response: ", response);
});

browser.runtime.onMessage.addListener(
  (request: any, _sender: any, _sendResponse: any) => {
    console.log("Received request: ", request);
  }
);
let isActive = false;
addEventListener(
  "keydown",
  (event) => {
    if (!isActive) {
      if (
        event.target instanceof HTMLElement &&
        (event.target.nodeName == "INPUT" ||
          event.target.nodeName == "TEXTAREA" ||
          event.target.isContentEditable)
      ) {
        if (event.key === '"' && event.ctrlKey) {
          event.preventDefault();
          isActive = true;
        }
      } else {
        if (event.key === '"') {
          event.preventDefault();
          isActive = true;
        }
      }

      return;
    }
    const key = getKey(event);
    const mappedFunc = keymaps[key];
    if (mappedFunc) {
      event.preventDefault();
      mappedFunc();
    }
  },
  true
);
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
const keymaps: Record<string, () => void> = {
  j: () => scrollBy(0, 50),
  k: () => scrollBy(0, -50),
  d: () => scrollBy(0, window.innerHeight / 2),
  u: () => scrollBy(0, -window.innerHeight / 2),
  "'": () => (isActive = false),
};
