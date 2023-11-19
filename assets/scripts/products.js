import { checkAuthentication, logoutUser } from "./util.js";

const user = JSON.parse(sessionStorage.getItem("user"));

const UsersUrl = "https://6555d3b584b36e3a431e6c3e.mockapi.io/users";
const ProductsUrl = "https://6555cde784b36e3a431e5f45.mockapi.io/products";

checkAuthentication();
// Logout functionality
const logoutButton = document.getElementById("logout");
logoutButton.addEventListener("click", (e) => {
  logoutUser();
});

export let AllProducts = fetchProducts();
export function getProduct(productId) {
  AllProducts.find((product) => product.id == productId);
}
console.log("user: ", user);

const isAdmin = user.role;
const currentUser = user;

//display username
const usernameSpan = document.querySelector(".username");
usernameSpan.innerText = user.user;

// fetch products API
async function fetchProducts() {
  try {
    const res = await fetch(ProductsUrl);
    const data = await res.json();
    console.log(data);
    displayProducts(data);
  } catch (error) {
    console.error(error);
  }
}

// Dom Catcher main element
const main = document.querySelector("#main-container");
const addBtn = document.querySelector("#add");

function displayProducts(products) {
  main.innerText = ""; // reset the main children

  const productsContainer = document.createElement("section");
  productsContainer.id = "products";

  products.map((product) => {
    const productCard = document.createElement("section");
    productCard.className = "productCard";

    const img = document.createElement("img");
    const name = document.createElement("h3");
    const price = document.createElement("section");
    const description = document.createElement("section");

    img.src = product.avatar;
    img.alt = product.name + "photo";

    name.innerText = product.name;
    price.innerText = "Price: " + product.price;
    description.innerText = product.description;

    productCard.append(img, name, price, description);

    // admin can add/ edit/ delete products
    if (isAdmin) {
      addBtn.classList.remove("hidden");
      const editBtn = document.createElement("button");
      const deleteBtn = document.createElement("button");
      editBtn.innerText = "Edit";
      deleteBtn.innerText = "Delete";
      editBtn.className = "edit-product";
      deleteBtn.className = "delete-product";

      productCard.append(editBtn, deleteBtn);
    } else {
      // user can only add products to cart
      const addToCart = document.createElement("button");
      addToCart.innerText = "Add To Cart";
      addToCart.className = "add-to-cart";

      productCard.appendChild(addToCart);
    }
    productsContainer.appendChild(productCard);
    main.appendChild(productsContainer);

    /* add listener to click on:
    1. edit
    2. delete 
    3. add to cart
    4. if card itself => go to page details
    */
    productCard.addEventListener("click", async (e) => {
      if (
        e.target.className == "delete-product" ||
        e.target.className == "edit-product" ||
        e.target.className == "add-to-cart"
      ) {
        if (e.target.className == "delete-product") {
          fetchDeletingProduct(product);
        } else if (e.target.className == "edit-product") {
          editingProduct(product);
        } else {
          await fetchUpdatingCart(currentUser, product);
        }
      } else productPage(product);
    });
  });
}

// fetch PUT to edit cart array at the user data
async function fetchUpdatingCart(userData, currentProduct) {
  // push current product to cart list
  userData.cart.push(currentProduct);

  // updating user object
  try {
    const res = await fetch(UsersUrl + "/" + userData.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

// editing product
function editingProduct(currentProduct) {
  // check if popup is opened
  const existingForm = document.getElementById("product-form");
  if (existingForm) {
    existingForm.remove();
  }
  // creating form
  const productForm = document.createElement("form");
  productForm.id = "product-form";

  const XBtn = document.createElement("section");
  XBtn.textContent = "X";
  XBtn.style.cursor = "pointer";
  XBtn.addEventListener("click", () => productForm.remove());

  const imgLabel = document.createElement("label");
  imgLabel.innerText = "Image Url: ";
  const nameLabel = document.createElement("label");
  nameLabel.innerText = "Product Name: ";
  const priceLabel = document.createElement("label");
  priceLabel.innerText = "Product Price: ";
  const descLabel = document.createElement("label");
  descLabel.innerText = "Product Description: ";

  const imgInput = document.createElement("input");
  const nameInput = document.createElement("input");
  const priceInput = document.createElement("input");
  const descInput = document.createElement("textarea");
  const submitBtn = document.createElement("input");

  imgInput.value = currentProduct.avatar;
  nameInput.value = currentProduct.name;
  priceInput.value = currentProduct.price;
  descInput.value = currentProduct.description;
  submitBtn.textContent = "Submit";
  submitBtn.type = "submit";

  // add listener for Escaping this popup window
  productForm.addEventListener("keydown", async (e) => {
    if (e.key === "Escape") {
      productForm.remove();
    }
  });
  // add listener to submit input values to edit the product details
  productForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitEditedProduct = {
      ...currentProduct,
      avatar: imgInput.value,
      name: nameInput.value,
      price: priceInput.value,
      description: descInput.value,
    };
    await fetchEditingProduct(submitEditedProduct);
    productForm.remove();
  });

  productForm.append(
    XBtn,
    imgLabel,
    imgInput,
    nameLabel,
    nameInput,
    priceLabel,
    priceInput,
    descLabel,
    descInput,
    submitBtn
  );

  main.appendChild(productForm);
}

// fetch PUT for editing product's details
async function fetchEditingProduct(currentProduct) {
  try {
    const res = await fetch(ProductsUrl + "/" + currentProduct.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(currentProduct),
    });
    const data = await res.json();
    console.log(data);
    fetchProducts();
  } catch (error) {
    console.error(error);
  }
}

