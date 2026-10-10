import axios from "axios";
import apiLink from "./apiLink";

let link = apiLink;

const updateTables = async (coches, media, imagenesAEliminar = []) => {
   try {
      const cochesResponse = await axios.post(`${link}api/updateCoche`, coches);

      const formData = new FormData();
      formData.append("id", media.id);

      // ✅ Helper: solo añade al FormData si es un File (archivo real)
      const addIfFile = (key, value) => {
         if (value instanceof File) {
            formData.append(key, value);
            console.log(`✅ ${key} añadido como File:`, value.name);
         } else if (value) {
            console.log(
               `⏭️ ${key} ignorado (no es File):`,
               typeof value,
               value
            );
         }
      };

      addIfFile("imagen1", media.imagen1);
      addIfFile("imagen2", media.imagen2);
      addIfFile("imagen3", media.imagen3);
      addIfFile("imagen4", media.imagen4);
      addIfFile("imagen5", media.imagen5);
      addIfFile("imagen6", media.imagen6);
      addIfFile("imagen7", media.imagen7);
      addIfFile("imagen8", media.imagen8);
      addIfFile("pdf", media.pdf);

      // ✅ Marcar para eliminar (esto se queda igual)
      imagenesAEliminar.forEach((imgNum) => {
         const numero = Number(imgNum.imagenNum.split("").at(-1));
         formData.append(`imagen${numero}`, "null"); // ← string "null"
         console.log(`🗑️ Marcando imagen${numero} para eliminar`);
      });

      console.log("Campos en FormData:");
      for (let pair of formData.entries()) {
         console.log("  " + pair[0] + ":", pair[1]);
      }

      const mediaResponse = await axios.post(
         `${link}api/updateMedia`,
         formData,
         {
            headers: {
               "Content-Type": "multipart/form-data",
            },
         }
      );

      if (cochesResponse.status === 200 && mediaResponse.status === 200) {
         console.log("Data saved successfully");
         return true;
      } else {
         console.log("Error: Data not saved");
         return false;
      }
   } catch (error) {
      console.error("Error:", error);
      return false;
   }
};
export default updateTables;
