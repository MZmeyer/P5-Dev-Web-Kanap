fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((donnees) =>  {
        return produit(donnees)
    })

function  produit (donnees){
    let id = donnees[0]._id
    let imageUrl = donnees[0].imageUrl
    let altTxt = donnees[0].altTxt
    let name = donnees[0].name
    let description = donnees[0].description
    let image = makeImg(imageUrl, altTxt)
    let anchor = makeA(id)
    let article = makeArticle()
    let h3 = makeH3(name)
    let p = makeP(description)
    article.appendChild(image)
    article.appendChild(h3)
    article.appendChild(p)
    itemChild(anchor, article)
    
    
}   
 
function makeA(id)    {
    let anchor = document.createElement("a")
    anchor.href="./product.html?id="+id
    return anchor
}
    

function itemChild(anchor, article) {
    let items = document.getElementById("items")
    if (items!=null){
    items.appendChild(anchor)
    anchor.appendChild(article)
    }
}

function makeImg(imageUrl, altTxt) {
    let image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    return image
}

function makeArticle() {
    let article = document.createElement("article")
    
    
    return article
}

function makeH3(name) {
    let h3 = document.createElement("h3")
    h3.textContent = name
    h3.classList.add("productName")
    return h3
}
function makeP(description) {
    let p = document.createElement("p")
    p.textContent = description
    p.classList.add("productDescription")
    return p
}