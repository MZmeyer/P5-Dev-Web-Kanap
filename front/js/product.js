let url = window.location.search
let urlparam = new URLSearchParams(url)
let id = urlparam.get("id")
console.log(id);

fetch(`http://localhost:3000/api/products/${id}`)
    .then((res) => res.json())
    .then((res) => Pageproduit(res))

function Pageproduit(canap){
    let altTxt = canap.altTxt
    let colors = canap.colors
    let description = canap.description
    let imageUrl = canap.imageUrl
    let name = canap.name
    let price = canap.price    
    Picture(imageUrl,altTxt)
    Titre(name)
    Prix(price)
    Description(description)
    Couleurs(colors)
}

function Picture(imageUrl,altTxt){
    let image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    let Elem = document.querySelector(".item__img")
    Elem.appendChild(image)

}
function Titre(name){
    let h1 = document.getElementById("title")
    h1.textContent = name
}
function Prix(price){
    let span = document.getElementById("price")
    span.textContent = price
}

function Description(description){
    let p = document.getElementById("description")
    p.textContent = description
}
function Couleurs(colors){
    let select = document.getElementById("colors")
    for (let i = 0; i < colors.length; i++){
    let option = document.createElement("option")
    option.value = colors
    option.textContent = colors
    select.appendChild(option)
    }
    
  } 

