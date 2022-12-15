



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
            for (let a = 0, b = Content.length; a < b; a++)
                        if (                        
                            Content[a].id === Cart.dataset.id &&
                            Content[a].color === Cart.dataset.color
                        ) {                        
                            const choice = [a];                        
                            Content.splice(choice, 1)                         
                            localStorage.Cart = JSON.stringify(Content)   
                            const deleted = document.querySelector(
                            `article[data-id="${Cart.dataset.id}"][data-color="${Cart.dataset.color}"]`)
                            deleted.remove()                                                 
                            Total(); 
                        }
                })
            })
        }



