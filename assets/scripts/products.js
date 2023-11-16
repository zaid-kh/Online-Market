const url = "https://6555cde784b36e3a431e5f45.mockapi.io/products";
//! updated later after merging files
const isAdmin = true
// const isAdmin = false 

const fetchProducts = async () => {
  try {
    const res = await fetch(url);
    const data = await res.json()
    console.log(data);
    displayProducts(data)
  } catch (error) {
    console.log(error);
  }
};

fetchProducts();

const main = document.querySelector("main")
main.id = ""

function displayProducts(products){
    const productsContainer = document.createElement("section")
    productsContainer.id = "products"

    products.map(product => {
        const productCard = document.createElement("section")
        productCard.className = "productCard"
        
        const img = document.createElement("img")
        const name = document.createElement("h3")
        const price = document.createElement("section")
        const description = document.createElement("section")

        img.src = product.avatar
        img.alt = product.name + "photo"

        name.innerText = product.name
        price.innerText = "Price: " + product.price
        description.innerText = product.description

        
        productCard.append(img,name,price,description)
        if(isAdmin){
            const editBtn = document.createElement('button')
            const deleteBtn = document.createElement('button')
            editBtn.innerText = 'Edit'
            deleteBtn.innerText = 'Delete'
            editBtn.className = "edit-product"
            deleteBtn.className = "delete-product"

            productCard.append(editBtn, deleteBtn)
        }
        else{
            const addToCart = document.createElement("button")
            addToCart.innerText = "Add To Cart"
            addToCart.className = 'add-to-cart'

            productCard.appendChild(addToCart)
        }
        productsContainer.appendChild(productCard)
        main.appendChild(productsContainer)

    })


}