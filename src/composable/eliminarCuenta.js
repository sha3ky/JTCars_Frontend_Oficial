import axios from "axios";
import apiLink from "./apiLink";
import deleteStorage from "./deleteStorage";

let link = apiLink;
const accessToken = sessionStorage.getItem("access_token");

const eliminarUsuario = async () => {
   debugger;
   try {
      const response = await axios.post(
         `${link}api/changePassword`,
         //  {
         //     current_password: oldPass,
         //     new_password: newPass,
         //  },
         {
            headers: {
               Authorization: `Bearer ${accessToken}`, // Include the access token in the headers
            },
         }
      );
      console.log(response); // Log the response for debugging

      if (response.status == 200) {
         deleteStorage();
         return true;
      } else {
         console.log("Error ab eliminar usuario");
      }
   } catch (error) {
      console.error("error al eliminar usuario:", error);
      // return { success: false, message: "An error occurred" };
      return false;
   }
};

export default eliminarUsuario;
