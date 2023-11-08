const etiquetaCoche= ['A','B','C','Híbrido','Eléctrico','Sin Etiqueta']
const tipoCoche=['Sedán','Deportivo','Familiar','4X4','SUV','Turismo','Furgoneta','Compacto','Monovolumen','Cabrio']
const tipoPromocion=['Oferta','Precio Reducido','Mejor precio garantizado','Como Nuevo','Pocos KM','Revisión recién','Financiamiento disponible','Posibilidad de entrega','Recién revisado','Garantía de fábrica restante','Un solo propietario','Bajas emisiones','Económico']
const tipoCombustible=['Gasolina','Diesel','GLP','GNC','Electrico']
const coloresBanners=['Rojo','Verde','Azul','Negro','Naranja','Gris','Marrón','Rosa','Púrpura']
const km=['50000','100000','150000','200000']
const cocheAno=[]

const currentYear = new Date().getFullYear();
for (let year = 1990; year <= currentYear+1; year += 2) {
  cocheAno.push(year.toString());
}
export {etiquetaCoche,tipoCoche,tipoPromocion,tipoCombustible,coloresBanners,cocheAno,km}
