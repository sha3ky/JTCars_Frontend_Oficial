import axios from "axios";
import apiLink from "./apiLink";
import logout from "./logOut";

let link = apiLink;
const accessToken = sessionStorage.getItem("access_token");

const eliminarUsuario = async () => {
   debugger;
   try {
      const response = await axios.delete(`${link}api/deleteUserAccount`, {
         headers: {
            Authorization: `Bearer ${accessToken}`, // Include the access token in the headers
         },
      });
      console.log(response); // Log the response for debugging

      if (response.status == 200) {
         await logout();
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
