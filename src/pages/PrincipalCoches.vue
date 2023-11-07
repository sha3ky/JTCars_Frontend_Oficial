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
               <q-menu transition-show="scale" transition-hide="scale">
                  <q-list style="min-width: 100px">
                     <!-- <router-link to="/">
                        <q-item clickable>
                           <q-item-section>Coches</q-item-section>
                        </q-item>
                     </router-link> -->
                     <router-link to="/contacto">
                        <q-item clickable>
                           <q-item-section>Contacto</q-item-section>
                        </q-item>
                     </router-link>
                     <!-- <template v-if="sessionData"> -->
                     <router-link to="/extra">
                        <q-item clickable>
                           <q-item-section>Extra</q-item-section>
                        </q-item>
                     </router-link>
                     <template v-if="userIsAdmin">
                        <router-link to="/admin">
                           <q-item clickable>
                              <q-item-section>Admin</q-item-section>
                           </q-item>
                        </router-link>
                     </template>
                     <template v-if="sessionData">
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
               src="/benysCarlogoMetal.png"
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
                           style="color: #1aee9f; margin-left: 10px"
                           clickable
                           rounded
                        >
                           <q-item-section>Contacto</q-item-section>
                        </q-btn>
                     </router-link>
                     <!-- test -->
                     <!-- <template v-if="sessionData"> -->
                     <router-link to="/extra">
                        <q-btn
                           style="color: #1aee9f; margin-left: 10px"
                           clickable
                           rounded
                        >
                           <q-item-section>Noticias</q-item-section>
                        </q-btn>
                     </router-link>
                     <template v-if="sessionData">
                        <router-link to="/usuarioPage">
                           <q-btn
                              style="color: #f11212; margin-left: 10px"
                              clickable
                              rounded
                           >
                              <q-item-section>Mis Datos</q-item-section>
                           </q-btn>
                        </router-link>
                     </template>
                     <template v-if="userIsAdmin">
                        <router-link to="/admin">
                           <q-btn
                              style="color: #f11212; margin-left: 10px"
                              clickable
                              rounded
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
               <template v-if="!sessionData">
                  <div>
                     <q-btn
                        flat
                        round
                        dense
                        icon="img:loginGreen.png"
                        @click="loginearUsuario"
                        style="width: 50px"
                     ></q-btn>
                     <q-btn
                        flat
                        round
                        dense
                        icon="img:userplusGreen.png"
                        @click="nuevoUsuario"
                     ></q-btn>
                     <q-btn color="red"  round dense @click="deleteStorage"></q-btn>
                  </div>
               </template>
               <template v-if="sessionData">
                  <div>
                     <div>
                        {{ usuarioLogineado }}
                     </div>
                     <div>
                        <q-btn flat round dense @click="logOut">Exit</q-btn>
                     </div>
                  </div>
               </template>
               <!--  -->
            </div>
            <q-toggle
               color="red"
               dark
               v-model="toggleDark"
               @click="toggleDarkMode"
            />
         </q-toolbar>
      </q-header>

      <q-footer elevated class="bg-blue-grey-9">
         <q-toolbar>
            <q-toolbar-title style="text-align: center"
               >Made with
               <span
                  ><q-img src="/lovePng.png" width="50px" height="50px"></q-img
               ></span>
               by Sha3ky's TEAM {{ fechaActual }}</q-toolbar-title
            >
         </q-toolbar>
      </q-footer>

      <q-page-container style="min-height: 100vh; text-align: center">
         <div>
            <div>
               <q-img
                  src="/banner2WebP.webp"
                  class="q-mx-auto"
                  :max-width="400"
                  :max-height="425"
                  alt="Beny1 Logo"
               ></q-img>
            </div>
            <div style="padding: 25px; background: #37474f">
               <p
                  style="
                     font-size: 4vw;
                     text-align: center;
                     text-align: center;
                     color: white;
                     margin: 0;
                  "
               >
                  Coches de segunda mano y vehículos de ocasión.
               </p>
            </div>
         </div>
         <div
            class="q-pa-md row items-start q-gutter-md"
            style="justify-content: space-around"
         >
            <div
               class="col-5"
               v-for="(item, index) in imagenPrincipal"
               :key="index"
            >
               <q-card style="padding: 0" flat bordered>
                  <q-img :src="getBase64Image(item)" class="responsive-image">
                     <div
                        style="
                           display: flex;
                           justify-content: flex-end;
                           display: contents;
                        "
                     >
                        <div>
                           <q-badge
                              rounded
                              :color="colores[index]"
                              :label="promocion[index]"
                           ></q-badge>
                           <!-- <q-badge rounded color="green" label="OFERTA" />
                           <q-badge rounded color="blue" label="HIBRIDO" /> -->
                        </div>
                        <div style="display: flex; justify-content: flex-end">
                           <q-img
                              height="7vw"
                              width="10vw"
                              src="/benysCarlogoMetal.png"
                           >
                           </q-img>
                        </div>
                     </div>
                  </q-img>
                  <q-card-section style="padding: 0">
                     <div style="padding: 5px; text-transform: uppercase">
                        {{ marcas[index] }} {{ modelos[index] }}
                     </div>
                     <div
                        class="text-overline text-orange-9"
                        style="line-height: 1px"
                     >
                        Precio
                     </div>

                     <div class="text-h5 q-mt-sm q-mb-xs" style="margin: 3px">
                        {{ precios[index] }}<span>€</span>
                     </div>
                     <div>
                        <div class="text-caption text-grey">
                           <div>
                              Año de fabricación:
                              <span
                                 ><b>{{ anoCoche[index] }}</b></span
                              >
                           </div>
                           <div>
                              Kilómetros:
                              <span>
                                 <b>{{ kmCoche[index] }}</b></span
                              >
                           </div>
                           <div>
                              Etiqueta:
                              <span
                                 ><b>{{ etiquetas[index] }}</b></span
                              >
                           </div>
                           <div>
                              Combustible:
                              <span
                                 ><b>{{ combustible[index] }}</b></span
                              >
                           </div>
                        </div>
                     </div>
                  </q-card-section>
                  <q-card-actions style="display: block; padding: 0">
                     <q-btn
                        flat
                        color="primary"
                        label="Más Fotos"
                        @click="carouselFoto(index)"
                     />
                     <q-btn
                        flat
                        color="secondary"
                        label="Más Datos"
                        @click="masDatos(index)"
                     />
                     <q-space />
                  </q-card-actions>
                  <q-card-section class="text-subtitle2" style="padding: 0">
                     {{ arrayDescripciones[index] }}
                  </q-card-section>
                  <!-- </q-col> -->
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
            @update-usuario-logineado="updateUsuarioLogineado"
         />
         <!-- @usuario_token="updateUsuarioToken" -->
         <!-- @update-usuario-logineado="updateUsuarioLogineado" -->
         <MyCarousel
            :carouseloDialog="showCarousel"
            @close-dialog-carousel="handleDialogClose"
            :array-datos="arrayDatos"
         />
         <router-view />
      </q-page-container>
   </q-layout>
