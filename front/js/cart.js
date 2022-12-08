const Cartcontents = localStorage.length;
const Carts =[];

GetStorage()
for (let Content of Carts){Display(Content)}


function GetStorage(){
for (let i=0; i < Cartcontents; i++){
    const Content = localStorage.getItem(localStorage.key(i));
    const ContentObject = JSON.parse(Content);
    Carts.push(ContentObject)
    }
}

function Display(Content){
    const Article = MakeArticle(Content)  
    ShowArticle(Article)
    const Img = MakeImage(Content)
    Article.appendChild(Img)

    const CartItemContent = MakeCartContent(Content)
    Article.appendChild(CartItemContent)
    ShowArticle(Article)
}

function ShowArticle(Article){
    document.getElementById("cart__items").appendChild(Article)

}

function MakeArticle(Content){
    const Article = document.createElement("article")
    Article.classList.add("cart__item")
    Article.dataset.id = Content.id
    Article.dataset.color = Content.color
    return Article
}

function MakeImage(Content){
    const div = document.createElement("div")
    div.classList.add("cart__item__img")
    const Image = document.createElement("img")
    Image.src = Content.imageUrl
    Image.alt = Content.altTxt
    div.appendChild(Image)
    return div
    
}

function MakeCartContent(Content){
    const CartItemContent = document.createElement("div")
    const Description= MakeDescription(Content)
    const Settings= MakeSettings(Content)
    CartItemContent.classList.add("cart__item__content")
    CartItemContent.appendChild(Description)
    CartItemContent.appendChild(Settings)
    return CartItemContent
}

function MakeDescription(Content){
    const Description = document.createElement("div")
    Description.classList.add("cart__item__content__description")
    const h2 = document.createElement("h2")
    h2.textContent = Content.name
    const p = document.createElement("p")
    p.textContent = Content.description
    const pr = document.createElement("p")
    pr.textContent = Content.price + " €"
    Description.appendChild(h2)
    Description.appendChild(p)
    Description.appendChild(pr)
    
    return Description
}
function MakeSettings(Content){
    const Settings = document.createElement("div")
    Settings.classList.add("cart__item__content__settings")
    AddQuantity(Content,Settings)
    return Settings
    
}
function AddQuantity(Content,Settings){
    const Quantity = document.createElement("div")
    Quantity.classList.add("cart__item__content__settings__quantity")
    const P = document.createElement("p")
    P.textContent ="Qté : "
    Quantity.appendChild(P)
    const Input = document.createElement("input")
    Input.type = "number"
    Input.classList.add("itemQuantity")
    Input.name = "itemQuantity" 
    Input.min = "1"
    Input.max = "100"
    Input.value = Content.quantity
    Settings.appendChild(Input)
}