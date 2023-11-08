import axios from "axios";
import apiLink from "./apiLink";
import logout from "./logOut";

let link = apiLink;

const eliminarUsuario = async () => {
   debugger;
   const accessToken = sessionStorage.getItem("access_token");
   const refresh_token = sessionStorage.getItem("refresh_token");
   const user = sessionStorage.getItem("username");
   try {
      const response = await axios.delete(`${link}api/deleteUserAccount`, {
         headers: {
            Authorization: `Bearer ${accessToken}`,
         },
         data: {
            user: user,
         },
      });
      console.log(response); // Log the response for debugging

      if (response.status == 200) {
         return true;
      } else {
         console.log("Error ab eliminar usuario");
      }
   } catch (error) {
      console.error("error al eliminar usuario:", error);
      return false;
   }
};

export default eliminarUsuario;
