export type Mode = "insert" | "normal" | "links";
export type Keymap = { [key: string]: (() => void) | Keymap };
export type Highlight = {
  el: HTMLElement;
  text: string | undefined;
  originalEl: HTMLElement;
  rect: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  numLabel: string;
  setEligible: (eligible: boolean) => void;
};

export type BackgroundMessageAction<Req extends object, Res extends object> = {
  request: Req;
  response: Res;
};
type DuplicateAction = BackgroundMessageAction<{ type: "duplicateTab" }, {}>;
type GreetingAction = BackgroundMessageAction<
  { type: "greeting"; greeting: string },
  { farewell: string }
>;
export type Actions = {
  duplicateTab: DuplicateAction;
  greeting: GreetingAction;
};
export type MessageListener<K extends keyof Actions> = (
  request: Actions[K]["request"],
  sender: browser.runtime.MessageSender,
  sendResponse: (resp: Actions[K]["response"]) => void
) => void;
