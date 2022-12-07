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
    const div = MakeImage(Content)
    Article.appendChild(div)

    const CardItemContent =MakeCardItemContent(Content)
    Article.appendChild(CardItemContent)
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

function MakeCardItemContent(Content){
    const div = document.createElement("div")
    div.classList.add("cart__item__content")
    const description = document.createElement("div")
    description.classList.add("cart__item__content__description")
    const h2 = document.createElement("h2")
    h2.textContent = Content.name
    const p = document.createElement("p")
    p.textContent = Content.description
    const pr = document.createElement("p")
    pr.textContent = Content.price + " €"
    description.appendChild(h2)
    description.appendChild(p)
    description.appendChild(pr)
    div.appendChild(description)
    return div
}