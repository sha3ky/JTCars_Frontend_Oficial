import axios from "axios";
import apiLink from "../composable/apiLink";

let users;
let link = apiLink;
const fetchUserData = async () => {
   try {
      const response = await axios.get(`${link}usuarios/`, {
         headers: {
            "Content-Type": "application/json",
            // "ngrok-skip-browser-warning": "69420",
         },
      });
      users = response.data;
      console.log("Data received:", users);
   } catch (error) {
      console.error("Error fetching data:", error);

   }
   return users;
};

export default fetchUserData;
