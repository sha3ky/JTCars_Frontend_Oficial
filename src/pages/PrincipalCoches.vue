<template>
   <q-layout view="lHh Lpr lFf">
      <q-header elevated>
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
                     <!-- <router-link to="/">
                        <q-item clickable>
                           <q-item-section>Coches</q-item-section>
                        </q-item>
                     </router-link> -->
                     <router-link to="/contacto">
                        <q-item clickable>
                           <q-item-section>Contactar</q-item-section>
                        </q-item>
                     </router-link>
                     <!-- <template v-if="sessionData"> -->
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

                     <!-- </template> -->
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
            <!-- reactividad -->
            <template v-if="$q.screen.width > 600">
               <div>
                  <div>
                     <!-- <router-link to="/">
                        <q-btn
                           class="glossy"
                           style="color: #1aee9f"
                           clickable
                           rounded
                        >
                           <q-item-section>Coches</q-item-section>
                        </q-btn>
                     </router-link> -->
                     <router-link to="/contacto">
                        <q-btn
                           style="color: #bbdefb; margin-left: 15px"
                           clickable
                        >
                           <q-item-section>Contactar</q-item-section>
                        </q-btn>
                     </router-link>
                     <!-- test -->
                     <!-- <template v-if="sessionData"> -->
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

                     <!-- </template> -->
                     <!-- test -->
                  </div>
               </div>
            </template>
            <!-- reactividad -->
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
                     <!-- <q-btn
                        flat
                        dense
                        icon="person_add"
                        :style="{ color: '#bbdefb', width: '50px' }"
                        @click="nuevoUsuario"
                     /> -->

                     <!-- boton para limpiar session storage -->
                     <!-- <q-btn
                        color="red"
                        round
                        dense
                        @click="limpiarStorage"
                     ></q-btn> -->
                     <!-- boton para limpiar session storage -->
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
               <!--  -->
            </div>
            <!--   <q-toggle
               v-model="toggleDark"
               @click="toggleDarkMode"
               color="black"
               dark
               keep-color
               :label="toggleDark ? 'Modo oscuro' : 'Modo claro'"
            >
               <template v-slot:thumb>
                  <q-icon :name="toggleDark ? 'nights_stay' : 'wb_sunny'" />
               </template>
            </q-toggle> -->
            <dark-mode-toggle />
         </q-toolbar>
      </q-header>

      <!-- <q-footer elevated class="bg-blue-grey-9">
         <q-toolbar>
            <q-toolbar-title style="text-align: center"
               >Made with
               <span
                  ><q-img src="/lovePng.png" width="50px" height="50px"></q-img
               ></span>
               by Sha3ky's TEAM {{ fechaActual }}</q-toolbar-title
            >
         </q-toolbar>
      </q-footer> -->
      <Footer_Layout />

      <q-page-container style="min-height: 100vh; text-align: center">
         <div>
            <q-img
               src="/backPrincipal.jpg"
               class="q-mx-auto"
               style="height: 400px"
               alt="jt Logo"
            >
               <div class="absolute-full flex flex-center text-white">
                  <div class="text-center">
                     <div class="text-h2 text-bold">Bienvenido a JTCars</div>
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
            <!--<p
               style="
                  font-size: 2.7vw;
                  text-align: center;
                  text-align: center;
                  color: white;
                  margin: 0;
               "
            >
               Coches de segunda mano y vehículos de ocasión.
            </p>-->
            <div class="waviy">
               <span style="--i: 1">Coches</span>
               <span style="">&nbsp; </span>
               <span style="--i: 2">de</span>
               <span style="">&nbsp; </span>
               <span style="--i: 3">segunda</span>
               <span style="">&nbsp; </span>
               <span style="--i: 4">mano</span>
               <span style="">&nbsp; </span>
               <span style="--i: 5">y</span>
               <span style="">&nbsp; </span>
               <span style="--i: 6">vehículos</span>
               <span style="">&nbsp; </span>
               <span style="--i: 7">de</span>
               <span style="">&nbsp; </span>
               <span style="--i: 8">ocasión</span>
               <span style="">&nbsp; </span>
               <!-- <span style="--i: 9">MA</span>
               <span style="--i: 10">NO</span> -->
            </div>
         </div>
         <!-- q-pa-md row items-start q-gutter-md -->
         <!-- [class="responsive-image",
                class="cardImage"
         ] -->

         <div class="cars-container">
            <div class="cars-grid">
               <q-card
                  v-for="(item, index) in imagenPrincipal"
                  :key="index"
                  class="car-card"
                  bordered
               >
                  <!-- IMAGEN DEL COCHE -->
                  <div class="image-container">
                     <q-img
                        :src="getBase64Image(item)"
                        class="car-image"
                        ratio="1"
                     >
                        <!-- Logo -->
                        <div class="absolute-top-left q-pa-md">
                           <q-img src="/logo.png" class="logo-image"></q-img>
                        </div>

                        <!-- Badge promoción -->
                        <div class="absolute-bottom row justify-center q-pb-md">
                           <q-badge
                              class="text-subtitle1 q-px-md q-py-xs"
                              :color="colores[index]"
                              :label="promocion[index]"
                           ></q-badge>
                        </div>
                     </q-img>
                  </div>

                  <!-- INFORMACIÓN DEL COCHE -->
                  <q-card-section class="car-info">
                     <div class="car-title text-primary">
                        {{ marcas[index] }} {{ modelos[index] }}
                     </div>

                     <div class="price-label text-warning">Precio</div>

                     <div class="car-price text-negative">
                        {{ precios[index] }}<span>€</span>
                     </div>

                     <div class="car-details">
                        <div class="car-detail">
                           <span class="label text-grey">Año:</span>
                           <span class="value text-dark">{{
                              anoCoche[index]
                           }}</span>
                        </div>
                        <div class="car-detail">
                           <span class="label text-grey">Km:</span>
                           <span class="value text-dark">{{
                              kmCoche[index]
                           }}</span>
                        </div>
                        <div class="car-detail">
                           <span class="label text-grey">Etiqueta:</span>
                           <span class="value text-dark">{{
                              etiquetas[index]
                           }}</span>
                        </div>
                        <div class="car-detail">
                           <span class="label text-grey">Combustible:</span>
                           <span class="value text-dark">{{
                              combustible[index]
                           }}</span>
                        </div>
                     </div>
                  </q-card-section>

                  <q-card-section class="car-description text-grey">
                     {{ arrayDescripciones[index] }}
                  </q-card-section>
                  <!-- ACCIONES -->
                  <q-card-actions class="car-actions">
                     <q-btn
                        flat
                        color="primary"
                        label="Más Fotos"
                        @click="carouselFoto(index)"
                        class="action-btn"
                     />
                     <template v-if="arrayPdf[index]">
                        <q-btn
                           flat
                           color="secondary"
                           label="Más Datos"
                           @click="masDatos(index)"
                           class="action-btn"
                        ></q-btn>
                     </template>
                  </q-card-actions>

                  <!-- DESCRIPCIÓN -->
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
         <!--  @update-usuario-logineado="updateUsuarioLogineado" -->
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
.absolute-top-left {
   background-color: transparent !important;
}
.cars-container {
   padding: 20px;
   max-width: 1400px;
   margin: 0 auto;
}

