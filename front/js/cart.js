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