</template>
<style>
.responsive-image {
   height: 250px; /* Set a fixed height for the images */
   width: 100%; /* Ensure the image takes up the entire space */
   object-fit: cover; /* Preserve the aspect ratio and cover the entire space */
}
</style>
<script>
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";
import { RouterView, RouterLink } from "vue-router";
import InputUser from "components/InputUser.vue"; // Replace with the actual path
import loginUser from "src/components/loginUser.vue";
import MyCarousel from "src/components//MyCarousel.vue"; // Adjust the path as needed
import MasInfoDatos from "components/MasInfoDatos.vue";
import getAllData from "src/composable/loadAllData";
import logout from "src/composable/logOut";
import { Notify } from "quasar";
import store from "../../src/store";

//import EssentialLink from 'components/EssentialLink.vue'; // Adjust the path as needed

export default defineComponent({
   name: "PrincipalCoches",
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
         userIsAdmin: false,
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
         usuarioLogineado: "",
         sessionData: "",
         fechaActual: new Date().getFullYear(),
      };
   },
   async mounted() {
      debugger;
      // cuando vienes de otras rutas
      this.sessionData = store.state.sessionData;
      this.usuarioLogineado = store.state.name;
      this.userIsAdmin = store.state.isAdmin
         ? store.state.isAdmin
         : this.userIsAdmin;
      this.toggleDark = store.state.toggleDarkMode
         ? store.state.toggleDarkMode
         : this.toggleDark;
      // Use an async function to fetch data and assign it to allData
      this.allData = await getAllData();
      console.log(this.allData);
      if (this.allData !== 0) {
         this.repartirData(this.allData);
      }
   },
   methods: {
      repartirData() {
         debugger;
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
         debugger;
         this.showCarousel = true;
         this.arrayDatos = this.allData[index];
      },
      masDatos(index) {
         this.pdfDatos = this.allData[index].pdf;
         if (this.pdfDatos) {
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
      toggleDarkMode() {
         debugger;
         const $q = this.$q;
         $q.dark.toggle();
         store.state.toggleDarkMode = this.toggleDark;
      },
      // ------------------------------------------------------------------------------------------------------------------
      // forma paleto de mantener el usuario logineado a traves de todos los componentes y paginas
      updateUsuarioLogineado(bool) {
         debugger;
         if (bool) {
            this.usuarioLogineado = store.state.name;
            this.sessionData = store.state.sessionData;
            this.userIsAdmin = store.state.isAdmin;
         }
      },
      // ------------------------------------------------------------------------------------------------------------------
      async logOut() {
         debugger;
         const result = await logout();
         if (result) {
            store.dispatch("logout");
            this.usuarioLogineado = "";
            this.sessionData = "";
            this.userIsAdmin = false;
            Notify.create({
               type: "positive",
               message: "Adios.",
            });
         } else {
            Notify.create({
               type: "negative",
               message: "Error al des-loginear al usuario.",
            });
            store.dispatch("logout");
         }
      },
      deleteStorage() {
         debugger;
         sessionStorage.removeItem("access_token");
         sessionStorage.removeItem("refresh_token");
         sessionStorage.removeItem("tokServ");
         sessionStorage.removeItem("token");
         sessionStorage.removeItem("username");
         sessionStorage.removeItem("email");
         sessionStorage.removeItem('is_active')
      //    sessionStorage.setItem('username', response.data.username); // Store the username
      // sessionStorage.setItem('email', response.data.email);
      }
   },

   components: {
      InputUser,
      loginUser,
      MyCarousel,
      MasInfoDatos,
   },

   setup() {
      // dark mode
      // const $q = useQuasar();
      // $q.dark.set(true); // or false or "auto"
      // $q.dark.toggle(); // toggle
      return {};
   },
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
    //    debugger;
    //    allData.value.forEach((element) => {
    //       imagenPrincipal.value.push(element.imagen1);
    //    });
    // }
    // function getBase64Image(image) {
    //    return `data:image/jpeg;base64,${image}`;
    // } -->
<!-- ../stores
../../../store -->
