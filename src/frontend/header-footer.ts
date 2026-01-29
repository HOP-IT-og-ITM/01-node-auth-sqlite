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
    
    // Facebook image
    const facebookWrapper = document.createElement("a")
    facebookWrapper.id = "facebook-logo"
    facebookWrapper.href = "https://www.facebook.com/profile.php?id=61585411492643"
    
    const facebookIMG = document.createElement("img")
    facebookIMG.src = "./img/Facebook_Logo_(2019).png";
    facebookWrapper.append(facebookIMG)
    
    //Bruger
    const burger = document.createElement("div")
    burger.id = "burger-manu"
    
    const burgerIMG = document.createElement("img")
    burgerIMG.src = "./img/burger.svg";
    burger.append(burgerIMG)

    
    //Logo

    const logo = document.createElement("a")
    logo.id = "hopfiks-logo"
    logo.href = "https://hopfiks.no/"
    header.append(burger, logo, facebookWrapper)

    const logoIMG = document.createElement("img")
    logoIMG.src = "./img/rabbit.svg";
    logo.append(logoIMG)

    const hjemButton = document.createElement('Button')
    hjemButton.id = ""


    //menu
    
    const menuDiv = document.createElement('div')
    menuDiv.id = "burger-menu-content"
    header.append(menuDiv)
    
    //close button
    
    const closeButton = document.createElement('button')
    closeButton.id = "closeButton"

    const burgerIMGclose = document.createElement("img")
    burgerIMGclose.src = "./img/burger.svg";
    closeButton.append(burgerIMGclose)


    menuDiv.append(closeButton)
    
    
    //lukkefunksjon
    
    function closeMenu() {
        menuDiv.style.display = 'none'
    }
    
    //Eventlistener close
    
    closeButton.addEventListener('click', closeMenu)
    
    // åpenfunksjon

    function åpenMenu () {
        menuDiv.style.display = 'block'
    }

    // Eventlistener åpen

    burger.addEventListener('click', åpenMenu)

    //


    // Om oss button

    const omOssButton = document.createElement('button')
    omOssButton.id = "omOssButton"
    omOssButton.innerText = "Om oss"

    menuDiv.append(omOssButton)

    // OmossFunksjon

    function OmOssClick() {
        window.location.href = "./om-oss.html";
    }

    // Eventlistener om oss

    omOssButton.addEventListener('click', OmOssClick)
    

    //Produket button

    /*const produketButton = document.createElement('button')
    produketButton.id = "produketButton"
    produketButton.innerText = "Produkter"

    menuDiv.append(produketButton)


    //produketFunksjon

    function produketClick() {
        window.location.href = "./index.html";
    }


    // Eventlistener produket

    produketButton.addEventListener('click', produketClick)*/


    // Login button
    
    const loginButton = document.createElement('button')
    loginButton.id = "loginButton"
    loginButton.innerText = "Login"

    menuDiv.append(loginButton)


    //Loginfunksjon

    function loginClick () {
        window.location.href = "./login.html"
    }


    // Eventlistener login

    loginButton.addEventListener('click', loginClick)
    
    

})();

