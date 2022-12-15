



fetch(`http://localhost:3000/api/products/`)
    .then((response) => response.json())
    .then((data) => 
    {
     console.log(data)
     GetStorage(data)   
    }
) 

function GetStorage(data){
    const Content = JSON.parse(localStorage.getItem("Cart"));  
    
    console.log(Content);
    
    for (let Cart of Content){
    for (let a = 0, b = data.length; a < b; a++){
        if (Cart.id === data[a]._id) {
            
            Cart.name = data[a].name
            Cart.price = data[a].price
            Cart.imageUrl = data[a].imageUrl
            Cart.altTxt = data[a].altTxt
            Cart.description = data[a].description
                }
    
            }
    
        }
    Display(Content)    
    console.log(Content)
    
    }    
    
    function Display(Content) {            
        const article = document.getElementById("cart__items");            
            article.innerHTML += Content.map((Cart) =>
            `<article class="cart__item" data-id="${Cart.id}" data-color="${Cart.color}" data-quantity="${Cart.quantity}" data-price="${Cart.price}"> 
            <div class="cart__item__img">
            <img src="${Cart.imageUrl}" alt="${Cart.altTxt}">
            </div>
            <div class="cart__item__content">
            <div class="cart__item__content__description">
            <h2>${Cart.name}</h2>
            <span>Couleur : ${Cart.color}</span>
            <p data-price="${Cart.price}">Prix : ${Cart.price} €</p>
            </div>
            <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
            <p>Quantité : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${Cart.quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
            <p class="deleteItem" data-id="${Cart.id}" data-color="${Cart.color}">Supprimer</p>
            </div>
            </div>
            </div>
            </article>`
            )
            Total()
            Delete()
            Quantity()
        }

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
    
        function Delete(){
            const deletePurchase = document.querySelectorAll(".cart__item .deleteItem")        
            deletePurchase.forEach((Cart) => {            
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
                        }
                })
            })
        }

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
order.addEventListener ("click", (e)=>Form(e))

function Form(){
    /*const Content = JSON.parse(localStorage.getItem("Cart"))
if (Content.length === 0 ) alert ("Panier vide !")
window.localStorage.clear*/
/*const contact = Obj()*/
fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        body:JSON.stringify(contact),
        headers:{
            "Content-type":"application/json",
            "Access-Control-Allow-Origin":"application/json"
        }
        })
        .then((response)=> response.json())
        .then((response) => console.log(response))
}

/*function Obj(){
    const content = JSON.parse(localstorage.getItem("Cart"))
    const firstname = document.getElementById("firstName").value
    const lastname = document.getElementById("lastName").value
    const address = document.getElementById("address").value
    const city = doucment.getElementById("city").value
    const email = document.getElementById("email").value
    const ids = []
    content.forEach((Cart) => ids.push(Cart.id))
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
return contact
}*/