const Cart=[];


//Fetch - Récupération de l'API
fetch(`http://localhost:3000/api/products/`)
    .then((response) => response.json())
    .then((data) => 
    {
     console.log(data)
     GetStorage(data)   
    }
) 
//Fonction de récupération du localStorage puis création de chaque article à l'aide de la fonction Display
function GetStorage(data){
    const Content = JSON.parse(localStorage.getItem("Cart"));  
    
    console.log(Content);
    
    for (let Cart of Content){
    for (let i = 0; i<data.length; i++){
        if (Cart.id === data[i]._id) {
            
            Cart.name = data[i].name
            Cart.price = data[i].price
            Cart.imageUrl = data[i].imageUrl
            Cart.altTxt = data[i].altTxt
            Cart.description = data[i].description
            
            
                }
                   
            }
            
            
     Display(Cart,Content)
    console.log(Content)
    
    }    
//Fonction d'affichage,modification(quantité,couleur) de l'article  
    function Display(Cart) {  
        const cartitem = document.getElementById("cart__items")                    
        const article = document.createElement("article")
        const cartItemImg = document.createElement("div")
        const cartItemContent = document.createElement("div")
        const cartItemContentDescription = document.createElement("div")
        const cartItemContentSettings = document.createElement("div")
        const cartItemContentSettingsQuantity = document.createElement("div")
        const cartItemContentSettingsDelete = document.createElement("div")
        const image = document.createElement("img")
        const h2 = document.createElement("h2")
        const span = document.createElement("span")
        const pdata = document.createElement("p")
        const pquant = document.createElement("p")
        const input = document.createElement("input") 
        const pdelete = document.createElement("p")
        
        cartitem.appendChild(article);
        article.classList.add("cart__item");
        article.setAttribute(`data-id`,`${Cart.id}`);
        article.setAttribute(`data-color`,`${Cart.color}`);
        article.setAttribute(`data-quantity`,`${Cart.quantity}`);
        article.setAttribute(`data-price`,`${Cart.price}`);
        article.appendChild(cartItemImg);
        cartItemImg.classList.add("cart__item__img");
        image.src = `${Cart.imageUrl}`;
        image.alt = `${Cart.altTxt}`;
        cartItemImg.appendChild(image);
        cartItemContent.classList.add("cart__item__content");
        article.appendChild(cartItemContent);
        cartItemContentDescription.classList.add("cart__item__content__description");
        cartItemContent.appendChild(cartItemContentDescription);
        h2.textContent = `${Cart.name}`;
        cartItemContentDescription.appendChild(h2);
        span.textContent = "Couleur:  "+ `${Cart.color}`;
        cartItemContentDescription.appendChild(span);
        pdata.setAttribute(`price`,`${Cart.price}`);
        pdata.textContent = "Prix  :"+ `${Cart.price}`+ "€";
        cartItemContentDescription.appendChild(pdata);
        cartItemContentSettings.classList.add("cart__item__content__settings");
        article.appendChild(cartItemContentSettings);
        cartItemContentSettingsQuantity.classList.add("cart__item__content__settings__quantity");
        cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);
        pquant.textContent = "Quantité : ";
        cartItemContentSettingsQuantity.appendChild(pquant);
        input.type = "number";
        input.classList.add("itemQuantity");
        input.name = "itemQuantity";
        input.min = "1";
        input.max = "100";
        input.value = `${Cart.quantity}`;
        cartItemContentSettingsQuantity.appendChild(input);
        cartItemContentSettingsDelete.classList.add("cart__item__content__settings__delete");
        article.appendChild(cartItemContentSettingsDelete);
        pdelete.classList.add("deleteItem");
        pdelete.setAttribute(`data-id`,`${Cart.id}`);
        pdelete.setAttribute(`data-color`,`${Cart.color}`);
        pdelete.textContent = "Supprimer";
        cartItemContentSettingsDelete.appendChild(pdelete);



        
        
        }
        
        Total()
        Delete()
        Quantity()
    }
    //Fonction de calcul du total de la commande
        function Total() {
            let totalWares = 0
            let totalWarePrice = 0            
            const Ware = document.querySelectorAll(".cart__item")            
            Ware.forEach((Cart) => {
                
                totalWares += JSON.parse(Cart.dataset.quantity)
                
                totalWarePrice += Cart.dataset.quantity * Cart.dataset.price
            });            
            document.getElementById("totalQuantity").textContent = totalWares
            document.getElementById("totalPrice").textContent = totalWarePrice
        }
    //Fonction de suppression d'article
        function Delete(){
            const deleteCart = document.querySelectorAll(".cart__item .deleteItem")        
            deleteCart.forEach((Cart) => {            
            Cart.addEventListener("click", () => {                
            let Content = JSON.parse(localStorage.getItem("Cart"))                
            for (let i = 0; i<Content.length; i++)
                        if (                        
                            Content[i].id === Cart.dataset.id &&
                            Content[i].color === Cart.dataset.color
                        ) {                        
                                                   
                            Content.splice(i, 1)                         
                            localStorage.Cart = JSON.stringify(Content)   
                            const deleted = document.querySelector(
                            `article[data-id="${Cart.dataset.id}"][data-color="${Cart.dataset.color}"]`)
                            deleted.remove()                                                 
                            Total(); 
                            ClearItem();
                        }
                })
            })
        }
