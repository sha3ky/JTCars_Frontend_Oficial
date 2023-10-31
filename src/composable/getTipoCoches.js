import axios from "axios";
import apiLink from "./apiLink";

let tipoCoche;
let link = apiLink;
async function getTipoCoche () {
  debugger
   try {
      const response = await axios.get(`${link}api/get_tipo_coches/`, {
         headers: {
            "Content-Type": "application/json",
            // "ngrok-skip-browser-warning": "69420",
         },
      });

      tipoCoche = response.data;
      console.log("array data", tipoCoche);
   } catch (error) {
      console.error("Error fetching data:", error);
   }
   return tipoCoche;
  }


export default getTipoCoche;
