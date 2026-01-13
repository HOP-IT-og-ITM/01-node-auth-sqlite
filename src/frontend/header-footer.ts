(() => {
    const body = document.body;
    if (!body) return;
    const header = document.createElement("header");
    const footer = document.createElement("footer");
    header.innerHTML = "<h1> YO dude</h1>";
    body.prepend(header);
    body.appendChild(footer);

    const footerIMG = document.createElement("img");
    footerIMG.src = "./img/footer-img.svg";
    const lederText = document.createElement("p");
    lederText.innerText = "Ansvarlig leder: Thomas \"The GOAT\" Johansen!";
    footer.append(footerIMG, lederText);
})();