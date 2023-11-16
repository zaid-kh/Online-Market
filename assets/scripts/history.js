const ordersContainer = document.querySelector(".orders-container");

let orders = [];

// ! Scenario1 : retrieve users purchases from API
// get userID from user.js
// get user obj from API
// handle fetching problems
// get purchases
// ! Scenario2 : retrieve users purchases from user.js
// get user obj from user.js
// get purchases

/** user for local testing  */
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
