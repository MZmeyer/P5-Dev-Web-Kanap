const Cartcontents = localStorage.length;
const Cart =[];

function RecupStorage(){
for (let i=0; i < Cartcontents; i++){
    const Content = localStorage.getItem(localStorage.key(i));
    const ContentObject = JSON.parse(Content);
    Cart.push(ContentObject)
    }
}
    