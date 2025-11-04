import axios from "axios";
import apiLink from "./apiLink";

let allData;
let link = apiLink;
async function getAllData() {
   debugger;
   try {
      const response = await axios.get(`${link}api/getcoches`, {
         headers: {
            "Content-Type": "application/json",
            // "ngrok-skip-browser-warning": "69420",
         },
      });

      allData = response.data;
      console.log("array data", allData);
   } catch (error) {
      console.error("Error fetching data:", error);
   }
   return allData;
}

export default getAllData;
