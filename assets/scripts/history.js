// ! import to be used when user.js is finished
// import { user } from "./user.js";

const ordersContainer = document.querySelector(".orders-container");

let orders = [];

// * retrieve users purchases from user.js
// get user obj from user.js
// get purchases

/** user for local testing  */
// let user = user;
let test_user = {
  user: "Chester_Ernser",
  email: "Makayla_Schowalter8@hotmail.com",
  password: "password 3",
  role: "role 3",
  purchase: [
    {
      name: "Unbranded Soft Car",
      price: "18.00",
      avatar: "https://loremflickr.com/640/480/fashion",
      description: "description 7",
      quantity: 37243,
      id: "7",
    },
    {
      name: "Recycled Cotton Car",
      price: "911.00",
      avatar: "https://loremflickr.com/640/480/fashion",
      description: "description 9",
      quantity: 34250,
      id: "9",
    },
    {
      name: "Small Steel Pizza",
      price: "723.00",
      avatar: "https://loremflickr.com/640/480/fashion",
      description: "description 10",
      quantity: 61035,
      id: "10",
    },
    {
      name: "Tasty Steel Pizza",
      price: "406.00",
      avatar: "https://loremflickr.com/640/480/fashion",
      description: "description 12",
      quantity: 28606,
      id: "12",
    },
  ],
  cart: [],
  id: "3",
};

// display purchases
function displayPurchases() {
  const purchases = test_user.purchase;
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
