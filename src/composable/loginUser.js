import store from "../store";
import axios from "axios";
import apiLink from "./apiLink";
let link = apiLink;
const login = async (name, password) => {
   try {
      const response = await axios.post(`${link}api/loginUser`, {
         username: name,
         password: password,
      });
      if (response.status == 200 && response.data.access) {
         axios.defaults.headers.common[
            "Authorization"
         ] = `Bearer ${response.data.access}`;
         /*The purpose of this code is to dispatch the "login" action to the store, passing relevant user data such as the access token, username, and administrator status. This data can be stored in the Vuex store's state and used throughout your application to manage user sessions and access control.*/
         store.dispatch("login", {
            access_token: response.data.access,
            refresh_token: response.data.refresh,
            name: name,
            email: response.data.email,
            isAdmin: response.data.is_admin,
         });
         return true;
      } else {
         console.log("Invalid credentials");
      }
   } catch (error) {
      console.error("Login error:", error);
      return false;
   }
};
export default login;
