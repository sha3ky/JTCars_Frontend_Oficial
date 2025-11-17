import axios from "axios";
import apiLink from "./apiLink";

const link = apiLink;

// Esta función es un servicio que LLAMA A TU BACKEND DJANGO
const generarContenidoIA = async (datos) => {
   try {
      // 1. Usar axios.post correctamente: URL, luego el objeto de datos (datos)
      //    Axios serializa 'datos' a JSON automáticamente y pone el Content-Type.
      const response = await axios.post(
         `${link}/api/generate_description_ai`, // <--- Quitamos la comilla extra
         datos // <--- Pasamos el objeto de datos directamente
      );

      // 2. Axios ya parsea el JSON. El resultado está en response.data, NO en response.json()
      //    response.ok (fetch) no existe en axios. Se usa response.status para verificar el éxito.

      if (response.status === 200) {
         // Devolvemos los datos (que deberían contener la descripción)
         return { success: true, data: response.data };
      } else {
         // El servidor respondió con un error (ej: 400, 500)
         return {
            success: false,
            error: response.data.error || "Error desconocido del backend.",
         };
      }
   } catch (error) {
      // Manejar errores de red o errores de conexión (ej: 403, 404, 500)
      console.error(
         "Error en generarContenidoIA:",
         error.response ? error.response.data : error.message
      );
      return {
         success: false,
         error: "Fallo de conexión o error del servidor.",
      };
   }
};

export default generarContenidoIA;
