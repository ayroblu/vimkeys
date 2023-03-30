import { addMessageListener } from "./messaging";

// Message listener disposal appears to be handled automatically in background?
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
    case "newTabNextToCurrent":
      const currentIndex = sender.tab?.index;
      if (currentIndex === undefined) return;
      browser.tabs.create({ index: currentIndex + 1 });
      return;
    default:
      const exhaustiveCheck: never = request;
      throw new Error(`non exhaustive request.type ${exhaustiveCheck}`);
  }
});
