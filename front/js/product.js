let url = window.location.search
let urlparam = new URLSearchParams(url)
let id = urlparam.get("id")
console.log(id);

fetch(`http://localhost:3000/api/products/${id}`)
    .then((res) => res.json())
    .then((res) => console.log(res))