// fetch DELETE for deleting product
async function fetchDeletingProduct(currentProduct) {
  try {
    const res = await fetch(ProductsUrl + "/" + currentProduct.id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    fetchProducts();
  } catch (error) {
    console.error(error);
  }
}

// go to product by clicking on it
function productPage(product) {
  main.innerText = "";
  const currentProductContainer = document.querySelector("#product-details");
  currentProductContainer.innerText = "";
  addBtn.className = "hidden";

  // creating element of the details , sections to flex row between img and details
  const productList = document.createElement("button");
  const section1 = document.createElement("section");
  const img = document.createElement("img");
  const section2 = document.createElement("section");
  const name = document.createElement("h3");
  const price = document.createElement("section");
  const description = document.createElement("section");

  productList.textContent = "Back to Products";
  productList.className = "back-to-products";
  img.src = product.avatar;
  img.alt = product.name + " photo";
  name.innerText = product.name;
  price.innerHTML = `<b>Price :</b> ${product.price}$`;
  description.innerHTML = `<b>Description :</b> ${product.description}`;

  section1.append(img);
  section2.append(productList, name, price, description);

  // if regular user has option to add product to cart
  if (!isAdmin) {
    const addToCart = document.createElement("button");
    addToCart.className = "add-to-cart";
    addToCart.textContent = "Add To Cart";
    addToCart.addEventListener("click", async () => {
      fetchUpdatingCart(currentUser, product);
    });
    section2.appendChild(addToCart);
  }
  currentProductContainer.append(section1, section2);
  // add related products cards according to current product's name
  getRelatedProducts(product);
  productList.addEventListener("click", () => {
    window.location = "./products.html";
  });
}

// add more products btn listener
addBtn.addEventListener("click", () => {
  // check if form is exist
  const existingForm = document.getElementById("product-form");
  if (existingForm) {
    existingForm.remove();
  }

  const XBtn = document.createElement("section");
  XBtn.textContent = "X";
  XBtn.style.cursor = "pointer";
  XBtn.addEventListener("click", () => addForm.remove());

  // creating form for adding new product
  const addForm = document.createElement("form");
  addForm.id = "product-form";
  const imgLabel = document.createElement("label");
  const imgUrlInput = document.createElement("input");
  const nameLabel = document.createElement("label");
  const nameInput = document.createElement("input");
  const priceLabel = document.createElement("label");
  const priceInput = document.createElement("input");
  const descriptionLabel = document.createElement("label");
  const descriptionTextarea = document.createElement("textarea");
  const submitButton = document.createElement("button");
  submitButton.id = "add-to";

  imgLabel.textContent = "Image URL";
  nameLabel.textContent = "Product Name";
  priceLabel.textContent = "Price";
  descriptionLabel.textContent = "Description";
  submitButton.textContent = "Add Product";

  addForm.append(
    XBtn,
    imgLabel,
    imgUrlInput,
    nameLabel,
    nameInput,
    priceLabel,
    priceInput,
    descriptionLabel,
    descriptionTextarea,
    submitButton
  );

  main.appendChild(addForm);

  //add listener to submit the form values
  addForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const newProduct = {
      img: imgUrlInput.value,
      name: nameInput.value,
      price: priceInput.value,
      description: descriptionTextarea.value,
    };
    await fetchAddNewProduct(newProduct);
  });
});

// fetch post to add new product
async function fetchAddNewProduct(newProduct) {
  try {
    const res = await fetch(ProductsUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    const data = await res.json();
    console.log(data);
    fetchProducts();
  } catch (error) {
    console.error(error);
  }
}

async function getRelatedProducts(currentProduct) {
  try {
    const res = await fetch(ProductsUrl);
    const data = await res.json();
    const relatedProduct = data.filter((product) => {
      return currentProduct.name
        .split(" ")
        .some((split) => product.name.includes(split));
    });
    displayProducts(relatedProduct);
  } catch (error) {
    console.error(error);
  }
}
