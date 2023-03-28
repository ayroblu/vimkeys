browser.runtime.sendMessage({ greeting: "hello" }).then((response) => {
    console.log("Received response: ", response);
});

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Received request: ", request);
});
let isActive = false;
addEventListener('keydown', (event) => {

//    if( e.target.nodeName == "INPUT" || e.target.nodeName == "TEXTAREA" ) return;
//    if( e.target.isContentEditable ) return;
    if (!isActive) {
        if (event.key === '"') {
            event.preventDefault();
            isActive = true;
        }
        return;
    }
    if (event.key === 'j') {
        event.preventDefault();
        scrollBy(0, 50);
    } else if (event.key === 'k') {
        event.preventDefault();
        scrollBy(0, -50);
    } else if (event.key === 'd') {
        event.preventDefault();
        scrollBy(0, window.innerHeight/2);
    } else if (event.key === 'u') {
        event.preventDefault();
        scrollBy(0, -window.innerHeight/2);
    } else if (event.key === '\'') {
        event.preventDefault();
        isActive = false;
    }
}, true)
