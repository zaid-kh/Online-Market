/** checks if the user is authenticated (logged in)
 *  @returns boolean
 *
 */
function isAuthenticated() {
  return sessionStorage.getItem("user") !== null;
}
/** Makes sure a user is logged on, and redirects to logIn page if there is no user */
function checkAuthentication() {
  if (!isAuthenticated()) {
    // If not authenticated, redirect to login page
    window.location.href = "index.html";
    alert("You are not logged in!\nYou will be redirected to the log in page.");
  }
}
/** Removes user from sessionStorage and redirects to logIn page */
function logoutUser() {
  sessionStorage.removeItem("user");
  // Redirect back to login page
  window.location.href = "index.html";
}

// Export functions
export { isAuthenticated, checkAuthentication, logoutUser };
