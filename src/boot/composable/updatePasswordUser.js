import axios from "axios";
import apiLink from "./apiLink";

let link = apiLink;
const accessToken = sessionStorage.getItem("access_token");

const updatePasswordUser = async (oldPass, newPass) => {
   try {
      const response = await axios.post(
         `${link}api/changePassword`,
         {
            current_password: oldPass,
            new_password: newPass,
         },
         {
            headers: {
               Authorization: `Bearer ${accessToken}`, // Include the access token in the headers
            },
         }
      );
      console.log(response); // Log the response for debugging

      if (response.status == 200) {
         return true;
      } else {
         console.log("Invalid credentials");
      }
   } catch (error) {
      console.error("updatePassword error:", error);
      // return { success: false, message: "An error occurred" };
      return false;
   }
};

export default updatePasswordUser;
