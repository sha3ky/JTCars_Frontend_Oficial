import axios from "axios";
import apiLink from "./apiLink";

let link = apiLink;

const insertCocheNuevo = async (coches, media) => {
   let cochesResponse;
   try {
      // Send the coches data to the coches endpoint
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
      media.id = cochesResponse.data.id;

      // ✅ CREAR FormData para TODAS las imágenes
      const formData = new FormData();
      formData.append("id", media.id);

      // Asegúrate de que 'media' sea el objeto con las propiedades a enviar
      Object.entries(media).forEach(([clave, valor], indice) => {
         // 1. Verificar si el 'valor' actual es una instancia de File
         if (valor instanceof File) {
            // Si es un archivo, añadimos el archivo real al FormData
            // Opcional: Si quieres mantener el nombre original de la clave (imagen1, imagen2...)
            // formData.append(clave, valor);

            // Si quieres usar el índice (indice + 1) para nombrar las claves:
            formData.append(`imagen${indice}`, valor);
         } else if (valor instanceof File && valor === null) {
            // Si no es un archivo (es null o una cadena), añadimos el string "null"
            // Nota: Enviar "null" como string es una práctica común para indicar
            // al backend que se debe eliminar o mantener la referencia a null.
            formData.append(`imagen${indice}`, "null");
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

      // Verificar qué se envía
      console.log("FormData a enviar:");
      for (let pair of formData.entries()) {
         console.log(pair[0] + ":", pair[1]);
      }

      // Send the media data as FormData
      const mediaResponse = await axios.post(
         `${link}api/updateMedia`,
         formData,
         {
            headers: {
               "Content-Type": "multipart/form-data",
            },
         }
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
