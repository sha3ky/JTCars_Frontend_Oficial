import axios from "axios";
import apiLink from "./apiLink";

let etiqueta;
let link = apiLink;
async function getEtiqueta () {
   try {
      const response = await axios.get(`${link}api/get_etiqueta/`, {
         headers: {
            "Content-Type": "application/json",
            // "ngrok-skip-browser-warning": "69420",
         },
      });

      etiqueta = response.data;
      console.log("array data", etiqueta);
   } catch (error) {
      console.error("Error fetching data:", error);
   }
   return etiqueta;
  }


export default getEtiqueta;
