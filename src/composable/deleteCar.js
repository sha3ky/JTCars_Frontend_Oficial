import axios from "axios";
import apiLink from "./apiLink";

const link = apiLink;

const deleteCar = async (id) => {
  debugger
   debugger;
   try {
      // Send a POST request to register the user
      const response = await axios.post(`${link}api/deletecar/`, {
         id: id, // Update to match the field names in the Django view
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

export default deleteCar;
