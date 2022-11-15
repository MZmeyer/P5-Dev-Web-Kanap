fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((donnees) =>  produit(donnees))

function  produit (donnees){
    let id = donnees[0]._id
    let anchor = makeA(id)
    itemChild(anchor)
}   
 
function makeA(id)    {
    let anchor = document.createElement("a")
    anchor.href="./product.html?id="+id
    return anchor
}
    

function itemChild(anchor) {
    let items = document.getElementById("items")
    if (items!=null){
    items.appendChild(anchor)
    }
}