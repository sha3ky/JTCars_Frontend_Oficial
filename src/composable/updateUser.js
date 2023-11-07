import axios from "axios";
import apiLink from "./apiLink";

let link = apiLink;
const accessToken = sessionStorage.getItem('access_token');

const updateUser = async (name, email, isActive) => {
   debugger;
   try {
      const response = await axios.post(
         `${link}api/updateUserProfile`,
         {
            username: name,
            email: email,
            is_active: isActive,
         },
         {
            headers: {
               Authorization: `Bearer ${accessToken}`, // Include the access token in the headers
            },
         }
      );
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
