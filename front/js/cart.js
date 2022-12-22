const Cart=[];



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
    
    function Display(Cart) {  
        const cartitem = document.getElementById("cart__items") 
        
             
        const article = document.createElement("article")
        const div = document.createElement("div")
        const div2 = document.createElement("div")
        const div3 = document.createElement("div")
        const div4 = document.createElement("div")
        const div5 = document.createElement("div")
        const div6 = document.createElement("div")
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
        article.appendChild(div);
        div.classList.add("cart__item__img");
        image.src = `${Cart.imageUrl}`;
        image.alt = `${Cart.altTxt}`;
        div.appendChild(image);
        div2.classList.add("cart__item__content");
        article.appendChild(div2);
        div3.classList.add("cart__item__content__description");
        div2.appendChild(div3);
        h2.textContent = `${Cart.name}`;
        div3.appendChild(h2);
        span.textContent = "Couleur:  "+ `${Cart.color}`;
        div3.appendChild(span);
        pdata.setAttribute(`price`,`${Cart.price}`);
        pdata.textContent = "Prix  :"+ `${Cart.price}`+ "€";
        div3.appendChild(pdata);
        div4.classList.add("cart__item__content__settings");
        article.appendChild(div4);
        div5.classList.add("cart__item__content__settings__quantity");
        div4.appendChild(div5);
        pquant.textContent = "Quantité : ";
        div5.appendChild(pquant);
        input.type = "number";
        input.classList.add("itemQuantity");
        input.name = "itemQuantity";
        input.min = "1";
        input.max = "100";
        input.value = `${Cart.quantity}`;
        div5.appendChild(input);
        div6.classList.add("cart__item__content__settings__delete");
        article.appendChild(div6);
        pdelete.classList.add("deleteItem");
        pdelete.setAttribute(`data-id`,`${Cart.id}`);
        pdelete.setAttribute(`data-color`,`${Cart.color}`);
        pdelete.textContent = "Supprimer";
        div6.appendChild(pdelete);



        
        
        }
        
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
order.addEventListener ("click", ()=>Form())

function Form(){
    const Content = JSON.parse(localStorage.getItem("Cart"))
if (Content.length === 0 ) alert ("Panier vide !")
window.localStorage.clear
const contact = Obj()
fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        body:JSON.stringify(contact),
        headers:{
            "Content-type":"application/json",
            "Access-Control-Allow-Origin":"*"
        }
        })
        .then((response)=> response.json())
        .then((response) => console.log(response))
}

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