/* GRID RESPONSIVE */
.cars-grid {
   display: grid;
   grid-template-columns: repeat(3, 1fr);
   gap: 24px;
   width: 100%;
}

/* TARJETA DEL COCHE */
.car-card {
   display: flex;
   flex-direction: column;
   height: 100%;
   transition: transform 0.3s ease, box-shadow 0.3s ease;
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
   object-fit: cover;
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
}

.car-details {
   margin-bottom: 16px;
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
}

.car-detail .label {
   font-weight: 500;
   color: #666;
   font-size: 0.9rem;
}

.car-detail .value {
   font-weight: 400;
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
      grid-template-columns: repeat(4, 1fr);
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
import DarkModeToggle from "src/components/DarkModeToggle.vue";
import Footer_Layout from "src/layouts/Footer_Layout.vue";
import { defineComponent, ref } from "vue";
import { useQuasar, Notify } from "quasar";
import { RouterView, RouterLink } from "vue-router";
import InputUser from "components/InputUser.vue"; // Replace with the actual path
import loginUser from "src/components/loginUser.vue";
import MyCarousel from "src/components//MyCarousel.vue"; // Adjust the path as needed
import MasInfoDatos from "components/MasInfoDatos.vue";
import getAllData from "src/composable/loadAllData";
import store from "../../src/store";
import { authMixin } from "../mixins/authMixin";

export default defineComponent({
   name: "PrincipalCoches",
   mixins: [authMixin],
   data() {
      return {
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
         imagenPrincipal: [],
         expandedArrow: false,
         arrayDescripciones: [],
         anoCoche: [],
         kmCoche: [],
         etiquetas: [],
         combustible: [],
         promocion: [],
         precios: [],
         marcas: [],
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
      repartirData() {
         this.allData.forEach((element) => {
            let imagen = this.firstImgNotNull(element);
            this.imagenPrincipal.push(imagen);
            this.arrayDescripciones.push(element.descripcion);
            this.anoCoche.push(element.ano);
            this.kmCoche.push(element.km);
            this.etiquetas.push(element.etiqueta);
            this.promocion.push(element.promocion);
            this.combustible.push(element.combustible);
            this.precios.push(element.precio);
            this.marcas.push(element.marca);
            this.modelos.push(element.modelo);
            this.colores.push(element.colorBanner);
            this.arrayPdf.push(element.pdf); //guardamos todos los pdfs en un array
         });
      },
      firstImgNotNull(item) {
         // devolver la primera imagen del objeto que no es null
         const sliced = {};
         const keys = Object.keys(item);
         for (let i = 13; i <= 20; i++) {
            sliced[keys[i]] = item[keys[i]];
         }
         let num = 1;
         while (num != 8) {
            const propertyName = `imagen${num}`;
            if (sliced[propertyName] != null) {
               return sliced[propertyName];
            } else {
               num++;
            }
         }
      },
      getBase64Image(image) {
         return `data:image/jpeg;base64,${image}`;
      },
      carouselFoto(index) {
         this.showCarousel = true;
         this.arrayDatos = this.allData[index];
      },
      masDatos(index) {
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
      DarkModeToggle,
   },

   /*   setup() {
      // dark mode
      // const $q = useQuasar();
      // $q.dark.set(true); // or false or "auto"
      // $q.dark.toggle(); // toggle
      return {};
   }, */
});
</script>

<!-- function para conseguir borrar el storage
  //  deleteStorage() {
  //   debugger
  //    sessionStorage.removeItem("access_token");
  //    sessionStorage.removeItem("refresh_token");
  //    sessionStorage.removeItem("tokServ");
  //    sessionStorage.removeItem("token");
  // }, -->

<!-- // onMounted(async () => {
    //    // Use an async function to fetch data and assign it to allData
    //    allData.value = await getAllData();
    //    console.log(allData.value);
    //    if (allData.value !== 0) {
    //       repartirData(allData.value);
    //    }
    // });
    // function repartirData() {
    //
    //    allData.value.forEach((element) => {
    //       imagenPrincipal.value.push(element.imagen1);
    //    });
    // }
    // function getBase64Image(image) {
    //    return `data:image/jpeg;base64,${image}`;
    // } -->
<!-- ../stores
../../../store -->
