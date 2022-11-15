fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((donnees) => {
        return Produit(donnees)
    })
    

