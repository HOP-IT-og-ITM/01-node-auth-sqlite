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

    console.log("test")

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
    const burger = document.createElement("div")
    burger.id = "burger-manu"

    // Facebook image
    const facebookWrapper = document.createElement("a")
    facebookWrapper.id = "facebook-logo"
    facebookWrapper.href = "https://www.facebook.com/profile.php?id=61585411492643"

    const facebookIMG = document.createElement("img")
    facebookIMG.src = "./img/Facebook_Logo_(2019).png";
    facebookWrapper.append(facebookIMG)
    
    const burgerIMG = document.createElement("img")
    burgerIMG.src = "./img/burger.svg";
    burger.append(burgerIMG)
    
    const logo = document.createElement("div")
    logo.id = "hopfiks-logo"
    header.append(burger, logo, facebookWrapper)
    
    const logoIMG = document.createElement("img")
    logoIMG.src = "./img/rabbit.svg";
    logo.append(logoIMG)






    //menu
    
    const menuDiv = document.createElement('div')
    menuDiv.id = "burger-menu-content"
    
    menuDiv.innerText = "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum "
    header.append(menuDiv)
    
    const closeButton = document.createElement('div')
    closeButton.id = "closeButton"
    closeButton.innerText = "X"
    menuDiv.append(closeButton)

    
})();

