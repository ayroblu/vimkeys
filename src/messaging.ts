import { Actions, MessageListener } from "./types";

export function addMessageListener<K extends keyof Actions>(
  cb: MessageListener<K>
) {
  browser.runtime.onMessage.addListener(cb as browser.runtime.onMessageEvent);
}
export function sendMessage<K extends keyof Actions>(
  req: Actions[K]["request"]
): Promise<Actions[K]["response"]> {
  return browser.runtime.sendMessage(req);
}
