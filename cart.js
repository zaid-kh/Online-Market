const url='https://6555cde784b36e3a431e5f45.mockapi.io/';

const purchase=document.getElementById('purchase');


let shoppingCart = [{productId:1,quantity:2},
                    {productId:2,quantity:1}];





const cartItemsList = document.getElementById('cart-items');


function displayCart(shoppingCart) {
  

    while (cartItemsList.firstChild){
        cartItemsList.removeChild(cartItemsList.firstChild)
       }

    shoppingCart.forEach(item => {
        const cartItem = document.createElement('li');

        cartItem.appendChild(document.createTextNode('Product ID: ' + item.productId + ' '));

        let quantity=document.createElement('input');
        quantity.classList.add('quantity');
        quantity.value=item.quantity;
        quantity.type='number';
        quantity.min='1';
        cartItem.appendChild(quantity);

        let deleteProduct=document.createElement('button');
        deleteProduct.classList.add('deleteProduct')
        deleteProduct.textContent='delete';
        deleteProduct.addEventListener('click',()=>remove_func(item.productId))
        
       
        cartItem.appendChild(deleteProduct);

        cartItemsList.appendChild(cartItem);

    });


}

displayCart(shoppingCart);



function remove_func(ItemId) {
    const index = shoppingCart.findIndex(item=>item.productId=== ItemId)
    if(index !== -1){
      shoppingCart.splice(index,1);
      displayCart(shoppingCart);
    }
}    


function pressPurchase(){

    shoppingCart = []; // Clear the shopping cart
    displayCart(shoppingCart); // Update the displayed cart

}
purchase.addEventListener('click',pressPurchase)
