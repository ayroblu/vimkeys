const debug = true;

export function log(...args: any[]) {
  if (debug) {
    console.log(...args);
  }
}
