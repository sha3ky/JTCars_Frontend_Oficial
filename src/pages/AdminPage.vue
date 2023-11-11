<template>
   <q-layout view="lHh Lpr lFf" v-if="sessionData && userIsAdmin">
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
                     <router-link to="/home">
                        <q-item clickable>
                           <q-item-section>Coches</q-item-section>
                        </q-item>
                     </router-link>
                     <router-link to="/contacto">
                        <q-item clickable>
                           <q-item-section>Contacto</q-item-section>
                        </q-item>
                     </router-link>
                     <!-- <template v-if="sessionData"> -->
                     <router-link to="/noticias">
                        <q-item clickable>
                           <q-item-section>Noticias</q-item-section>
                        </q-item>
                     </router-link>
                     <template v-if="sessionData">
                        <router-link to="/usuarioPage">
                           <q-item clickable>
                              <q-item-section>Mis Datos</q-item-section>
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
                     <router-link to="/">
                        <q-btn style="color: #1aee9f" clickable rounded>
                           <q-item-section>Coches</q-item-section>
                        </q-btn>
                     </router-link>
                     <router-link to="/contacto">
                        <q-btn
                           style="color: #1aee9f; margin-left: 10px"
                           clickable
                           rounded
                        >
                           <q-item-section>Contactar</q-item-section>
                        </q-btn>
                     </router-link>
                     <!-- test -->
                     <!-- <template v-if="sessionData"> -->
                     <router-link to="/noticias">
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
                              <q-item-section>Mis datos</q-item-section>
                           </q-btn>
                        </router-link>
                     </template>
                     <!-- <router-link to="/extra">
                        <q-btn

                           style="color: #1aee9f; margin-left: 10px"
                           clickable
                           rounded
                        >
                           <q-item-section>Noticias</q-item-section>
                        </q-btn>
                     </router-link> -->
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
                     <!-- <q-btn
                       flat
                       round
                       dense
                       icon="img:userplusGreen.png"
                       @click="nuevoUsuario"
                    ></q-btn> -->
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
      <!-- <q-footer elevated class="bg-blue-grey-9">
         <q-toolbar>
            <q-toolbar-title style="text-align: center"
               >Made with
               <span
                  ><q-img src="/lovePng.png" width="50px" height="50px"></q-img
               ></span>
               by Sha3ky's TEAM</q-toolbar-title
            >
         </q-toolbar>
      </q-footer> -->
      <Footer_Layout />
      <!--  -->
      <q-page-container style="min-height: 100vh; text-align: center">
         <div class="q-gutter-y-md" style="">
            <q-card>
               <q-tabs
                  v-model="tab"
                  dense
                  class="text-grey"
                  active-color="primary"
                  indicator-color="primary"
                  align="justify"
                  narrow-indicator
               >
                  <q-tab name="coches" label="Coches" />
                  <q-tab name="personas" label="Clientes" />
                  <!-- <q-tab name="datos" label="Datos personales" /> -->
               </q-tabs>

               <q-separator />

               <q-tab-panels v-model="tab" animated>
                  <q-tab-panel name="coches">
                     <div class="text-h6">Coches</div>
                     <div>
                        <q-btn color="teal" @click="addNewCar">
                           <q-icon left size="1em" name="add" />
                           <div>Añadir Coche</div>
                        </q-btn>
                     </div>
                     <div class="q-pa-md">
                        <q-table
                           title="Coches"
                           :rows="rowsCoches"
                           :columns="columnsCoches"
                           row-key="matricula"
                           @row-click="handleRowClick"
                           dense
                           :rows-per-page="25"
                           :filter="filterCoches"
                        >
                           <template v-slot:top-right>
                              <q-input
                                 borderless
                                 dense
                                 debounce="300"
                                 v-model="filterCoches"
                                 placeholder="Search"
                              >
                                 <template v-slot:append>
                                    <q-icon name="search" />
                                 </template>
                              </q-input>
                           </template>
                        </q-table>
                     </div>
                  </q-tab-panel>
                  <q-tab-panel name="personas">
                     <div class="text-h6">Clientes</div>
                     <q-table
                        title="Personas"
                        :rows="rowsPersonas"
                        :columns="columnsPersonas"
                        row-key="email"
                        dense
                        :rows-per-page="25"
                        :filter="filterPersonas"
                     >
                        <template v-slot:top-right>
                           <q-input
                              borderless
                              dense
                              debounce="300"
                              v-model="filterPersonas"
                              placeholder="Search"
                           >
                              <template v-slot:append>
                                 <q-icon name="search" />
                              </template>
                           </q-input> </template
                     ></q-table>
                  </q-tab-panel>
                  <!-- <q-tab-panel name="datos">
                     <div class="text-h6">Usuario</div>
                     <div style="display: flex; justify-content: center">
                        <div>
                           <q-input
                              filled
                              v-model="nombreUsuario"
                              label="Nombre"
                              dense
                           />
                           <q-input
                              filled
                              v-model="nombreUsuario"
                              label="Apellido"
                              dense
                           />
                        </div>
                        <div>
                           <q-input
                              filled
                              v-model="nombreUsuario"
                              label="Correo"
                              dense
                           /><q-input
                              filled
                              v-model="nombreUsuario"
                              label="Contraseña"
                              dense
                           />
                        </div>
                     </div>
                  </q-tab-panel> -->
               </q-tab-panels>
            </q-card>
         </div>

         <q-dialog v-model="dialogCoches" persistent>
            <q-card style="max-width: 538px">
               <q-card-section style="padding: 0">
                  <div class="text-h6" style="text-align: center">
                     Cambiar configuracion coche
                  </div>
               </q-card-section>
               <q-card>
                  <div>
                     <div style="display: flex; padding: 5px">
                        <div>
                           <q-input
                              filled
                              v-model="datosCoches.matricula"
                              label="Matricula"
                              dense
                           />
                        </div>
                        <div>
                           <q-input
                              filled
                              v-model="datosCoches.marca"
                              label="Marca"
                              dense
                           />
                        </div>
                        <div>
                           <q-input
                              filled
                              v-model="datosCoches.modelo"
                              label="Modelo"
                              dense
                           />
                        </div>
                     </div>

                     <div style="display: flex; padding: 5px">
                        <div style="width: 33vw">
                           <q-select
                              filled
                              v-model="datosCoches.ano"
                              :options="optionsAno"
                              label="Selecionar Año"
                              dense
                              style="max-width: 100%"
                           />
                        </div>
                        <div style="width: 33vw">
                           <q-input
                              filled
                              v-model="datosCoches.km"
                              label="KM"
                              dense
                           />
                        </div>
                        <div style="width: 33vw">
                           <q-input
                              filled
                              v-model="datosCoches.descripcion"
                              label="Descripcion"
                              dense
                           />
                        </div>
                     </div>

                     <div style="display: flex; padding: 5px">
                        <div style="width: 33vw">
                           <div>
                              <q-select
                                 filled
                                 v-model="datosCoches.etiqueta"
                                 :options="optionsEtiqueta"
                                 label="Selecionar Etiqueta"
                                 dense
                                 style="max-width: 100%"
                              />
                           </div>
                        </div>
                        <!-- tipoCoches -->
                        <div style="width: 33vw">
                           <div>
                              <q-select
                                 filled
                                 v-model="datosCoches.tipo"
                                 :options="optionsTipo"
                                 label="Selecionar Tipo"
                                 dense
                                 style="max-width: 100%"
                              />
                           </div>
                        </div>
                        <!-- promotions -->
                        <div style="width: 33vw">
                           <div style="">
                              <q-select
                                 filled
                                 v-model="datosCoches.promocion"
                                 :options="optionsPromotion"
                                 label="Selecionar Promocion"
                                 dense
                                 style="max-width: 100%"
                              />
                           </div>
                        </div>
                     </div>
                     <div style="display: flex; padding: 5px">
                        <div style="width: 33vw">
                           <q-select
                              filled
                              v-model="datosCoches.combustible"
                              :options="optionsCombustible"
                              label="Selecionar Combustible"
                              dense
                              style="max-width: 100%"
                           />
                        </div>
                        <div style="width: 33vw">
                           <q-input
                              dense
                              filled
                              v-model="datosCoches.precio"
                              label="Precio"
                           />
                        </div>
                        <div style="width: 33vw">
                           <q-select
                              filled
                              v-model="datosCoches.colorBanner"
                              :options="coloresBanners"
                              label="Color Banner"
                              dense
                              style="max-width: 100%"
                           />
                        </div>
                     </div>
                     <div>
                        <div style="display: flex; justify-content: center">
                           <div v-if="existPdf">
                              <q-btn
                                 outline
                                 color="primary"
                                 label="Eliminar Pdf"
                                 @click="deletePdf"
                              />
                           </div>
                           <div v-if="!existPdf">
                              <span style="padding: 5px"> sin pdf</span>
                           </div>
                           <div style="">
                              <q-file
                                 filled
                                 v-model="inputPdf"
                                 label="PDF"
                                 dense
                              />
                           </div>
                           <div style="">
                              <q-file
                                 filled
                                 v-model="modelInImgNew"
                                 label="Añadir imagen"
                                 dense
                              />
                           </div>
                        </div>

                        <div style="display: flex">
                           <div class="card-container">
                              <q-card
                                 v-for="(image, index) in imagenesArray"
                                 :key="index"
                                 :name="index"
                                 class="card-container"
                                 style="
                                    display: flex;
                                    justify-content: center;
                                    max-width: 130px;
                                 "
                              >
                                 <q-img
                                    :src="getBase64Image(image.imagen)"
                                    class="responsive-image"
                                    style="max-width: 180px; height: 60px"
                                 />

                                 <q-separator />

                                 <q-card-actions align="center">
                                    <q-btn flat @click="modImg(image)"
                                       >Modificar</q-btn
                                    >
                                    <q-btn flat @click="delImg(image)"
                                       >Eliminar</q-btn
                                    >
                                 </q-card-actions>
                              </q-card>
                           </div>
                        </div>
                     </div>
                  </div>
               </q-card>

               <q-card-section class="q-pt-none"> </q-card-section>

               <q-card-actions align="right" class="text-primary">
                  <div v-if="!newCar">
                     <q-btn
                        color="red"
                        text-color="black"
                        label="Eliminar"
                        v-close-popup
                        @click="delCar"
                     />
                  </div>
                  <div style="padding: 3px">
                     <q-btn
                        color="orange"
                        text-color="black"
                        label="Cancel"
                        @click="cancelInputCarDialog"
                     />
                  </div>
                  <div>
                     <q-btn
                        label="Aceptar"
                        @click="aceptarCambios"
                        v-close-popup
                        color="green"
                        text-color="black"
                     />
                  </div>
               </q-card-actions>
            </q-card>
         </q-dialog>
         <q-dialog v-model="anadirImagenDialog">
            <q-card>
               <q-card-section class="row items-center q-pb-none">
                  <h4>Cambiar imagen</h4>
                  <q-space />
                  <q-btn icon="close" flat round dense v-close-popup />
               </q-card-section>

               <q-card-section>
                  <q-file filled v-model="inputImagen" label="Filled" />
                  <!-- <q-input
                     @update:model-value="
                        (val) => {
                           file = val[0];
                        }
                     "
                     filled
                     type="file"
                     hint="Native file"
                  /> -->
               </q-card-section>
            </q-card>
         </q-dialog>
      </q-page-container>
      <InputUser
         :inputUserDialog="showInputUser"
         @close-dialog-newuser="handleDialogClose"
      />
      <loginUser
         :loginUserDialog="showLoginUser"
         @close-dialog-loginuser="handleDialogClose"
         @update-usuario-logineado="updateUsuarioLogineado"
      />
      <router-view />
   </q-layout>
   <q-layout v-else>
      <div
         class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center"
      >
         <div>
            <div style="font-size: 30vh">404</div>

            <div class="text-h2" style="opacity: 0.4">
               Oops. No hay nada que ver aqui...
            </div>
            <q-btn
               class="q-mt-xl"
               color="white"
               text-color="blue"
               unelevated
               to="/"
               label="Primera página"
               no-caps
            />
         </div>
      </div>
   </q-layout>
   <q-dialog v-model="waitDialog" persistent>
      <q-card
         style="
            background: cadetblue;
            height: 56px;
            align-items: flex-end;
            display: flex;
         "
      >
         <q-card-section class="q-pt-none" style="display: contents;">
            <p style="font-size: medium">Espere por favor ...</p>
            <q-circular-progress
               indeterminate
               size="28px"
               :thickness="1"
               color="grey-8"
               track-color="lime"
               class="q-ma-md"
            />
         </q-card-section>
      </q-card>
   </q-dialog>
