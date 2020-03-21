chrome.runtime.sendMessage({ translate: document.body.innerHTML }, html => {
    document.body.innerHTML = html
})
