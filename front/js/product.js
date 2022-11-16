let url = window.location.search
let urlparam = new URLSearchParams(url)
let id = urlparam.get("id")
console.log(id);