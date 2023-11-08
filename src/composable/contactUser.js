import axios from "axios";
import apiLink from "./apiLink";

const link = apiLink;

const contactUser = async (objeto) => {
   debugger;

   try {
      // Send a POST request to register the user
      const response = await axios.post(`${link}api/contactUser/`, {
         name: objeto.username, // Update to match the field names in the Django view
         email: objeto.email,
         telefono:objeto.telefono,
         mensaje:objeto.mensaje,
      });

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
