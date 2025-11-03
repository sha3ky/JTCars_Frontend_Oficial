import axios from "axios";
import apiLink from "./apiLink";

let link = apiLink;

const updateTables = async (coches, media) => {
   debugger;
   const cochesData = {
      coches: coches, // Assuming you have an array of coches
   };

   const mediaData = {
      media: media, // Assuming you have an array of media
   };

   try {
      // Send the coches data to the coches endpoint
      const cochesResponse = await axios.post(`${link}api/updateCoche`, coches);

      // Send the media data to the media endpoint
      const mediaResponse = await axios.post(`${link}api/updateMedia`, media);

      if (cochesResponse.status === 200 && mediaResponse.status === 200) {
         console.log("Data saved successfully");
         return true;
      } else {
         console.log("Error: Data not saved");
      }
   } catch (error) {
      console.error("Error:", error);
      return false;
   }
};

export default updateTables;
