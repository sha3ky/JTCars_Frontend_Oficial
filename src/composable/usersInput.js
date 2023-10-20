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

const insertUser = async (email, password) => {
  try {
    const response = await axios.post(`${link}usuarios/`, {
      nombre: "ion",
      password: password,
      correo: email,
      apellido: "luca",
      admin: true,
    });

    if (response.data && response.data.token) {
      localStorage.setItem("token", response.data.token); // Store new token if provided
      axios.defaults.headers.common["Authorization"] = "Token " + response.data.token; // Set default header for future axios requests
    }

    return response.data;
  } catch (error) {
    console.error("User creation error:", error);
    return { error: "An error occurred while creating the user." };
  }
};

export default insertUser;


// import axios from "axios";
// import apiLink from "./apiLink";
// let link = apiLink;
// const insertUser = async (email, password) => {
//    debugger;
//    try {
//       // const token = localStorage.getItem("token");
//       const response = await axios.post(
//          `${link}usuarios/`,
//          {
//             nombre: "ion",
//             password: password,
//             correo: email,
//             apellido: "luca",
//             admin: true,
//          }

//          // {
//          //   headers: {
//          //     'Authorization': `Token ${token}`
//          //   }
//          // }
//       );

//       if (response.data && response.data.token) {
//          localStorage.setItem("token", response.data.token); // Store new token if provided
//          axios.defaults.headers.common["Authorization"] =
//             "Token " + response.data.token; // Set default header for future axios requests
//       }
//       return response.data;
//    } catch (error) {
//       console.error("Login error:", error);
//    }
// };
// export default insertUser;
