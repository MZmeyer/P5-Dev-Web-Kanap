const orderId = getId()
displayId(orderId)
//Fonction de récupération de l'ID de commande
function getId(){
    const query = window.location.search
    const urlParams = new URLSearchParams(query)
    return urlParams.get("orderId")
}
//Fonction d'affichage de l'ID de commande
function displayId(orderId){
    const idElement = document.getElementById("orderId")
    idElement.textContent = orderId
}