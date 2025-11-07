<template>
   <q-layout view="lHh Lpr lFf">
      <!--  <q-header elevated>
         <q-toolbar class="bg-blue-grey-9">
            <q-btn
               flat
               round
               dense
               icon="menu"
               class="q-mr-sm"
               v-if="$q.screen.width < 600"
            >
               <q-menu transition-show="flip-right" transition-hide="flip-left">
                  <q-list style="min-width: 100px">
                     <router-link to="/">
                        <q-item clickable>
                           <q-item-section>Coches</q-item-section>
                        </q-item>
                     </router-link>
                     <router-link to="/contacto">
                        <q-item clickable>
                           <q-item-section>Contactar</q-item-section>
                        </q-item>
                     </router-link>

                     <router-link to="/noticias">
                        <q-item clickable>
                           <q-item-section>Noticias</q-item-section>
                        </q-item>
                     </router-link>
                     <template v-if="userIsAdmin">
                        <router-link to="/admin">
                           <q-item clickable>
                              <q-item-section>Admin</q-item-section>
                           </q-item>
                        </router-link>
                     </template>
                     <template v-if="isAuthenticated()">
                        <router-link to="/usuarioPage">
                           <q-item clickable>
                              <q-item-section>Mis datos</q-item-section>
                           </q-item>
                        </router-link>
                     </template>

                     <q-separator />
                  </q-list>
               </q-menu>
            </q-btn>
            <q-img
               height="70px"
               width="108px"
               src="/logo.png"
               v-if="$q.screen.width > 600"
            >
            </q-img>
            <q-separator
               vertical
               inset
               style="background: aliceblue"
               v-if="$q.screen.width < 600"
            />

            <q-space></q-space>

            <template v-if="$q.screen.width > 600">
               <div>
                  <div>
                     <router-link to="/contacto">
                        <q-btn
                           style="color: #bbdefb; margin-left: 15px"
                           clickable
                        >
                           <q-item-section>Contactar</q-item-section>
                        </q-btn>
                     </router-link>

                     <router-link to="/noticias">
                        <q-btn
                           style="color: #bbdefb; margin-left: 15px"
                           clickable
                        >
                           <q-item-section>Noticias</q-item-section>
                        </q-btn>
                     </router-link>
                     <template v-if="isAuthenticated()">
                        <router-link to="/usuarioPage">
                           <q-btn
                              style="color: #ffab91; margin-left: 15px"
                              clickable
                           >
                              <q-item-section>Mis Datos</q-item-section>
                           </q-btn>
                        </router-link>
                     </template>
                     <template v-if="userIsAdmin">
                        <router-link to="/admin">
                           <q-btn
                              style="color: #ffab91; margin-left: 15px"
                              clickable
                           >
                              <q-item-section>Admin</q-item-section>
                           </q-btn>
                        </router-link>
                     </template>
                  </div>
               </div>
            </template>

            <q-space></q-space>
            <div>
               <template v-if="!isAuthenticated()">
                  <div>
                     <q-btn
                        flat
                        dense
                        icon="login"
                        :style="{ color: '#bbdefb', width: '50px' }"
                        @click="loginearUsuario"
                     />
                  </div>
               </template>
               <template v-if="isAuthenticated()">
                  <div>
                     <div>
                        {{ usuarioLogineado }}
                     </div>
                     <div>
                        <q-btn flat round dense @click="logOut">Salir</q-btn>
                     </div>
                  </div>
               </template>

            </div>

            <dark-mode-toggle />
         </q-toolbar>
      </q-header> -->
      <HeaderLayout
         :is-authenticated="isAuthenticated()"
         :user-is-admin="userIsAdmin"
         :usuario-logineado="usuarioLogineado"
         @login="loginearUsuario"
         @logout="logOut"
      />
      <Footer_Layout />
      <q-page-container style="min-height: 100vh; text-align: center">
         <div class="hero-container">
            <q-img
               src="/backPrincipal.jpg"
               class="q-mx-auto hero-image"
               style="height: 400px"
               alt="jt Logo"
            >
               <div class="absolute-full flex flex-center text-white">
                  <div class="text-center hero-text">
                     <div class="text-h2 text-bold">Bienvenido a JTCars</div>
                     <div class="text-h6 q-mt-md" style="opacity: 0.9">
                        Tu concesionario de confianza
                     </div>
                  </div>
               </div>
            </q-img>
         </div>
         <div
            style="
               padding: 10px;
               background: #37474f;
               display: flex;
               justify-content: center;
               align-items: center;
            "
         >
            <div class="waviy">
               <span style="--i: 1">Grandes</span>
               <span style="">&nbsp; </span>
               <span style="--i: 2">oportunidades</span>
               <span style="">&nbsp; </span>
               <span style="--i: 3">sobre</span>
               <span style="">&nbsp; </span>
               <span style="--i: 4">ruedas</span>
            </div>
         </div>
         <div class="cars-container">
            <div
               class="cars-grid"
               :class="{ garajeVacio: datosCochesProcesados.length === 0 }"
            >
               <q-card
                  v-for="(item, index) in datosCochesProcesados"
                  :key="index"
                  class="car-card"
                  bordered
               >
                  <div class="image-container">
                     <q-img
                        :src="item.imagenPrincipal"
                        class="car-image"
                        ratio="1"
                        fit="contain"
                     >
                        <div class="absolute-bottom row justify-center q-pb-md">
                           <q-badge
                              class="text-subtitle1 q-px-md q-py-xs"
                              :color="item.colorBanner"
                              :label="item.promocion"
                           ></q-badge>
                        </div>
                     </q-img>
                  </div>
                  <q-card-section class="car-info">
                     <div class="car-details">
                        <div
                           class="car-price"
                           :class="`text-${item.colorBanner}`"
                        >
                           {{ formatPrice(item.precio) }}<span>€</span>
                        </div>
                        <div class="car-detail">
                           <span class="label text-grey"> Marca: </span>
                           <span class="value text-grey">
                              {{ item.marca }}
                           </span>
                        </div>
                        <div class="car-detail">
                           <span class="label text-grey"> Modelo: </span>
                           <span class="value text-grey">
                              {{ item.modelo }}
                           </span>
                        </div>
                        <div class="car-detail">
                           <span class="label text-grey"> Año: </span>
                           <span class="value text-grey">
                              {{ formatPrice(item.ano) }}
                           </span>
                        </div>

                        <div class="car-detail">
                           <span class="label text-grey">Km:</span>
                           <span class="value text-grey">{{ item.km }}</span>
                        </div>

                        <div class="car-detail">
                           <span class="label flex items-center"
                              >Etiqueta:</span
                           >
                           <img
                              v-if="item.etiqueta && item.etiqueta !== 'sin'"
                              :src="getEtiquetaImage(item.etiqueta)"
                              :alt="`Etiqueta ${item.etiqueta}`"
                              class="etiqueta-image"
                           />
                           <div v-else class="no-etiqueta">
                              <q-icon name="block" color="grey-6" size="24px" />
                              <span
                                 class="text-caption text-grey-6 q-ml-xs flex items-center"
                                 >Sin etiqueta</span
                              >
                           </div>
                        </div>

                        <div class="car-detail">
                           <span class="label text-grey flex items-center"
                              >Combustible:</span
                           >
                           <div>
                              <img
                                 :src="getCombustibleImage(item.combustible)"
                                 class="combustible-image"
                              />
                           </div>
                        </div>
                        <div class="car-detail">
                           <span
                              class="value text-grey text-center"
                              style="display: block; width: 100%"
                           >
                              {{ item.descripcion }}
                           </span>
                        </div>
                     </div>
                  </q-card-section>
                  <q-card-actions class="car-actions">
                     <q-btn
                        flat
                        color="primary"
                        label="Más Fotos"
                        @click="carouselFoto(index)"
                        para
                        acciones
                        class="action-btn"
                     />
                     <template v-if="item.pdf">
                        <q-btn
                           flat
                           color="secondary"
                           label="Más Datos"
                           @click="datosPdf(index)"
                           class="action-btn"
                        ></q-btn>
                     </template>
                  </q-card-actions>
               </q-card>
            </div>
         </div>
         <MasInfoDatos
            :masInfoDialog="showMasInfo"
            @close-dialog-masinfo="handleDialogClose"
            :pdf-datos="pdfDatos"
         />
         <InputUser
            :inputUserDialog="showInputUser"
            @close-dialog-newuser="handleDialogClose"
         />
         <loginUser
            :loginUserDialog="showLoginUser"
            @close-dialog-loginuser="handleDialogClose"
         />
         <MyCarousel
            :carouseloDialog="showCarousel"
            @close-dialog-carousel="handleDialogClose"
            :array-datos="arrayDatos"
         />
         <router-view />
      </q-page-container>
   </q-layout>