</template>
<style>
.iframe-container {
   width: 100%;
   height: 100vh; /* This makes the container take up the full viewport height */
   /* Add any additional styles to the container if needed */
}
body.body--dark {
   background: #0c0c0c;
}
.card-container {
   display: flex;
   flex-wrap: wrap;
}

.card-item {
   flex: 0 0 calc(33.33% - 1rem); /* Three columns with 1rem spacing between cards */
}
</style>
<script>
import Footer_Layout from "src/layouts/Footer_Layout.vue";
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";
import store from "../../src/store";
import InputUser from "components/InputUser.vue"; // Replace with the actual path
import loginUser from "src/components/loginUser.vue";
import logout from "src/composable/logOut";
import { Notify } from "quasar";
import getAllData from "src/composable/loadAllData";
import getAllusers from "src/composable/getUsersContact";
import deleteCar from "src/composable/deleteCar";
// import getEtiqueta from "src/composable/getEtiqueta";
// import getPromotions from "src/composable/getPromotions";
// import getTipoCoche from "src/composable/getTipoCoches";
import updateTables from "src/composable/updatetableCocheMedia";
import convertFileToBase64 from "src/composable/convertirFileBase64";
import insertCocheNuevo from "src/composable/insertarCocheNuevo";
import { colorsEn_Es } from "src/composable/translateColorEn_Es";
import { colorsEs_En } from "src/composable/translateColorEs_En";
import {
   etiquetaCoche,
   tipoCoche,
   tipoPromocion,
   tipoCombustible,
   coloresBanners,
   cocheAno,
} from "src/composable/dataSelectores";

