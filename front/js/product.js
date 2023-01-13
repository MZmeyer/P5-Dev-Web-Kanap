let url = window.location.search
let urlparam = new URLSearchParams(url)
let id = urlparam.get("id")

console.log(id);

//Récupération de l'objet à afficher dans l'API
fetch(`http://localhost:3000/api/products/${id}`)
    .then((res) => res.json())
    .then((canap) => Pageproduit(canap))
    
    
//Fonction de création de la page du produit
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
    Cartbutton(canap)
}

//Fonction de création de l'image
function Picture(imageUrl,altTxt){
    let image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    let Elem = document.querySelector(".item__img")
    Elem.appendChild(image)

}
//Fonction de création du titre
function Titre(name){
    let h1 = document.getElementById("title")
    h1.textContent = name
}
//Fonction de création du prix
function Prix(price){
    let span = document.getElementById("price")
    span.textContent = price
}
//Fonction de création de la description
function Description(description){
    let p = document.getElementById("description")
    p.textContent = description
}
//Fonction de création de la sélection de couleurs
function Couleurs(colors){
    
    let select = document.getElementById("colors")
    for (let color of colors){
    let option = document.createElement("option")
    option.value = color
    option.textContent = color
    select.appendChild(option)
    }
    
  } 
//Fonction de création d'objet au clic sur bouton "addToCart"  
function Cartbutton(canap){
  let button = document.getElementById("addToCart")
  button.addEventListener("click",(e) =>{
    let color = document.getElementById("colors").value
    let quantity = document.getElementById("quantity").value    
      
        const Cart = {
        id:canap._id,
        color:color,
        quantity:Number(quantity)
            
    } 
    console.log(`${Cart.name}`, Cart )
    addToCart(Cart, color)    
    /*window.location.href = "cart.html"*/
  })
}
//Fonction d'ajout de produit au panier
 function addToCart(Cart, color) {
    let Content = JSON.parse(localStorage.getItem("Cart"))

    
    if (Content == null) {
        Content = []
        Content.push(Cart)
        localStorage.setItem("Cart", JSON.stringify(Content))               
    }

    
    else if (Content != null) {        
        for (i = 0; i < Content.length; i++) {
            if (Content[i].id == Cart.id &&
                Content[i].color == color
            ) {
                return (                    
                    Content[i].quantity = Math.min(Content[i].quantity + Cart.quantity, 100),
                    localStorage.setItem("Cart", JSON.stringify(Content))                    
                )
            }
        }
        for (i = 0; i < Content.length; i++) {            
            if (Content[i].id == Cart.id &&
                Content[i].color != color ||
                Content[i].id != Cart.id
            ) {
                return (                    
                    Content.push(Cart),
                    localStorage.setItem("Cart", JSON.stringify(Content))
                    
                )
            }
        }

    }
} 
