const url='https://6555cde784b36e3a431e5f45.mockapi.io/';

const user = JSON.parse(sessionStorage.getItem("user"));
const purchase=document.getElementById('purchase');
const cartItemsList = document.getElementById('cart-items');

import { checkAuthentication, logoutUser } from "./assets/scripts/util.js";

checkAuthentication();
// Logout functionality
const logoutButton = document.getElementById("logout");
logoutButton.addEventListener("click", (e) => {
  logoutUser();
});
// Retrieve user from session storage
const usernameSpan = document.querySelector(".username");
usernameSpan.innerText = user.user;


function displayCart(shoppingCart) {
  

    while (cartItemsList.firstChild){
        cartItemsList.removeChild(cartItemsList.firstChild)
       }

    shoppingCart.forEach(item => {
        const cartItem = document.createElement('li');
        cartItem.classList.add('element');

        cartItem.appendChild(document.createTextNode('Product ID: ' + item.id + ' '));

        let quantity=document.createElement('input');
        quantity.classList.add('quantity');
        quantity.value=item.quantity;
        quantity.type='number';
        quantity.min='1';
        cartItem.appendChild(quantity);

        let deleteProduct=document.createElement('button');
        deleteProduct.classList.add('deleteProduct')
        deleteProduct.textContent='delete';
        deleteProduct.addEventListener('click',()=>remove_func(item.id))

        const img = document.createElement("img")
       img.classList.add('img')
        img.src=item.avatar
        cartItem.appendChild(img);

        const name = document.createElement("h3")
        name.classList.add('name')
        name.textContent=item.name;
        cartItem.appendChild(name);

        const price = document.createElement("section")
        price.classList.add('price');
        price.textContent=item.price ;
        cartItem.appendChild(price);
        
       
        cartItem.appendChild(deleteProduct);

        cartItemsList.appendChild(cartItem);

    });


}

displayCart(user.cart);



function remove_func(ItemId) {
    const index = user.cart.findIndex(item=>item.id=== ItemId)
    if(index !== -1){
      user.cart.splice(index,1);
      fetchDeletingProduct(user.cart);
      displayCart(user.cart);
    }

    sessionStorage.setItem("user", JSON.stringify(user));
}    


function pressPurchase(){

    user.purchase = user.cart.map(obj => ({...obj}));

    user.cart = []; // Clear the shopping cart
    displayCart(user.cart); // Update the displayed cart

    sessionStorage.setItem("user", JSON.stringify(user));

    const orderlink = document.createElement("a")
        orderlink.classList.add('order');
        orderlink.href='./orderHistory.html';
        orderlink.textContent='Review your order';
        document.body.appendChild(orderlink);
   


}
purchase.addEventListener('click',pressPurchase)

// fetch DELETE for deleting product
async function fetchDeletingProduct(currentProduct) {
    try {
      const res = await fetch(user.url + "/" + user.id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      fetchCart();
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchCart() {
    try {
      const res = await fetch(ProductsUrl);
      const data = await res.json();
      console.log(data);
      displayCart(data);
    } catch (error) {
      console.error(error);
    }
  }