const UsersUrl = "https://6555d3b584b36e3a431e6c3e.mockapi.io/users";
const signinform = document.querySelector("#signinform");
// craete an object to store user's infos
export const userInfo = {};
let usersArray = [];

async function fetchData() {
  fetch(UsersUrl)
    .then((response) => response.json())
    .then((dataObj) => {
      console.log(dataObj);
      usersArray = dataObj;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

fetchData();

signinform.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  console.log(usersArray);

  //update user object
  userInfo.username = username;
  userInfo.password = password;
  // Call fetchData and use the returned data
  // fetchData().then((userInfo) => {
  //   // Now there is access to userInfo
  authenticateInfos();
  // });
});

// Check if the entered data is the same as in fetched data
function authenticateInfos() {
  const userMatch = usersArray.find((user) => {
    return (
      user.user === userInfo.username && user.password === userInfo.password
    );
  });

  if (userMatch) {
    console.log("Authentication successful");
  } else {
    console.log("Authentication failed");
  }
}
