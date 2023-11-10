import axios from "axios";
import apiLink from "./apiLink";

let allDataUsers;
let link = apiLink;
async function getAllusers() {
   try {
      const response = await axios.get(`${link}api/contactUser/`, {
         headers: {
            "Content-Type": "application/json",
            // "ngrok-skip-browser-warning": "69420",
         },
      });

      allDataUsers = response.data;
      console.log("array data", allDataUsers);
   } catch (error) {
      console.error("Error fetching data:", error);
   }
   return allDataUsers;
}

export default getAllusers;
