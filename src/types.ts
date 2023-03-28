export type Mode = "insert" | "normal" | "links";
export type Keymap = { [key: string]: (() => void) | Keymap };
