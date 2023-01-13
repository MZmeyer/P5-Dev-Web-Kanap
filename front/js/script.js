//Fetch puis transmission des données de l'API
fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((donnees) =>  {
        return produit(donnees)
    })
//Fonction d'affichage des produits de l'API
function  produit (donnees){

    donnees.forEach((canap) => {
        
    
    let  {_id,imageUrl,altTxt,name,description} =canap       
    let image = makeImg(imageUrl, altTxt)        
    let anchor = makeA(_id)
    let article = document.createElement("article")
    let h3 = makeH3(name)
    let p = makeP(description)
    article.appendChild(image)
    article.appendChild(h3)
    article.appendChild(p)
    itemChild(anchor, article)  
})
}   
//Fonction de création élément anchor
function makeA(_id)    {
    let anchor = document.createElement("a")
    anchor.href="./product.html?id="+_id
    return anchor
}
    
//Fonction de création élément items
function itemChild(anchor, article) {
    let items = document.getElementById("items")
    if (items!=null){
    items.appendChild(anchor)
    anchor.appendChild(article)
    }
}
//Fonction de création élément img
function makeImg(imageUrl, altTxt) {
    let image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    return image
}


//Fonction de création élément h3
function makeH3(name) {
    let h3 = document.createElement("h3")
    h3.textContent = name
    h3.classList.add("productName")
    return h3
}

//Fonction de création élément p
function makeP(description) {
    let p = document.createElement("p")
    p.textContent = description
    p.classList.add("productDescription")
    return p
}