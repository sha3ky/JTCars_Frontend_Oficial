import axios from "axios";
import apiLink from "./apiLink";

const link = apiLink;

const contactUser = async (name, email, telefono) => {
  debugger
   debugger;
   try {
      // Send a POST request to register the user
      const response = await axios.post(`${link}api/contactUser/`, {
         name: name, // Update to match the field names in the Django view
         email: email,
         telefono: telefono,
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

export default contactUser;
