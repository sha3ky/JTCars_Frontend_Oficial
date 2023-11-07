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
import axios, { AxiosHeaders } from "axios";
import apiLink from "./apiLink";

const logout = async () => {
   const refresh_token = sessionStorage.refresh_token;
   const access_token = sessionStorage.access_token;
   try {
      await axios.post(
         `${apiLink}api/logout/`,
         {
            refresh_token: refresh_token,
         },
         {
            headers: {
               Authorization: `Bearer ${access_token}`,
            },
         }
      );
      // Remove the token from sessionStorage (or wherever it's stored)
      sessionStorage.removeItem("access_token");
      sessionStorage.removeItem("refresh_token");
      sessionStorage.removeItem("username");
      sessionStorage.removeItem("email");
      return true;
   } catch (error) {
      console.error("Logout error:", error);
      console.log("An error occurred");
      return false;
   }
};

export default logout;