</template>
<style scoped>
.garajeVacio {
   /* 1. Define la imagen de fondo */
   background-image: url("/garaje2.jpg");

   /* 2. Asegúrate de que la imagen cubra todo el contenedor sin repetirse */
   background-size: cover; /* Escala la imagen para cubrir todo el área */
   background-position: center; /* Centra la imagen en el contenedor */
   background-repeat: no-repeat; /* Evita que la imagen se repita */
   background-attachment: fixed;
   /* 3. (Opcional) Color de fondo de reserva si la imagen no carga */
   background-color: #333; /* Un gris oscuro, por ejemplo */

   /* 4. (Opcional) Asegura que el contenedor tenga una altura y ancho para que el fondo sea visible */
   min-height: 300px; /* Dale una altura mínima para que se vea el fondo */
   width: 100%; /* O el ancho que necesites */

   /* 5. (Opcional) Otros estilos para el contenido dentro del garaje vacío */
   display: flex; /* Si quieres centrar texto o un icono de "no hay coches" */
   justify-content: center;
   align-items: center;
   color: white; /* Color de texto para el mensaje "garaje vacío" */
   font-size: 1.5em;
   text-align: center;
}
.combustible-image {
   width: 5vh;
}
.etiqueta-image {
   width: 5vh;
}
.hero-container {
   overflow: hidden;
}

