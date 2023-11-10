import axios from "axios";
import apiLink from "./apiLink";

let promotions;
let link = apiLink;
async function getPromotions () {
   try {
      const response = await axios.get(`${link}api/get_promotions/`, {
         headers: {
            "Content-Type": "application/json",
            // "ngrok-skip-browser-warning": "69420",
         },
      });

      promotions = response.data;
      console.log("array data", promotions);
   } catch (error) {
      console.error("Error fetching data:", error);
   }
   return promotions;
  }


export default getPromotions;
