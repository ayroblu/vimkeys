// There two parts
// 1. List all "scrollable" elements
// 2. Update scrollable element based on last scrolled
export function getScrollable(): Window | HTMLElement {
  if (lastTarget) {
    return lastTarget;
  }
  const items = [...document.querySelectorAll("*")].filter(
    (el): el is HTMLElement =>
      el instanceof HTMLElement &&
      el.clientHeight > 0 &&
      el.scrollHeight > el.clientHeight &&
      (() => {
        const overflowY = window.getComputedStyle(el).overflowY;
        return overflowY !== "visible" && overflowY !== "hidden";
      })()
  );
  if (items.length === 0) {
    return window;
  }
  let maxArea = 0;
  let maxItem = items[0];
  for (const item of items) {
    const area = item.clientWidth * item.clientHeight;
    if (area > maxArea) {
      maxArea = area;
      maxItem = item;
    }
  }
  lastTarget = maxItem;
  return maxItem;
}
let lastTarget: null | HTMLElement = null;
document.body.addEventListener(
  "scroll",
  (event) => {
    if (event.target instanceof HTMLElement) {
      lastTarget = event.target;
    }
  },
  { passive: true }
);
