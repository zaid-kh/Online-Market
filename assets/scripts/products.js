export const AllProducts = fetchProducts();
export function getProduct(productId) {
  AllProducts.find((product) => product.id == productId);
}

const ProductsUrl = "https://6555cde784b36e3a431e5f45.mockapi.io/products";
const UsersUrl = "https://6555d3b584b36e3a431e6c3e.mockapi.io/users";
//! updated later after merging files
const isAdmin = true;
// const isAdmin = false;
let currentUser;

const fetchUsers = async () => {
  try {
    const res = await fetch(UsersUrl);
    const userData = await res.json();
    console.log(userData);
    return userData;
  } catch (error) {
    console.log(error);
  }
};

async function fetchProducts() {
  try {
    const res = await fetch(ProductsUrl);
    const data = await res.json();
    console.log(data);
    displayProducts(data);
  } catch (error) {
    console.log(error);
  }
}

fetchProducts();

const main = document.querySelector("main");
main.id = "";

function displayProducts(products) {
  main.innerText = "";
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
    if (isAdmin) {
      const editBtn = document.createElement("button");
      const deleteBtn = document.createElement("button");
      editBtn.innerText = "Edit";
      deleteBtn.innerText = "Delete";
      editBtn.className = "edit-product";
      deleteBtn.className = "delete-product";

      editBtn.addEventListener("click", () => {
        editingProduct(product);
      });
      deleteBtn.addEventListener("click", () => {
        deletingProduct(product);
      });

      productCard.append(editBtn, deleteBtn);
    } else {
      const addToCart = document.createElement("button");
      addToCart.innerText = "Add To Cart";
      addToCart.className = "add-to-cart";

      addToCart.addEventListener("click", async () => {
        const users = await fetchUsers();

        // assuming current user id is 1
        currentUser = users[0];

        updatingCart(currentUser, product);
      });
      productCard.appendChild(addToCart);
    }
    productsContainer.appendChild(productCard);
    main.appendChild(productsContainer);
  });
}

async function updatingCart(userData, currentProduct) {
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
  const existingForm = document.getElementById("product-form");
  if (existingForm) {
    existingForm.remove();
  }
  const productForm = document.createElement("form");
  productForm.id = "product-form";

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

  productForm.addEventListener("keydown", async (e) => {
    if (e.key === "esc") {
      productForm.remove();
    }
  });
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

async function fetchEditingProduct(currentProduct) {
  try {
    const res = await fetch(ProductsUrl + "/" + currentProduct.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(currentProduct),
    });
    console.log(res);
    const data = await res.json();
    console.log(data);
    fetchProducts();
  } catch (error) {
    console.error(error);
  }
}

// deleting product
async function deletingProduct(currentProduct) {
  try {
    const res = await fetch(ProductsUrl + "/" + currentProduct.id, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await res.json()
    console.log(data);
    fetchProducts()
  } catch (error) {
    console.error(error);
  }
}