export default defineComponent({
   name: "AdminPage",
   data() {
      return {
         anadirImagenDialog: false,
         dialogCoches: false,
         showInputUser: false, // Initialize showInputUser to control InputUser component
         showLoginUser: false,
         userId: null,
         userIsAdmin: false,
         toggleDark: false,
         modelSelectedMenu: ref("coches"),
         usuarioLogineado: "",
         sessionData: "",
         tab: "coches",
         columnsCoches: [
            {
               name: "matricula",
               required: true,
               label: "Matricula",
               align: "center",
               sortable: true,
               field: "matricula",
            },
            {
               name: "marca",
               align: "center",
               label: "Marca",
               field: "marca",
               sortable: true,
            },
            {
               name: "modelo",
               label: "Modelo",
               field: "modelo",
               sortable: true,
               align: "center",
            },
            { name: "ano", label: "Año", field: "ano", align: "center" },
            { name: "km", label: "KM", field: "km", align: "center" },
            {
               name: "descripcion",
               label: "Descripcion",
               field: "descripcion",
               align: "center",
            },
            {
               name: "etiqueta",
               label: "Etiqueta",
               field: "etiqueta",
               sortable: true,
               align: "center",
            },
            {
               name: "tipo",
               label: "Tipo",
               field: "tipo",
               sortable: true,
               align: "center",
            },
            {
               name: "promocion",
               label: "Promocion",
               field: "promocion",
               sortable: true,
               align: "center",
            },
            {
               name: "combustible",
               label: "Combustible",
               field: "combustible",
               sortable: true,
               align: "center",
            },
            {
               name: "precio",
               label: "Precio",
               field: "precio",
               sortable: true,
               align: "center",
            },
            {
               name: "colorBanner",
               label: "ColorBanner",
               field: "colorBanner",
               sortable: true,
               align: "center",
            },
         ],
         rowsCoches: [],
         rowsPersonas: [],
         columnsPersonas: [
            {
               name: "username",

               label: "Nombre",
               align: "center",
               field: "username",
               sortable: true,
            },
            {
               name: "email",
               align: "center",
               label: "Email",
               field: "email",
               sortable: true,
            },
            {
               name: "mensaje",
               label: "Mensaje",
               field: "mensaje",
               sortable: true,
            },
            { name: "telefono", label: "Telefono", field: "telefono" },
            { name: "ano", label: "Año Coche", field: "ano", sortable: true },
            {
               name: "combustible",
               label: "Tipo Combustible",
               field: "combustible",
               sortable: true,
            },
            { name: "km", label: "Km Hasta", field: "km", sortable: true },
            {
               name: "precio",
               label: "Precio Hasta",
               field: "precio",
               sortable: true,
            },
            {
               name: "tipo",
               label: "Tipo de Coche",
               field: "tipo",
               sortable: true,
            },
         ],
         datosCoches: {},
         imagenesArray: [],
         base64Image: null,
         imagenParaCambiar: "",
         inputImagen: null,
         inputPdf: null,
         mediaTable: {},
         //  modelEtiqueta: "",
         //  modelTipo: "",
         //  modelPromotion: "",
         optionsPromotion: tipoPromocion,
         optionsEtiqueta: etiquetaCoche,
         optionsTipo: tipoCoche,
         optionsAno: cocheAno,
         optionsCombustible: tipoCombustible,
         coloresBanners: coloresBanners,
         newCar: false,
         modelInImgNew: "",
         imagenConvertidaBase64: "",
         existPdf: "",
         fechaActual: new Date().getFullYear(),
         filterCoches: "",
         filterPersonas: "",
         waitDialog: false,
      };
   },
   watch: {
      inputPdf: function (item) {
         convertFileToBase64(item).then((result) => {
            if (result) {
               this.existPdf = result;
            } else {
               console.log("El pdf no se ha podido añadir");
            }
         });
      },
      inputImagen: function (newVal) {
         if (newVal) {
            convertFileToBase64(newVal).then((result) => {
               if (result) {
                  this.imagenParaCambiar.imagen = result;
                  this.anadirImagenDialog = false;
               } else {
                  console.log("La imagen no se ha podido  modificar");
               }
            });
         }
         this.inputImagen = null;
      },
      // modelEtiqueta: function (item) {
      //    if (item) {
      //       this.datosCoches.etiqueta = item;
      //    }
      // },

      // modelPromotion: function (item) {
      //    if (item) {
      //       this.datosCoches.promocion = item;
      //    }
      // },
      // modelTipo: function (item) {
      //    if (item) {
      //       this.datosCoches.tipo = item;
      //    }
      // },
      modelInImgNew: function (item) {
         if (item) {
            convertFileToBase64(item)
               .then((result) => {
                  // Handle the base64 result here
                  this.imagenConvertidaBase64 = result;
                  console.log(this.imagenConvertidaBase64);
                  this.addMetaImgNew(this.imagenConvertidaBase64);
               })
               .catch((error) => {
                  // Handle any errors here
                  console.error(error);
                  console.log("No se ha podido convertir la imagen");
               });
         }
      },
   },
   async mounted() {
      // cuando vienes de otras rutas
      this.sessionData = store.state.sessionData;
      this.usuarioLogineado = store.state.name;
      this.userIsAdmin = store.state.isAdmin;
      this.toggleDark = store.state.toggleDarkMode
         ? store.state.toggleDarkMode
         : this.toggleDark;
      this.waitDialog = true;
      this.rowsCoches = await getAllData();
      this.rowsPersonas = await getAllusers();
      // let etiqueta = await getEtiqueta();
      //  this.optionsEtiqueta = etiqueta
      // let promotion = await getPromotions();
      // this.optionsPromotion = this.extrareKeysObjeto(promotion[0]);
      // let tipo = await getTipoCoche();
      // this.optionsTipo = this.extrareKeysObjeto(tipo[0]);
      this.waitDialog = false;
   },
   methods: {
      async reloadData() {
         this.waitDialog = true;
         this.rowsCoches = await getAllData();
         this.rowsPersonas = await getAllusers();
         this.waitDialog = false;
      },
      async delCar() {
         let respuesta = await deleteCar(this.datosCoches.id);
         if (respuesta) {
            console.log(respuesta);
         }
         this.reloadData();
      },
      deletePdf() {
         this.existPdf = "";
      },
      addNewCar() {
         this.dialogCoches = true;
         this.newCar = true;
         this.datosCoches = {};
         this.imagenesArray = [];
         this.existPdf = "";
         this.inputPdf = null;
      },
      fixArrNum(array) {
         let x = 1;
         array.forEach((item) => {
            let numArray = item.imagenNum.split(""); // Convert the string to an array
            numArray[6] = x.toString(); // Update the character at index 6 with the value of x
            item.imagenNum = numArray.join(""); // Join the array back into a string
            x++;
         });
      },
      addMetaImgNew(item) {
         // nos llevamos el ultimo componente del array y comprobamos a ver que numero tiene , i le añadimos uno de mas si es mas pequeño que 8
         // y en ese caso reconstrumos el componente con el id , imagen y el imagenNum
         let num;
         if (this.imagenesArray.length) {
            this.fixArrNum(this.imagenesArray);
            let lastFromArray =
               this.imagenesArray[this.imagenesArray.length - 1];
            num = lastFromArray.imagenNum.split("")[6] * 1;
            if (num <= 8) {
               num++;
               let newObject = {
                  id: lastFromArray.id,
                  imagen: item,
                  imagenNum: "imagen" + num,
               };
               this.imagenesArray.push(newObject);
            } else {
               console.log("maximo 8 imagenes");
            }
         } else {
            num = 1;
            let newObject = {
               id: this.datosCoches.id,
               imagen: item,
               imagenNum: "imagen" + num,
            };
            this.imagenesArray.push(newObject);
         }
         this.modelInImgNew = "";
      },
      // extrareKeysObjeto(item) {
      //
      //    return Object.values(item);
      // },
      async aceptarCambios() {
         const colorEs_En = colorsEs_En(this.datosCoches.colorBanner);
         this.datosCoches.colorBanner = colorEs_En;

         this.mediaTable = {};
         this.mediaTable = this.imagenesArray.reduce((result, item) => {
            return Object.assign(result, {
               id: item.id,
               [item.imagenNum]: item.imagen,
            });
         }, this.mediaTable);
         this.mediaTable.pdf = this.existPdf;
         this.mediaTable.id = this.datosCoches.id;

         if (!this.newCar) {
            this.waitDialog = true;
            let res = await updateTables(this.datosCoches, this.mediaTable);
            if (res) {
               console.log("Datos subidos a la base");
            } else {
               ("Error al subir datos en la base");
            }
            this.newCar = false;

            //  console.log(this.mediaTable);
         } else {
            this.waitDialog = true;
            await insertCocheNuevo(this.datosCoches, this.mediaTable);
            this.newCar = false;
         }
         await this.reloadData();
         this.datosCoches = {};
         //  this.modelEtiqueta = "";
         //  this.modelTipo = "";
         //  this.modelPromotion = "";
         this.inputImagen = null;
         this.waitDialog = false;
      },
      getBase64Image(image) {
         if (image) return `data:image/jpeg;base64,${image}`;
      },
      cancelInputCarDialog() {
         this.newCar = false;
         this.dialogCoches = false;
      },
      handleRowClick(evt, row) {
         this.dialogCoches = true;
         // Handle row click event here
         console.log("Row clicked:", row);
         this.datosCoches.matricula = row.matricula;
         this.datosCoches.marca = row.marca;
         this.datosCoches.modelo = row.modelo;
         this.datosCoches.ano = row.ano;
         this.datosCoches.km = row.km;
         this.datosCoches.descripcion = row.descripcion;
         this.datosCoches.etiqueta = row.etiqueta;
         this.datosCoches.tipo = row.tipo;
         this.datosCoches.promocion = row.promocion;
         this.datosCoches.combustible = row.combustible;
         this.datosCoches.precio = row.precio;
         const color = colorsEn_Es(row.colorBanner);
         this.datosCoches.colorBanner = color;
         this.datosCoches.id = row.id;
         this.existPdf = row.pdf;
         this.extrerImagenes(row);
         // You can perform actions such as opening a dialog, navigating to a detail page, etc.
      },
      modImg(item) {
         this.imagenParaCambiar = item;
         this.anadirImagenDialog = true;
      },
      delImg(item) {
         let indexOf = this.imagenesArray.findIndex((obj) => {
            return obj.imagenNum == item.imagenNum;
         });
         console.log(indexOf);
         this.imagenesArray.splice(indexOf, 1);
         if (this.imagenesArray.length == 0) {
            item.imagen = "";
            this.imagenesArray.push(item);
         }
         // this.fixArrNum(this.imagenesArray);
      },
      extrerImagenes(row) {
         this.imagenesArray = [];
         for (let img = 1; img <= 8; img++) {
            let imgObj = {};
            const propertyName = "imagen" + img;
            if (row[propertyName]) {
               imgObj.imagen = row[propertyName];
               imgObj.imagenNum = propertyName;
               imgObj.id = row.id;
               this.imagenesArray.push(imgObj);
            }
         }
      },
      updateUsuarioLogineado(bool) {
         if (bool) {
            this.usuarioLogineado = store.state.name;
            this.sessionData = store.state.sessionData;
         }
      },
      handleDialogClose() {
         this.showLoginUser = false; // Set showLoginUser to false when the dialog is closed
         this.showInputUser = false;
      },
      nuevoUsuario() {
         this.showInputUser = true;
         //this.showLoginUser = false;
      },
      loginearUsuario() {
         this.showLoginUser = true;
         //this.showInputUser = false;
      },
      toggleDarkMode() {
         const $q = this.$q;
         $q.dark.toggle();
         store.state.toggleDarkMode = this.toggleDark;
      },
      async logOut() {
         const result = await logout();
         if (result) {
            store.dispatch("logout");
            this.usuarioLogineado = "";
            this.sessionData = "";
            Notify.create({
               type: "positive",
               message: "Adios.",
            });
            this.$router.push({ name: "principal-coches" }); ///esto sii
            // window.location.href = "/home"; //esto NOOOOOOO
         } else {
            Notify.create({
               type: "negative",
               message: "Error al des-loginear al usuario.",
            });
            store.dispatch("logout");
         }
      },
   },

   components: {
      InputUser,
      loginUser,
      Footer_Layout,
   },

   setup() {
      const $q = useQuasar();
      // $q.dark.set(true); // or false or "auto"
      // $q.dark.toggle(); // toggle
      return {};
   },
});
</script>
src/composable/translateColorEn_Es ../stores ../../../store
