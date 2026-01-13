
(() => {
    const body = document.body;
    if (!body) return;
    const header = document.createElement("header");
    const footer = document.createElement("footer");
    body.prepend(header);
    body.appendChild(footer);
})();