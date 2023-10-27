// import axios from "axios";
// import apiLink from "./apiLink";  // Replace with your API endpoint

// const logout = async () => {
//   try {
//     const response = await axios.post(`${apiLink}api/logout/`);
//     if (response.status === 200) {
//       // Remove the token from sessionStorage
//       sessionStorage.removeItem("token");
//       // Optionally, remove the Authorization header for Axios
//       delete axios.defaults.headers.common["Authorization"];
//       // Perform any other logout-related actions
//       // For example, redirect to the login page
//       // window.location.href = "/login";  // Replace with your login page URL
//     } else {
//       // Handle the case where the logout request was not successful
//       console.error("Logout error:", response.data);
//       // Optionally, show an error message to the user
//     }
//   } catch (error) {
//     // Handle network errors or other unexpected issues
//     console.error("Logout error:", error);
//     // Optionally, show an error message to the user
//   }
// };

// //
// import axios from "axios";

// const logout = () => {
//   debugger
//   // Remove the token from sessionStorage
//   sessionStorage.removeItem("token");

//   // Clear the Authorization header for Axios
//   delete axios.defaults.headers.common["Authorization"];

//   // Optionally, perform any other logout-related actions
// };
// export default logout;
import axios from "axios";
import apiLink from "./apiLink";

const logout = async (token) => {
  debugger
  try {
    await axios.post(`${apiLink}usuarios/logout/`, { token });

    // Remove the token from sessionStorage and the axios defaults

    return { success: true };
  } catch (error) {
    console.error("Logout error:", error);
    return { success: false, message: "An error occurred" };
  }
};

export default logout;
