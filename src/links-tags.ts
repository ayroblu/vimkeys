import { mode } from "./mode-helper";

let highlightEls: HTMLElement[] = [];
export function showLinkTags() {
  const bodyRect = document.body.getBoundingClientRect();

  let items = [...document.querySelectorAll("*")]
    .filter(
      (el): el is HTMLElement =>
        el instanceof HTMLElement && isElementInViewport(el)
    )
    .map(function (element) {
      var rect = element.getBoundingClientRect();
      return {
        element: element,
        include:
          element.tagName === "BUTTON" ||
          element.tagName === "A" ||
          element.onclick != null ||
          window.getComputedStyle(element).cursor == "pointer",
        rect: {
          left: Math.max(rect.left - bodyRect.x, 0),
          top: Math.max(rect.top - bodyRect.y, 0),
          right: Math.min(rect.right - bodyRect.x, document.body.clientWidth),
          bottom: Math.min(
            rect.bottom - bodyRect.y,
            document.body.clientHeight
          ),
        },
        text: element.textContent?.trim().replace(/\s{2,}/g, " "),
      };
    })
    .filter(
      (item) =>
        item.include &&
        (item.rect.right - item.rect.left) *
          (item.rect.bottom - item.rect.top) >=
          20
    );

  // Only keep inner clickable items
  items = items.filter(
    (x) => !items.some((y) => x.element.contains(y.element) && !(x == y))
  );

  // Lets create a floating border on top of these elements that will always be visible
  highlightEls.forEach((el) => el.remove());
  highlightEls = items.map(function (item) {
    const newElement = document.createElement("div");
    newElement.style.outline = "2px dashed rgba(255,0,0,.75)";
    newElement.style.position = "absolute";
    newElement.style.left = item.rect.left + "px";
    newElement.style.top = item.rect.top + "px";
    newElement.style.width = item.rect.right - item.rect.left + "px";
    newElement.style.height = item.rect.bottom - item.rect.top + "px";
    newElement.style.pointerEvents = "none";
    newElement.style.boxSizing = "border-box";
    newElement.style.zIndex = "2147483647";
    document.body.appendChild(newElement);
    return newElement;
  });
  mode.value = "links";
}

export function clearLinks() {
  highlightEls.forEach((el) => el.remove());
  highlightEls = [];
}
// How to handle links, there's a few different ways
// 1. sequential, e.g. a, b, aa, ab etc
// 2. spacial: where a link at the top of the page is always a, and the link at the bottom is always z
// 3. by link contents: (only works with href / text content links) by the hash value of the link
// 4. by "search": filter by link href and text (doesn't work for icons? - accessibility label)
export function handleLinkFn(char: string) {
  return () => {
    console.log("char", char);
    // todo
  };
}

function isElementInViewport(el: HTMLElement) {
  var rect = el.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight ||
        document.documentElement.clientHeight) /* or $(window).height() */ &&
    rect.right <=
      (window.innerWidth ||
        document.documentElement.clientWidth) /* or $(window).width() */
  );
}
