import axios from "axios";
import apiLink from "./apiLink";

const link = apiLink;

const contactUser = async (objeto) => {
   debugger;

   try {
      // Send a POST request to register the user
      const response = await axios.post(`${link}api/contactUser/`, {
         name: objeto.username, // Update to match the field names in the Django view
         email: objeto.email,
         telefono:objeto.mobileNumber,
         mensaje:objeto.textareaModel,
         combustible:objeto.combustible,
         precio:objeto.precio,
         ano:objeto.ano,
         etiqueta:objeto.etiqueta,
         km:objeto.km,
        tipo:objeto.tipo,
        notifications:objeto.notificaciones
      });

      if (response.status == 200) {
         return true;
      } else {
         return false;
      }
   } catch (error) {
      console.error("user contact :", error);
      return { error: "An error occurred from contactUser function." };
   }
};

export default contactUser;