.hero-image {
   animation: subtleZoom 20s ease-in-out infinite;
   transform-origin: center;
}

.hero-text {
   animation: textGlow 3s ease-in-out infinite alternate;
}

@keyframes subtleZoom {
   0%,
   100% {
      transform: scale(1);
   }
   50% {
      transform: scale(1.05);
   }
}

@keyframes textGlow {
   from {
      text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
   }
   to {
      text-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
   }
}

.fontSizeDescripcion {
   font-weight: bolder;
   font-size: 1.1rem;
}
.absolute-top-left {
   background-color: transparent !important;
}
.cars-container {
   padding: 20px;

   margin: 0 auto;
}

/* GRID RESPONSIVE */
.cars-grid {
   display: grid;
   grid-template-columns: repeat(3, 1fr);
   gap: 24px;
   width: 100%;
   justify-content: center;
}

/* TARJETA DEL COCHE */
.car-card {
   display: flex;
   flex-direction: column;
   height: 100%;
   transition: transform 0.3s ease, box-shadow 0.3s ease;
   padding: 5px;
}

.car-card:hover {
   transform: translateY(-4px);
   box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

/* CONTENEDOR DE IMAGEN */
.image-container {
   position: relative;
   width: 100%;
}

.car-image {
   width: 100%;
   height: 250px;
}

.logo-image {
   height: 60px;
   width: 80px;
   max-height: 8vw;
   max-width: 10vw;
}

/* INFORMACIÓN */
.car-info {
   flex-grow: 1;
   padding: 16px;
}

.car-title {
   font-size: 1.1rem;
   font-weight: 700;
   margin-bottom: 8px;
   color: #1e3c72;
   text-transform: uppercase;
}

.price-label {
   font-size: 0.8rem;
   color: #ff9800;
   margin-bottom: 4px;
}

.car-price {
   font-size: 1.4rem;
   font-weight: 700;
   color: #e74c3c;
   margin-bottom: 16px;
   background: #e0e5ec;
}

.car-details {
   padding: 10px;
}

.car-detail {
   display: flex;
   justify-content: space-between;
   margin-bottom: 6px;
   padding-bottom: 6px;
   border-bottom: 1px solid #f0f0f0;
}

.car-detail:last-child {
   border-bottom: none;
   font-size: 1.1rem;
   max-height: 4.5em;
}

.car-detail .label {
   font-weight: 700;
   color: #9e9e9e;
   font-size: 1.1rem;
}

.car-detail .value {
   font-weight: 700;
   color: #333;
   font-size: 0.9rem;
}

/* ACCIONES */
.car-actions {
   display: flex;
   justify-content: space-between;
   padding: 0 16px 16px;
   gap: 8px;
}

.action-btn {
   flex: 1;
}

/* DESCRIPCIÓN */
.car-description {
   padding: 12px 16px;
   font-size: 0.9rem;
   color: #666;
   background-color: #f9f9f9;
   border-top: 1px solid #eee;
}

/* RESPONSIVE */
/* Móvil - 1 columna */
@media (max-width: 599px) {
   .cars-grid {
      grid-template-columns: 1fr;
      gap: 16px;
   }

   .car-image {
      height: 200px;
   }

   .cars-container {
      padding: 16px;
   }
   .garajeVacio {
      background-attachment: unset;
   }
}

/* Tablet - 2 columnas */
@media (min-width: 600px) and (max-width: 1023px) {
   .cars-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
   }

   .car-image {
      height: 220px;
   }
}

