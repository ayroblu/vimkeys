import { sendMessage } from "./messaging";
import { mode } from "./mode-helper";

let mountedBar: { el: HTMLElement; list: HTMLElement } | null = null;
export async function searchTabs(query: string) {
  const list = searchBar();
  const response = await sendMessage<"searchTabs">({
    type: "searchTabs",
    query,
  });
  console.log("bm response", response);
  for (const tab of response) {
    const el = document.createElement("div");
    Object.assign(el.style, {
      borderBottom: "1px solid #888",
    });
    if (tab.title) {
      el.innerText = tab.title;
    }
    list.appendChild(el);
  }
}
function searchBar() {
  if (!mountedBar) {
    mountedBar = createSearchBar();
  }
  const { el, list } = mountedBar;
  el.style.display = "block";
  list.innerHTML = "";
  mode.value = "search";
  console.log(mode.value);
  return list;
}
function createSearchBar() {
  const el = document.createElement("div");
  Object.assign(el.style, {
    width: "80vw",
    maxHeight: "80vh",
    overflow: "auto",
    backgroundColor: "black",
    color: "white",
    position: "fixed",
    top: "20vh",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: "1",
  });
  const input = document.createElement("input");
  Object.assign(input.style, {
    width: "100%",
    fontSize: "1.2rem",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    padding: "4px 8px",
  });
  el.appendChild(input);
  const list = document.createElement("div");
  list.classList.add("__vimkeys__list");
  el.appendChild(list);

  document.body.appendChild(el);
  input.focus();
  return { el, list };
}
export function hideSearchBar() {
  if (!mountedBar) return;
  const { el } = mountedBar;
  el.style.display = "none";
  mode.value = "normal";
}
