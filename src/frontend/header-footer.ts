(() => {
    const body = document.body;
    const head = document.head;
    if (!body) return;
    if (!head) return;
    head.innerHTML = `
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./style/base.css">
    <link rel="stylesheet" href="./style/om-oss.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
        rel="stylesheet">
    <link rel="icon" href="./img/rabbit.svg" type="image/svg+xml">
    `;
    const header = document.createElement("header");
    const footer = document.createElement("footer");
    //header.innerHTML = "<h1> YO dude</h1>";
    body.prepend(header);
    body.appendChild(footer);
    
    //Creating the FOOTER!👍
    const redaktør = document.createElement("div");
    const bilde = document.createElement("div");
    const om = document.createElement("div");
    footer.append(redaktør, bilde, om);

    const footerIMG = document.createElement("img");
    footerIMG.src = "./img/footer-img.svg";
    bilde.append(footerIMG);

    const lederText = document.createElement("p");
    lederText.innerText = "Ansvarlig leder: Thomas \"The GOAT\" Johansen!";
    const epostText = document.createElement("a");
    epostText.innerText = "Kontaktinformasjon: emgl@hopvgskole.no";
    epostText.href = "mailto:emgl@hopvgskole.no";
    redaktør.append(lederText, epostText);

    const omOss = document.createElement("a");
    omOss.innerText = "Se \"Om oss\" for mer informasjon.";
    const skolen = document.createElement("a");
    skolen.innerText = "Finn ut mer om skolen vår!";
    om.append(omOss, skolen);

    //Creating header
    const bruger = document.createElement("div")
    bruger.id = "burger-manu"
    const facebook = document.createElement("div")
    facebook.id = "facebook-logo"
    const logo = document.createElement("div")
    logo.id = "hopfiks-logo"
    header.append(bruger, facebook, logo)

    const logoIMG = document.createElement("img")
    logoIMG.src = "./img/rabbit.svg";
    logo.append(logoIMG)

    const brugerIMG = document.createElement("img")
    brugerIMG.src = "./img/burger.svg";
    bruger.append(brugerIMG)

    const facebookIMG = document.createElement("img")
    facebookIMG.src = ".img/Facebook_Logo_(2019).png";
    facebook.append(facebookIMG)
    



})();

