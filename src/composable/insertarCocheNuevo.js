import axios from "axios";
import apiLink from "./apiLink";

let link = apiLink;

const insertCocheNuevo = async (coches, media) => {
   let cochesResponse;
   try {
      cochesResponse = await axios.post(`${link}api/createcoche`, coches);

      if (cochesResponse.status === 201) {
         console.log("Coche saved successfully");
      } else {
         console.log("Error: Coche not saved");
      }
   } catch (cochesError) {
      console.error("Error saving Coche:", cochesError);
      return false;
   }

   try {
      // ✅ Usar el ID del MediaFiles, NO del Coche
      //media.id = cochesResponse.data.media_files;
      media.id = cochesResponse.data.data.media_files;

      const formData = new FormData();
      formData.append("id", media.id);

      // ✅ Procesar solo los campos imagen1..imagen8
      Object.entries(media).forEach(([clave, valor]) => {
         if (/^imagen[1-8]$/.test(clave)) {
            if (valor instanceof File) {
               formData.append(clave, valor);
               console.log(`✅ ${clave} añadido como File:`, valor.name);
            } else if (valor === null) {
               formData.append(clave, "null");
               console.log(`🗑️ ${clave} marcado para eliminar`);
            }
         }
      });

      // Procesar PDF
      if (media.pdf instanceof File) {
         formData.append("pdf", media.pdf);
         console.log("✅ Agregando PDF como archivo");
      } else if (media.pdf === null) {
         formData.append("pdf", "null");
         console.log("✅ Marcando PDF para eliminar");
      }

      // Ver qué se envía
      console.log("FormData a enviar:");
      for (let pair of formData.entries()) {
         console.log("  " + pair[0] + ":", pair[1]);
      }

      const mediaResponse = await axios.post(
         `${link}api/updateMedia`,
         formData,
         { headers: { "Content-Type": "multipart/form-data" } }
      );

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
};

export default insertCocheNuevo;
