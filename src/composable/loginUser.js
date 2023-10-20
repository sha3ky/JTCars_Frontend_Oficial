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
import axios from "axios";
import apiLink from "./apiLink";
let link = apiLink;

const login = async (email, password) => {
  debugger;
  try {
    console.log(email,password)
    const response = await axios.post(`${link}api/token/`, {

        username: email,
        password: password,

    });

    console.log(response); // Log the response for debugging

    if (response.data && response.data.token) {
      sessionStorage.setItem("token", response.data.token);
      axios.defaults.headers.common["Authorization"] = "Token " + response.data.token;
      return { success: true };
    } else {
      return { success: false, message: "Invalid credentials" };
    }
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: "An error occurred" };
  }
};

export default login;
