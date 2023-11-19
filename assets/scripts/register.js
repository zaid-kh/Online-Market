const UsersUrl = "https://6555d3b584b36e3a431e6c3e.mockapi.io/users";

const userForm = document.getElementById("userForm");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const checkBox = document.getElementById("isAdmin");

function showError(input, message) {
  // Find the error message container corresponding to the input ID
  const errorDiv = document.getElementById(input.id + "Error");

  // Set the text content of the error message container to the provided error message
  errorDiv.textContent = message;

  // Add the 'error' class to the input element
  input.classList.add("error");
}

userForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevents the default form submission behavior

  let isValid = true; //  to keep track of the overall form validity

  // Validation check for the username length
  if (username.value.length < 3) {
    showError(username, `${username.value} must be at least 3 characters`);
    isValid = false; // Set isValid to false if there's an issue
  }

  // Regular expression for validating email format
  const emailRegEx =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // Validation check for a valid email format
  if (!emailRegEx.test(email.value)) {
    showError(email, "Please enter a valid email");
    isValid = false;
  }

  // Regular expression for strong password requirements
  const passwordRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );

  // Validation check for a strong password
  if (!passwordRegex.test(password.value)) {
    showError(
      password,
      "Password must be at least 8 characters long, containing lowercase, uppercase letters, numbers, and a special character."
    );
    isValid = false;
  }

  // Validation check for matching passwords
  if (password.value != confirmPassword.value) {
    showError(confirmPassword, "Passwords Don't match");
    isValid = false;
  }

  // If all validation checks pass, display a success alert
  if (isValid) {
    sendUserData();
    alert("User Form Submitted Successfully");
  }
});

function sendUserData() {
  // prepare to send the data to API
  const formData = {
    user: username.value,
    email: email.value,
    role: checkBox.checked,
    password: password.value,
  };

  // if the user already registered go to login page:

  let usersArray = [];
  fetch(UsersUrl)
    .then((response) => response.json())
    .then((dataObj) => {
      console.log(dataObj);
      usersArray = dataObj;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  usersArray.forEach((user) => {
    if (user.email === formData.email) {
      window.location.href = "authentication.html";
    }
  });

  // make post request
  fetch(UsersUrl, {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((Response) => {
      if (!Response.ok) {
        throw new Error("Wrong Network response");
      }
      // save user to current session
      // ! this does not save save user id into the session
      formData.cart = [];
      formData.purchase = [];
      sessionStorage.setItem("user", JSON.stringify(formData));
      window.location.href = "products.html";
    })
    .catch((error) => {
      // Handle errors that occurred during the fetch
      console.error("Error during fetch:", error);
    });
}

[username, email, password, confirmPassword].forEach((input) => {
  // Iterates over each input field

  input.addEventListener("input", () => {
    // add event listener to each input event // The 'input' event is triggered whenever the user types or modifies the content of an input field
    input.classList.remove(input.id + "Error"); // Removes the 'error' class from the input element and return to normal appearance
    document.getElementById(input.id + "Error").innerText = "";
  });
});
