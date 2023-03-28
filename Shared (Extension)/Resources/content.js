"use strict";
browser.runtime.sendMessage({ greeting: "hello" }).then((response) => {
    console.log("Received response: ", response);
});
browser.runtime.onMessage.addListener((request, _sender, _sendResponse) => {
    console.log("Received request: ", request);
});
let isActive = false;
addEventListener("keydown", (event) => {
    if (!isActive) {
        if (event.target instanceof HTMLElement &&
            (event.target.nodeName == "INPUT" ||
                event.target.nodeName == "TEXTAREA" ||
                event.target.isContentEditable)) {
            if (event.key === '"' && event.ctrlKey) {
                event.preventDefault();
                isActive = true;
            }
        }
        else {
            if (event.key === '"') {
                event.preventDefault();
                isActive = true;
            }
        }
        return;
    }
    if (event.key === "j") {
        event.preventDefault();
        scrollBy(0, 50);
    }
    else if (event.key === "k") {
        event.preventDefault();
        scrollBy(0, -50);
    }
    else if (event.key === "d") {
        event.preventDefault();
        scrollBy(0, window.innerHeight / 2);
    }
    else if (event.key === "u") {
        event.preventDefault();
        scrollBy(0, -window.innerHeight / 2);
    }
    else if (event.key === "'") {
        event.preventDefault();
        isActive = false;
    }
}, true);
