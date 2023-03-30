import { Actions, MessageListener } from "./types";

export function addMessageListener<K extends keyof Actions>(
  cb: MessageListener<K>
) {
  const callback = cb as browser.runtime.onMessageEvent;
  browser.runtime.onMessage.addListener(callback);
  return () => {
    browser.runtime.onMessage.removeListener(callback);
  };
}
export function sendMessage<K extends keyof Actions>(
  req: Actions[K]["request"]
): Promise<Actions[K]["response"]> {
  return browser.runtime.sendMessage(req);
}
