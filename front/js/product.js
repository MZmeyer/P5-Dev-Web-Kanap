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
    let _id = canap._id
    Image(imageUrl,altTxt)
    Titre(name)
}

function Image(imageUrl,altTxt){
    let image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    let Elem = document.querySelector(".item__img")
    Elem.appendChild(image)

}
function Titre(name){
    let h1 = document.querySelector("#title")
    h1.textContent = name
}