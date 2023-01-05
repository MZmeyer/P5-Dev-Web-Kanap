const orderId = getId()
displayId(orderId)

function getId(){
    const query = window.location.search
    const urlParams = new URLSearchParams(query)
    return urlParams.get("orderId")
}

function displayId(orderId){
    const idElement = document.getElementById("orderId")
    idElement.textContent = orderId
}