import { addMessageListener } from "./messaging";

addMessageListener((request, sender, sendResponse) => {
  switch (request.type) {
    case "duplicateTab":
      if (!sender.tab?.id) return;
      browser.tabs.duplicate(sender.tab.id);
      return;
    case "greeting":
      return request.greeting === "hello"
        ? sendResponse({ farewell: "goodbye" })
        : undefined;
    default:
      const exhaustiveCheck: never = request;
      throw new Error(`non exhaustive request.type ${exhaustiveCheck}`);
  }
});