//Fonction de modification de la quantité
        function Quantity(){
            const article = document.querySelectorAll(".cart__item");    
            article.forEach((Cart) => {
                Cart.addEventListener("change", (newQuant) => {
                    const Content = JSON.parse(localStorage.getItem("Cart"))            
                    for (canap of Content)
                        if (                    
                            canap.id === Cart.dataset.id &&
                            Cart.dataset.color === canap.color
                        ) {                    
                            canap.quantity = Math.min(newQuant.target.value, 100)                    
                            localStorage.Cart = JSON.stringify(Content)                    
                            Cart.dataset.quantity = newQuant.target.value                    
                            Total();
                        }
                    console.log( canap.name, Cart.dataset.color)
                    console.log(Content)
                })
            })
         }




const order = document.getElementById("order")
order.addEventListener  ("click", ()=>Form())

//Fonction de création et de vérification de formulaire
function Form(){
    const Content = JSON.parse(localStorage.getItem("Cart"))
if (Content.length === 0 ) {
    alert ("Panier vide !")
    return
}
if (InvalidEmail()) return;
if (InvalidFirstName()) return;
if (InvalidLastName()) return;

const contact = Obj()
//Fetch envoi des données de formulaire puis renvoi vers page de confirmation
fetch("http://127.0.0.1:3000/api/products/order", {
        method: "POST",
        body:JSON.stringify(contact),
        headers:{
            "Content-Type":"application/json",
            
            
            
        }
        })
        .then((response)=> response.json())
        .then((response) => {
            const orderId = response.orderId
            window.location.href = "./confirmation.html"+"?orderId=" + orderId
        })
        
}

//Fonction de création d'objet contact
function Obj(){
    const content = JSON.parse(localStorage.getItem("Cart"));
    const firstname = document.getElementById("firstName").value;
    const lastname = document.getElementById("lastName").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const email = document.getElementById("email").value;
    const ids = [];
    content.forEach((Cart) => ids.push(Cart.id));
    const contact = {
        contact:{
            firstName:firstname,
            lastName:lastname,
            address:address,
            city:city,
            email:email           
        },
        products:ids
}
console.log(ids)

return contact
}
//Fonction de vérification d'e-mail
function InvalidEmail() {
    const email= document.getElementById("email").value
    const regex= /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    if (regex.test(email) === false){
        alert("Adresse Mail non valide")
        return true
    }
    return false
}
//Fonction de vérification de prénom
function InvalidFirstName(){
    const firstName=document.getElementById("firstName").value
    const regex= /^[A-Za-z]+$/
    if (regex.test(firstName) ===false){
        alert("Prénom invalide")
        return true
    }
    return false
}
//Fonction de vérification de nom de famille
function InvalidLastName(){
    const lastName=document.getElementById("lastName").value
    const regex= /^[A-Za-z]+$/
    if (regex.test(lastName) ===false){
        alert("Nom invalide")
        return true
    }
    return false
}
//Fonction de nettoyage localstorage si panier vide
function ClearItem(){
    if (JSON.parse(localStorage.getItem("Cart")).length === 0) {
         localStorage.removeItem("Cart")}
}