import axios from "axios";
import apiLink from "./apiLink";

let link = apiLink;

const updateTables = async (coches, media, imagenesAEliminar = []) => {
   debugger;
   try {
      const cochesResponse = await axios.post(`${link}api/updateCoche`, coches);

      const formData = new FormData();
      formData.append("id", media.id);

      // Agregar imágenes
      if (media.imagen1) formData.append("imagen1", media.imagen1);
      if (media.imagen2) formData.append("imagen2", media.imagen2);
      if (media.imagen3) formData.append("imagen3", media.imagen3);
      if (media.imagen4) formData.append("imagen4", media.imagen4);
      if (media.imagen5) formData.append("imagen5", media.imagen5);
      if (media.imagen6) formData.append("imagen6", media.imagen6);
      if (media.imagen7) formData.append("imagen7", media.imagen7);
      if (media.imagen8) formData.append("imagen8", media.imagen8);
      if (media.pdf) formData.append("pdf", media.pdf);

      // ✅ CORREGIDO - Asegurar que imgNum sea número
      imagenesAEliminar.forEach((imgNum) => {
         debugger;
         const numero = Number(imgNum.imagenNum.split("").at(-1)); // ← Convertir a número
         formData.append(`imagen${numero}`, null);
         console.log(`Marcando imagen${numero} para eliminar`);
      });

      // Verificar qué se está enviando
      console.log("Campos en FormData:");
      for (let pair of formData.entries()) {
         console.log(pair[0] + ": " + pair[1]);
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
