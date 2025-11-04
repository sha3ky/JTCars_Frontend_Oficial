import axios from "axios";
import apiLink from "./apiLink";

let link = apiLink;

const updateTables = async (coches, media) => {
   debugger;
   console.log("URL completa:", `${link}api/updateMedia`);
   try {
      // Send the coches data to the coches endpoint
      const cochesResponse = await axios.post(`${link}api/updateCoche`, coches);

      // Crear FormData para los archivos
      const formData = new FormData();
      formData.append("id", media.id);

      // Agregar todas las imágenes que existan
      if (media.imagen1) formData.append("imagen1", media.imagen1);
      if (media.imagen2) formData.append("imagen2", media.imagen2);
      if (media.imagen3) formData.append("imagen3", media.imagen3);
      if (media.imagen4) formData.append("imagen4", media.imagen4);
      if (media.imagen5) formData.append("imagen5", media.imagen5);
      if (media.imagen6) formData.append("imagen6", media.imagen6);
      if (media.imagen7) formData.append("imagen7", media.imagen7);
      if (media.imagen8) formData.append("imagen8", media.imagen8);
      if (media.pdf) formData.append("pdf", media.pdf);

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
      console.log("URL completa:", `${link}api/updateMedia`);
      // Debería mostrar: "http://127.0.0.1:8000/api/updateMedia"
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
