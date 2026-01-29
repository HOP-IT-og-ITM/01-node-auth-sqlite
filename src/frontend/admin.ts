
const mySidenav = document.getElementById("mySidenav") as HTMLDivElement
const overlay = document.getElementById("overlay") as HTMLDivElement
const main = document.getElementById("main") as HTMLDivElement


function openNav() {
    mySidenav.style.width = "250px";
    main.style.marginLeft = "250px";
    overlay.classList.add("show");
}

function closeNav() {
    mySidenav.style.width = "0";
    main.style.marginLeft = "0";
    overlay.classList.remove("show");
}