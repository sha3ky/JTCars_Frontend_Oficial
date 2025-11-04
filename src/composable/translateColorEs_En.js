export const colorsEs_En = (value) => {
   switch (value) {
      // --- COLORES ORIGINALES ---
      case "Rojo":
         return "red";
      case "Verde":
         return "green";
      case "Azul":
         return "blue";
      case "Negro":
         return "black";
      case "Naranja":
         return "orange";
      case "Gris":
         return "grey";
      case "Marrón":
         return "brown";
      case "Rosa":
         return "pink";
      case "Púrpura":
         return "purple";

      // --- COLORES AÑADIDOS ---
      case "Amarillo":
         return "yellow";
      case "Blanco":
         return "white";
      case "Turquesa":
         return "turquoise";
      case "Magenta":
         return "magenta"; // Color web estándar
      case "Cian":
         return "cyan";
      case "Beige":
         return "beige";
      case "Oro":
         return "gold";
      case "Plata":
         return "silver";
      case "Bronce":
         return "#CD7F32"; // Código HEX del bronce (no es una palabra clave CSS)
      case "Verde Lima":
         return "lime";
      case "Azul Marino":
         return "navy";
      case "Verde Oscuro":
         return "darkgreen";
      case "Rojo Oscuro":
         return "darkred";
      case "Azul Claro":
         return "lightblue";
      case "Verde Claro":
         return "lightgreen";
      case "Rosa Claro":
         return "lightpink";
      case "Lila":
         return "plum"; // Color CSS más cercano a Lila
      case "Índigo":
         return "indigo";
      case "Esmeralda":
         return "#50C878"; // Código HEX del Esmeralda
      case "Rubí":
         return "#E0115F"; // Código HEX del Rubí
      case "Zafiro":
         return "royalblue"; // Color CSS más cercano al Zafiro
      case "Ámbar":
         return "#FFC600"; // Código HEX para Ámbar
      case "Coral":
         return "coral";
      case "Salmón":
         return "salmon";
      case "Melocotón":
         return "peachpuff"; // Color CSS más cercano a Melocotón
      case "Menta":
         return "mintcream"; // Color CSS más cercano a Menta
      case "Lavanda":
         return "lavender";
      case "Granate":
         return "maroon";
      case "Bordó":
         return "#800000"; // Código HEX para Bordó (Similar a Maroon)
      case "Oliva":
         return "olive";
      case "Mostaza":
         return "#FFDB58"; // Código HEX para Mostaza
      case "Chocolate":
         return "chocolate";
      case "Carmesí":
         return "crimson";
      case "Ciruela":
         return "plum"; // Plum es el CSS más parecido a Ciruela

      default:
         // Deja el valor por defecto en caso de un color no listado
         return "Unknown Color";
   }
};
