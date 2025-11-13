import axios, { AxiosHeaders } from "axios";
import apiLink from "./apiLink";

const logout = async () => {
   const refresh_token = sessionStorage.refresh_token;
   const access_token = sessionStorage.access_token;
   try {
      await axios.post(
         `${apiLink}api/logout/`,
         {
            refresh_token: refresh_token,
         },
         {
            headers: {
               Authorization: `Bearer ${access_token}`,
            },
         }
      );
      // Remove the token from sessionStorage (or wherever it's stored)
      sessionStorage.removeItem("access_token");
      sessionStorage.removeItem("refresh_token");
      sessionStorage.removeItem("username");
      sessionStorage.removeItem("email");
      return true;
   } catch (error) {
      console.error("Logout error:", error);
      console.log("An error occurred");
      return false;
   }
};

export default logout;
