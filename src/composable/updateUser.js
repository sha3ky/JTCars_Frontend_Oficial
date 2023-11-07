import axios from "axios";
import apiLink from "./apiLink";

let link = apiLink;

const updateUser = async (name, email, isActive) => {
   debugger;
   try {
      console.log(name, password);
      const response = await axios.post(`${link}api/updateUser/`, {
         username: name,
         email: email,
         is_active: isActive,
      });
      console.log(response); // Log the response for debugging

      if (response.status == 200 && response.data.access) {
         return true;
      } else {
         console.log("Invalid credentials");
      }
   } catch (error) {
      console.error("updateUser error:", error);
      // return { success: false, message: "An error occurred" };
      return false;
   }
};

export default updateUser;
