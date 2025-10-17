// import axios from "axios";
// import apiLink from "./apiLink";
// let link = apiLink;
// const login = async (email, password) => {
//    debugger;
//    try {
//       const response = await axios.post(`${link}usuarios/`, {
//          username: email,
//          password: password,
//       });

//       if (response.data && response.data.token) {
//          // Save the token in sessionStorage
//          sessionStorage.setItem("token", response.data.token);

//          // You can also set an Axios default header for all future requests
//          axios.defaults.headers.common["Authorization"] =
//             "Token " + response.data.token;

//          return { success: true };
//       } else {
//          return { success: false, message: "Invalid credentials" };
//       }
//    } catch (error) {
//       console.error("Login error:", error);
//       return { success: false, message: "An error occurred" };
//    }
// };

// export default login;

// import axios from "axios";
// import apiLink from "./apiLink";
// let link = apiLink;

// const login = async (email, password) => {
//   debugger;
//   try {
//     const response = await axios.post(`${link}api/token/`, {
//       username: email, // Assuming your server expects 'correo' for email
//       password: password,
//     });

//     if (response.data && response.data.token) {
//       // Save the token in sessionStorage
//       sessionStorage.setItem("token", response.data.token);

//       // You can also set an Axios default header for all future requests
//       axios.defaults.headers.common["Authorization"] = "Token " + response.data.token;

//       return { success: true };
//     } else {
//       return { success: false, message: "Invalid credentials" };
//     }
//   } catch (error) {
//     console.error("Login error:", error);
//     return { success: false, message: "An error occurred" };
//   }
// };

//

import store from "../store";
import axios from "axios";
import apiLink from "./apiLink";

let link = apiLink;

const login = async (name, password) => {
   debugger;
   try {
      const response = await axios.post(`${link}api/loginUser`, {
         username: name,
         password: password,
      });

      if (response.status == 200 && response.data.access) {
         /*    sessionStorage.setItem("access_token", response.data.access);
         sessionStorage.setItem("refresh_token", response.data.refresh);
         sessionStorage.setItem("username", response.data.username); // Store the username
         sessionStorage.setItem("email", response.data.email);
         axios.defaults.headers.common["Authorization"] = response.data.access; */
         // ✅ FORMA CORRECTA - Con "Bearer"
         axios.defaults.headers.common[
            "Authorization"
         ] = `Bearer ${response.data.access}`;
         /*The purpose of this code is to dispatch the "login" action to the store, passing relevant user data such as the access token, username, and administrator status. This data can be stored in the Vuex store's state and used throughout your application to manage user sessions and access control.*/
         store.dispatch("login", {
            access_token: response.data.access,
            refresh_token: response.data.refresh_token,
            name: name,
            email: response.data.email,
            isAdmin: response.data.is_admin,
         });

         return true;
      } else {
         console.log("Invalid credentials");
      }
   } catch (error) {
      console.error("Login error:", error);
      // return { success: false, message: "An error occurred" };
      return false;
   }
};

export default login;
