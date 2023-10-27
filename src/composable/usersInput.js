// import axios from "axios";

// let users;
// let link = apiLink;
// const fetchUserData = async () => {
//    try {
//       const response = await axios.get(`${link}usuarios/`, {
//          headers: {
//             "Content-Type": "application/json",
//             // "ngrok-skip-browser-warning": "69420",
//          },
//       });
//       users = response.data;
//       console.log("Data received:", users);
//    } catch (error) {
//       console.error("Error fetching data:", error);

//    }
//    return users;
// };

// export default fetchUserData;

import axios from "axios";
import apiLink from "./apiLink";

const link = apiLink;

const insertUser = async (name, email, password) => {
   debugger;
   try {
      // Send a POST request to register the user
      const response = await axios.post(`${link}api/inputUser/`, {
         name: name, // Update to match the field names in the Django view
         email: email,
         password: password,
      });
      //esto no hace falta al ingresar un usuario nuevo
      // if (response.data && response.data.message === "User registered successfully") {
      //    localStorage.setItem("token", response.data.key); // Store the user's authentication token
      //    axios.defaults.headers.common[
      //       "Authorization"
      //    ] = `Token ${response.data.key}`; // Set default header for future axios requests
      // }

      if (response.status == 200) {
         return true;
      } else {
         return false;
      }
   } catch (error) {
      console.error("User creation error:", error);
      return { error: "An error occurred while creating the user." };
   }
};

export default insertUser;
