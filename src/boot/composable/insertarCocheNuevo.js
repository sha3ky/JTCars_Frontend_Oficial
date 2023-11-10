import axios from "axios";
import apiLink from "./apiLink";

let link = apiLink;
let id_newCar;
const insertCocheNuevo = async (coches, media) => {
   try {
      // Send the coches data to the coches endpoint
      const cochesResponse = await axios.post(`${link}api/createcoche`, coches);

      if (cochesResponse.status === 201) {
         id_newCar = cochesResponse.data.id;
         console.log("Coche saved successfully");
      } else {
         console.log("Error: Coche not saved");
      }
   } catch (cochesError) {
      console.error("Error saving Coche:", cochesError);
      return false;
   }

   try {
      media.id = id_newCar;
      // Send the media data to the media endpoint
      const mediaResponse = await axios.post(`${link}api/updateMedia`, media);

      if (mediaResponse.status === 200) {
         console.log("Media saved successfully");
         return true;
      } else {
         console.log("Error: Media not saved");
      }
   } catch (mediaError) {
      console.error("Error saving Media:", mediaError);
      return false;
   }

   // If no exceptions are thrown, return true by default
   return true;
};

export default insertCocheNuevo;
