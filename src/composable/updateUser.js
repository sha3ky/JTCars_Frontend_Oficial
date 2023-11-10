import axios from "axios";
import apiLink from "./apiLink";

let link = apiLink;

const updateUser = async (name, email) => {
   const accessToken = sessionStorage.getItem("access_token");
   try {
      const response = await axios.post(
         `${link}api/updateUserProfile`,
         {
            username: name,
            email: email,
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
      console.error("updateUser error:", error);
      // return { success: false, message: "An error occurred" };
      return false;
   }
};

export default updateUser;
