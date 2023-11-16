const UsersUrl = "https://6555d3b584b36e3a431e6c3e.mockapi.io/users";

function fetchData() {
  fetch(UsersUrl)
    .then((response) => response.json())
    .then((dataObj) => {
      console.log(dataObj);
      return data;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

fetchData();

// Call fetchData and use the returned data
fetchData().then((userInfo) => {
  // Now there is access to userInfo
  authenticateInfos(userInfo);
});

// Check if the entered data is the same as in fetched data
function authenticateInfos(dataObj) {
  const enteredUsername = username.value;
  const enteredPassword = password.value;
  const enteredEmail = email.value;
  const enteredAdmin = admin.value;

  const userMatch = dataObj.find((user) => {
    return (
      user.username === enteredUsername &&
      user.password === enteredPassword &&
      user.email === enteredEmail &&
      user.isAdmin === enteredAdmin
    );
  });

  if (userMatch) {
    console.log("Authentication successful");
  } else {
    console.log("Authentication failed");
  }
}

// craete an object to store user's infos
export const userInfo = {
  username: "",
  password: "",
  email: "",
  isAdmin: "",
};

//handle form submission and retrieve values from form
function manageLogin() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const email = document.getElementById("email").value;
  const isAdmin = document.getElementById("isadmin").value;

  //update user object
  userInfo.username = username;
  userInfo.password = password;
  userInfo.email = email;
  userInfo.isAdmin = isAdmin;

  console.log(userInfo);
}

onsubmit = "event.preventDefault(); manageLogin()";
