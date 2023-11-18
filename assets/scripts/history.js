// Retrieve user from session storage
const user = JSON.parse(sessionStorage.getItem("user"));
console.log("user: ", user);
const usernameSpan = document.querySelector(".username");
usernameSpan.innerText = user.user;
const ordersContainer = document.querySelector(".orders-container");

// * retrieve users purchases from user.js
// get user obj from user.js
// get purchases

// display purchases
function displayPurchases() {
  const purchases = user.purchase;
  console.log("purchases: ", purchases);
  // no orders found
  if (purchases.length === 0) {
    ordersContainer.innerText = "No previous orders found.";
    return;
  }
  ordersContainer.classList.add("orders-container");
  purchases.forEach((purchase) => {
    // create card to display item
    const card = document.createElement("div");
    card.classList.add("card");
    const image = document.createElement("img");
    image.classList.add("card-img");
    image.src = purchase.avatar;

    const detailsContainer = document.createElement("sect");
    detailsContainer.classList.add("details-container");

    const name = document.createElement("h4");
    name.innerText = `Name: ${purchase.name}`;
    const price = document.createElement("p");
    price.innerText = `Price: ${purchase.price}`;
    const quantity = document.createElement("p");
    quantity.innerText = `Quantity: ${purchase.quantity}`;

    detailsContainer.appendChild(name);
    detailsContainer.appendChild(price);
    detailsContainer.appendChild(quantity);

    card.appendChild(image);
    card.appendChild(detailsContainer);

    ordersContainer.appendChild(card);
  });
}
displayPurchases();