/* Escritorio - 3 columnas */
@media (min-width: 1024px) and (max-width: 1439px) {
   .cars-grid {
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
   }
}

/* Escritorio grande - 4 columnas */
@media (min-width: 1440px) {
   .cars-grid {
      grid-template-columns: repeat(3, 1fr);
   }
}
.waviy {
   position: relative;
   -webkit-box-reflect: below -50px linear-gradient(transparent, rgba(0, 0, 0, 0.2));
   font-size: 3vw;
}
.waviy span {
   font-family: "Times New Roman", Times, serif;
   position: relative;
   display: inline-block;
   color: #fff;
   /* text-transform: uppercase; */
   animation: waviy 2s infinite;
   animation-delay: calc(0.2s * var(--i));
}
@keyframes waviy {
   0%,
   40%,
   100% {
      transform: translateY(0);
   }
   20% {
      transform: translateY(-10px);
   }
}
</style>
<script>
import Footer_Layout from "src/layouts/Footer_Layout.vue";
import { defineComponent, ref } from "vue";
import { useQuasar, Notify } from "quasar";
import { RouterView, RouterLink } from "vue-router";
import InputUser from "components/InputUser.vue"; //
import loginUser from "src/components/loginUser.vue";
import MyCarousel from "src/components//MyCarousel.vue";
import MasInfoDatos from "components/MasInfoDatos.vue";
import HeaderLayout from "components/HeaderComponent.vue";
import getAllData from "src/composable/loadAllData";
import store from "../../src/store";
import { authMixin } from "../mixins/authMixin";
import apiLink from "../composable/apiLink";
export default defineComponent({
   name: "PrincipalCoches",
   mixins: [authMixin],
   data() {
      return {
         link: apiLink,
         datosCochesProcesados: [],
         pdfDatos: "",
         allData: [],
         arrayDatos: [],
         showMasInfo: false,
         showInputUser: false, // Initialize showInputUser to control InputUser component
         showLoginUser: false,
         showCarousel: false,
         userId: null,
         toggleDark: false,
         modelSelectedMenu: ref("coches"),

         expandedArrow: false,
         arrayDescripciones: [],
         anoCoche: [],
         kmCoche: [],
         etiquetas: [],
         combustible: [],
         promocion: [],
         precios: [],

         modelos: [],
         colores: [],
         arrayPdf: [],
      };
   },
   async mounted() {
      // ⏬ Carga de datos asincrónica
      this.allData = await getAllData();
      console.log("this.allData / mounted", this.allData);
      if (this.allData.length !== 0) {
         this.repartirData(this.allData);
      }
   },

   methods: {
      getCombustibleImage(combustible) {
         console.log("combustible", combustible);
         if (!combustible) return "/etiquetas/gasolina.png";
         const combustibleMap = {
            Gasolina: "/etiquetas/gasolina.png",
            Diesel: "/etiquetas/diesel.png",
            Electrico: "/etiquetas/electrico.png",
            Alternativo: "/etiquetas/alternativo.png",
            Hibrido: "/etiquetas/alternativo.png",
         };

         return combustibleMap[combustible] || "/etiquetas/gasolina.png";
      },
      formatPrice(price) {
         if (!price && price !== 0) return "0";
         const number = Number(price);
         return isNaN(number) ? "0" : number.toLocaleString("es-ES");
      },
      getEtiquetaImage(etiqueta) {
         const etiquetaMap = {
            B: "/etiquetas/etiquetaB.png",
            C: "/etiquetas/etiquetaC.png",
            Híbrido: "/etiquetas/etiquetaEco.png",
            Eléctrico: "/etiquetas/etiquetaEco.png",
            "Sin Etiqueta": "/etiquetas/etiqueta0.png",
         };

         return etiquetaMap[etiqueta] || "/etiquetas/etiqueta0.png";
      },
      repartirData() {
         // Vacía el array para que no se dupliquen datos si se llama varias veces
         this.datosCochesProcesados = [];

         this.allData.forEach((element) => {
            // 1. Encontrar la imagen principal
            let imagenUrl = this.firstImgNotNull(element);

            // 2. Crear un objeto limpio con solo la información necesaria
            const cocheData = {
               imagenPrincipal: imagenUrl,
               descripcion: element.descripcion,
               ano: element.ano,
               km: element.km,
               etiqueta: element.etiqueta,
               promocion: element.promocion,
               combustible: element.combustible,
               precio: element.precio,
               marca: element.marca,
               modelo: element.modelo,
               colorBanner: element.colorBanner,
               pdf: element.pdf,
               // (Opcional) Si necesitas todas las rutas de imagen para el carrusel:
               imagenesSecundarias: [
                  element.imagen1,
                  element.imagen2,
                  element.imagen3,
                  element.imagen4,
                  element.imagen5,
                  element.imagen6,
                  element.imagen7,
                  element.imagen8,
               ].filter((img) => img), // Filtra los nulls
            };

            // 3. Añadir el objeto al nuevo array
            this.datosCochesProcesados.push(cocheData);
         });
      },
      firstImgNotNull(item) {
         const baseUrl = this.link;
         // Itera sobre los nombres de propiedad esperados (imagen1 hasta imagen8)
         for (let i = 1; i <= 8; i++) {
            const propertyName = `imagen${i}`;
            const imageUrl = item[propertyName];
            // 1. Verifica si la propiedad tiene un valor real (no es null, undefined, o string vacío)
            // El valor de la URL relativa de la imagen debe existir.
            if (imageUrl) {
               // 2. Construye la URL absoluta de forma segura usando el constructor URL.
               // Se puede usar 'new URL()' a partir de ES6 (2015), pero su soporte se popularizó después.
               // Si 'new URL()' da problemas en algún navegador viejo, usar la concatenación (ver nota).
               try {
                  // new URL() es la forma más limpia y estándar.
                  const rutaCompleta = new URL(imageUrl, baseUrl).href;
                  // 3. Si la URL se construye sin errores, la devuelve.
                  return rutaCompleta;
               } catch (error) {
                  // Esto maneja errores si la URL relativa es inválida,
                  // aunque no debería suceder si imageUrl existe.
                  console.error("Error al construir la URL:", error);
               }
            }
         }
         return null;
      },
      carouselFoto(index) {
         debugger;
         this.showCarousel = true;
         this.arrayDatos = this.allData[index];
      },
      datosPdf(index) {
         this.pdfDatos = this.allData[index].pdf;
         if (this.pdfDatos.length != 0) {
            this.showMasInfo = true;
         }
      },
      handleDialogClose() {
         this.showLoginUser = false; // Set showLoginUser to false when the dialog is closed
         this.showInputUser = false;
         this.showMasInfo = false;
         this.showCarousel = false;
      },
      nuevoUsuario() {
         this.showInputUser = true;
      },
      loginearUsuario() {
         this.showLoginUser = true;
      },
      async logOut() {
         store.dispatch("logout");
         Notify.create({
            type: "positive",
            message: "Adios.",
         });
         this.$router.push({ name: "principal-coches" });
      },
   },

   components: {
      InputUser,
      loginUser,
      MyCarousel,
      MasInfoDatos,
      Footer_Layout,
      HeaderLayout,
   },
});
</script>
