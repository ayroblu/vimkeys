export type Mode = "insert" | "normal";
export type Keymap = { [key: string]: (() => void) | Keymap };
