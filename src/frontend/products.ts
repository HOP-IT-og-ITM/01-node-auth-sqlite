const productMain = document.getElementById("productMain")

// temporary
const items = [
    {
        name: "testpc",
        description: "God pc",
        imgURL: "./img/test-pc1.avif",
        price: "999 kr"
    }, {
        name: "testpc2",
        description: "God pc2",
        imgURL: "./img/test-pc1.avif",
        price: "1999 kr"
    }
]

items.forEach((item) => {

    const pcRow = document.createElement('div')
    pcRow.className = "pc-row"

    const pcImg = document.createElement('img')
    pcImg.src = "./img/test-pc1.avif"

    const pcInfo = document.createElement('div')
    pcInfo.className = "pc-info"

    const pc_h3 = document.createElement('h3')
    pc_h3.textContent = item.name

    const Pc_p = document.createElement('p')
    pc_h3.textContent = item.description

    const pcSpan = document.createElement('span')
    pcSpan.className = "pris"
    pcSpan.textContent = item.price.toString()

    const pcButton = document.createElement('button')
    pcButton.className = "Produkter-button"
    pcButton.textContent = "Kjøp"

    pcInfo.append(pc_h3, Pc_p, pcSpan, pcButton)
    pcRow.append(pcImg, pcInfo)

    productMain?.append(pcRow)


})