const productMain = document.getElementById("productMain")

// temporary
const items = [
        {
        name: "Dell Optiplex 9010",
        title: "DL01",
        description: "En supergod datamaskin du vil kunne ha nytte av veldig lenge!",
        imgURL: "./img/optiplex.webp",
        price: 1000,
        specs: {
            cpu: "Intel i5-3470",
            gpu: "Intel HD Graphics",
            ram: "8GB DDR3",
            storage: "256GB SSD",
            motherboard: "LGA"
        },
        os: "Windows 8 Pro",
        forSale: false
    },
    {
        name: "Fujitsu esprimo D556/2/E85+",
        title: "FJ04",
        description: "En supergod datamaskin du vil kunne ha nytte av veldig lenge!",
        imgURL: "./img/optiplex.webp",
        price: 1000,
        specs: {
            cpu: "Intel i5-7400",
            gpu: "",
            ram: "8GB DDR4",
            storage: "256GB SSD",
            motherboard: ""
        },
        os: "Windows 11 PRO",
        forSale: false
    },
    {
        name: "testpc2",
        title: "God pc2",
        description: "En veldig GOD PC!!",
        imgURL: "./img/test-pc1.avif",
        price: 1999,
        specs: {
            cpu: "Ryzen 5 5600",
            gpu: "RTX 3060",
            ram: "16GB DDR4",
            storage: "1TB NVMe SSD",
            motherboard: ""
        },
        os: "",
        forSale: false
    }
]


const modal = document.createElement("div")
modal.className = "modal hidden"

modal.innerHTML = `
  <div class="modal-content">
    <span class="close">&times;</span>
    <h2 id="modal-title"></h2>
    <ul>
      <li><b>CPU:</b> <span id="modal-cpu"></span></li>
      <li><b>GPU:</b> <span id="modal-gpu"></span></li>
      <li><b>RAM:</b> <span id="modal-ram"></span></li>
      <li><b>Storage:</b> <span id="modal-storage"></span></li>
    </ul>
  </div>
`

document.body.append(modal)

// close modal
modal.querySelector(".close")?.addEventListener("click", () => {
    modal.classList.add("hidden")
})

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.add("hidden")
    }
})

// ---------- PRODUCTS ----------
items.forEach((item) => {

    const pcRow = document.createElement("div")
    pcRow.className = "pc-row"

    const pcImg = document.createElement("img")
    pcImg.src = item.imgURL

    const pcInfo = document.createElement("div")
    pcInfo.className = "pc-info"

    const pc_h3 = document.createElement("h3")
    pc_h3.textContent = item.name

    const pc_p = document.createElement("p")
    pc_p.textContent = item.description

    const pcSpan = document.createElement("span")
    pcSpan.className = "pris"
    pcSpan.textContent = item.price + " kroner"

    const pcButton = document.createElement("button")
    pcButton.className = "Produkter-button"
    pcButton.textContent = "View"

    // open modal with correct specs
    pcButton.addEventListener("click", () => {
        (document.getElementById("modal-title") as HTMLElement).textContent = item.name;
        (document.getElementById("modal-cpu") as HTMLElement).textContent = item.specs.cpu;
        (document.getElementById("modal-gpu") as HTMLElement).textContent = item.specs.gpu;
        (document.getElementById("modal-ram") as HTMLElement).textContent = item.specs.ram;
        (document.getElementById("modal-storage") as HTMLElement).textContent = item.specs.storage

        modal.classList.remove("hidden")
    })

    pcInfo.append(pc_h3, pc_p, pcSpan, pcButton)
    pcRow.append(pcImg, pcInfo)

    productMain?.append(pcRow)
})
