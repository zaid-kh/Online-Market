const url='https://6555cde784b36e3a431e5f45.mockapi.io/';
const user = JSON.parse(sessionStorage.getItem("user"));
const purchase=document.getElementById('purchase');


let shoppingCart = [{productId:1,
    quantity:2 ,
     img:new URL('https://th.bing.com/th/id/R.e50992d3b22d01f34fc854916980e4af?rik=mMELiKX0ZhdeWg&pid=ImgRaw&r=0'),
     name:'product 1',
     price:30+'IL'
},
{productId:2,
    quantity:1,
     img: new URL('https://i.pinimg.com/originals/3b/5f/32/3b5f328152b41414857051b82e5d5c0c.jpg'),
     name:'product2',
price:40+'IL'}];





const cartItemsList = document.getElementById('cart-items');


function displayCart(shoppingCart) {
  

    while (cartItemsList.firstChild){
        cartItemsList.removeChild(cartItemsList.firstChild)
       }

    shoppingCart.forEach(item => {
        const cartItem = document.createElement('li');

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
      displayCart(user.cart);
    }
}    


function pressPurchase(){

    user.purchase = user.cart.map(obj => ({...obj}));

    user.cart = []; // Clear the shopping cart
    displayCart(user.cart); // Update the displayed cart


    const orderlink = document.createElement("a")
        orderlink.classList.add('order');
        orderlink.href='url';
        orderlink.textContent='Review your order';
        document.body.appendChild(orderlink);
   

}
purchase.addEventListener('click',pressPurchase)