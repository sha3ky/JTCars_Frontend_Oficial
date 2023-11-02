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
                     <router-link to="/">
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
                     <router-link to="/extra">
                        <q-item clickable>
                           <q-item-section>Extra</q-item-section>
                        </q-item>
                     </router-link>
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
      <q-footer elevated class="bg-blue-grey-9">
         <q-toolbar>
            <q-toolbar-title style="text-align: center"
               >Made with
               <span
                  ><q-img src="/lovePng.png" width="50px" height="50px"></q-img
               ></span>
               by Sha3ky's TEAM</q-toolbar-title
            >
         </q-toolbar>
      </q-footer>
      <!-- v-if="sessionData" -->
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
               </q-tabs>

               <q-separator />

               <q-tab-panels v-model="tab" animated>
                  <q-tab-panel name="coches">
                     <div class="text-h6">Coches</div>
                     <div>
                        <q-btn color="teal" @click="anadirCocheNuevo">
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
                        >
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
                     />
                  </q-tab-panel>
               </q-tab-panels>
            </q-card>
         </div>

         <q-dialog v-model="dialogCoches" persistent>
            <q-card style="max-width: 538px">
               <q-card-section style="padding: 0">
                  <div class="text-h6">Cambiar configuracion coche</div>
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
                        <div>
                           <q-input
                              filled
                              v-model="datosCoches.ano"
                              label="Año"
                              dense
                           />
                        </div>
                        <div>
                           <q-input
                              filled
                              v-model="datosCoches.km"
                              label="KM"
                              dense
                           />
                        </div>
                        <div>
                           <q-input
                              filled
                              v-model="datosCoches.descripcion"
                              label="Descripcion"
                              dense
                           />
                        </div>
                     </div>

                     <div style="display: flex; padding: 5px">
                        <div>
                           <div>
                              <q-select
                                 filled
                                 v-model="modelEtiqueta"
                                 :options="optionsEtiqueta"
                                 label="Selecionar Etiqueta"
                                 dense
                              />
                           </div>
                           <div>
                              <q-input
                                 filled
                                 v-model="datosCoches.etiqueta"
                                 label="Etiqueta"
                                 disable
                                 readonly
                                 dense
                              />
                           </div>
                        </div>
                        <!-- tipoCoches -->
                        <div>
                           <div>
                              <q-select
                                 filled
                                 v-model="modelTipo"
                                 :options="optionsTipo"
                                 label="Selecionar Tipo"
                                 dense
                              />
                           </div>
                           <div>
                              <q-input
                                 filled
                                 v-model="datosCoches.tipo"
                                 label="Tipo"
                                 disable
                                 readonly
                                 dense
                              />
                           </div>
                        </div>
                        <!-- promotions -->
                        <div>
                           <div style="">
                              <q-select
                                 filled
                                 v-model="modelPromotion"
                                 :options="optionsPromotion"
                                 label="Selecionar Promocion"
                                 dense
                              />
                           </div>
                           <div style="">
                              <q-input
                                 filled
                                 v-model="datosCoches.promocion"
                                 label="Promocion"
                                 disable
                                 readonly
                                 dense
                              />
                           </div>
                        </div>
                     </div>
                     <div style="display: flex; padding: 5px">
                        <div>
                           <q-input
                              dense
                              filled
                              v-model="datosCoches.combustible"
                              label="Combustible"
                           />
                        </div>
                        <div>
                           <q-input
                              dense
                              filled
                              v-model="datosCoches.precio"
                              label="Precio"
                           />
                        </div>
                        <div>
                           <q-input
                              filled
                              v-model="datosCoches.colorBanner"
                              label="ColorBanner"
                              dense
                           />
                        </div>
                     </div>

                     <div>
                        <div style="display: flex; justify-content: center">
                           <div style="">
                              <q-file
                                 filled
                                 v-model="subirPdf"
                                 label="PDF"
                                 dense
                              />
                           </div>
                           <div style="">
                              <q-file
                                 filled
                                 v-model="anadirImagenNueva"
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
                                 style="display: flex; justify-content: center;max-width: 130px;
}"
                              >
                                 <q-img
                                    :src="getBase64Image(image.imagen)"
                                    class="responsive-image"
                                    style="max-width: 180px; height: 60px"
                                 />

                                 <q-separator />

                                 <q-card-actions align="center">
                                    <q-btn flat @click="modificarImagen(image)"
                                       >Modificar</q-btn
                                    >
                                    <q-btn flat @click="eliminarImagen(image)"
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
                  <q-btn flat label="Cancel" v-close-popup />
                  <q-btn
                     flat
                     label="Aceptar"
                     @click="aceptarCambios"
                     v-close-popup
                  />
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
                  <q-file filled v-model="imagenSubida" label="Filled" />
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
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";
import store from "../../src/store";
import InputUser from "components/InputUser.vue"; // Replace with the actual path
import loginUser from "src/components/loginUser.vue";
import logout from "src/composable/logOut";
import { Notify } from "quasar";
import getAllData from "src/composable/loadAllData";
import getAllusers from "src/composable/getUsersContact";
import getEtiqueta from "src/composable/getEtiqueta";
import getPromotions from "src/composable/getPromotions";
import getTipoCoche from "src/composable/getTipoCoches";
import updateTables from "src/composable/updatetableCocheMedia";

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
         ],
         datosCoches: {},
         imagenesArray: [],
         base64Image: null,
         imagenParaCambiar: "",
         imagenSubida: null,
         subirPdf: null,
         mediaTable: {},
         modelEtiqueta: "",
         modelTipo: "",
         modelPromotion: "",
         optionsPromotion: [],
         optionsEtiqueta: [],
         optionsTipo: [],
         cocheNuevoAnadir: false,
         anadirImagenNueva: "",
         imagenConvertidaBase64: "",
      };
   },
   watch: {
      subirPdf: function (item) {
         this.convertPdfTobase64(item);
      },
      imagenSubida: function (newVal) {
         this.convertImageToBase64(newVal).then((result) => {
            if (result) {
               this.imagenParaCambiar.imagen = result;
               this.anadirImagenDialog = false;
            } else {
               console.log("la imagen no se ha podido modificar");
            }
         });
      },
      modelEtiqueta: function (item) {
         if (item) {
            this.datosCoches.etiqueta = item;
         }
      },
      modelPromotion: function (item) {
         if (item) {
            this.datosCoches.promocion = item;
         }
      },
      modelTipo: function (item) {
         if (item) {
            this.datosCoches.tipo = item;
         }
      },
      anadirImagenNueva: function (item) {
         debugger;
         if (item) {
            this.convertImageToBase64(item)
               .then((result) => {
                  // Handle the base64 result here
                  this.imagenConvertidaBase64 = result;
                  console.log(this.imagenConvertidaBase64);
                  this.añadirDatosRowImagenNueva(this.imagenConvertidaBase64);
               })
               .catch((error) => {
                  // Handle any errors here
                  console.error(error);
               });
         }
      },
   },
   async mounted() {
      // cuando vienes de otras rutas
      this.sessionData = store.state.sessionData;
      this.usuarioLogineado = store.state.name;
      this.toggleDark = store.state.toggleDarkMode
         ? store.state.toggleDarkMode
         : this.toggleDark;
      this.rowsCoches = await getAllData();
      this.rowsPersonas = await getAllusers();
      debugger;
      let etiqueta = await getEtiqueta();
      this.optionsEtiqueta = this.extrareKeysObjeto(etiqueta[0]);
      let promotion = await getPromotions();
      this.optionsPromotion = this.extrareKeysObjeto(promotion[0]);
      let tipo = await getTipoCoche();
      this.optionsTipo = this.extrareKeysObjeto(tipo[0]);
   },
   methods: {
      anadirCocheNuevo() {
         debugger;
         this.dialogCoches = true;
         this.cocheNuevoAnadir = true;
         this.datosCoches = {};
         this.imagenesArray = [];
      },
      arreglarArrayNumeracion(array) {
         debugger;
         let x = 1;
         array.forEach((item) => {
            let numArray = item.imagenNum.split(""); // Convert the string to an array
            numArray[6] = x.toString(); // Update the character at index 6 with the value of x
            item.imagenNum = numArray.join(""); // Join the array back into a string
            x++;
         });
      },

      añadirDatosRowImagenNueva(item) {
         debugger;
         // nos llevamos el ultimo componente del array y comprobamos a ver que numero tiene , i le añadimos uno de mas si es mas pequeño que 8
         // y en ese caso reconstrumos el componente con el id , imagen y el imagenNum
         let num;
         if (this.imagenesArray.length) {
            this.arreglarArrayNumeracion(this.imagenesArray);
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
               id:this.datosCoches.id,
               imagen: item,
               imagenNum: "imagen" + num,
            };
            this.imagenesArray.push(newObject);
         }

         this.anadirImagenNueva = "";
      },
      extrareKeysObjeto(item) {
         debugger;
         return Object.values(item);
      },
      async aceptarCambios() {
         debugger;
         this.datosCoches;
         this.mediaTable = this.imagenesArray.reduce((result, item) => {
            return Object.assign(result, {
               id: item.id,
               [item.imagenNum]: item.imagen,
            });
         }, this.mediaTable);
         let res = await updateTables(this.datosCoches, this.mediaTable);
         if (res) {
            this.rowsCoches = await getAllData();
            this.rowsPersonas = await getAllusers();
            this.datosCoches = {};
         } else {
            ("nooooo");
         }
         //  console.log(this.mediaTable);
      },
      convertImageToBase64(file) {
         return new Promise((resolve, reject) => {
            if (file) {
               const reader = new FileReader();

               reader.onload = (e) => {
                  const base64String = e.target.result;
                  // Remove the prefix 'data:image/jpeg;base64,' or similar
                  const withoutPrefix = base64String.substring(
                     base64String.indexOf(",") + 1
                  );

                  resolve(withoutPrefix); // Resolve the promise with the base64 data
               };

               reader.onerror = (error) => {
                  reject(error); // Reject the promise in case of an error
               };

               reader.readAsDataURL(file);
            } else {
               reject("No file provided");
            }
         });
      },
      convertPdfTobase64(pdf) {
         let file = pdf;
         const reader = new FileReader();
         reader.onload = (event) => {
            // The base64 data will be available in event.target.result
            const base64Data = event.target.result;
            const withoutPrefixPdf = base64Data.substring(
               base64Data.indexOf(",") + 1
            );
            this.mediaTable.pdf = withoutPrefixPdf;
            // Now you can use the base64Data as needed, e.g., send it to the server or display it.
            console.log(base64Data);
         };
         reader.readAsDataURL(file);
      },
      getBase64Image(image) {
         return `data:image/jpeg;base64,${image}`;
      },
      handleRowClick(evt, row) {
         debugger;
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
         this.datosCoches.colorBanner = row.colorBanner;
         this.datosCoches.id = row.id;
         this.extrerImagenes(row);
         // You can perform actions such as opening a dialog, navigating to a detail page, etc.
      },
      modificarImagen(item) {
         this.imagenParaCambiar = item;
         this.anadirImagenDialog = true;
      },

      eliminarImagen(item) {
         debugger;
         let indexOf = this.imagenesArray.findIndex((obj) => {
            return obj.imagenNum == item.imagenNum;
         });
         console.log(indexOf);
         this.imagenesArray.splice(indexOf, 1);
         // this.arreglarArrayNumeracion(this.imagenesArray);
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
         debugger;
         if (bool) {
            this.usuarioLogineado = store.state.name;
            this.sessionData = store.state.sessionData;
         }
      },
      handleDialogClose() {
         debugger;
         this.showLoginUser = false; // Set showLoginUser to false when the dialog is closed
         this.showInputUser = false;
      },
      nuevoUsuario() {
         debugger;
         this.showInputUser = true;
         //this.showLoginUser = false;
      },
      loginearUsuario() {
         debugger;
         this.showLoginUser = true;
         //this.showInputUser = false;
      },
      toggleDarkMode() {
         const $q = this.$q;
         $q.dark.toggle();
         store.state.toggleDarkMode = this.toggleDark;
      },
      async logOut() {
         debugger;
         const result = await logout();
         if (result) {
            store.dispatch("logout");
            this.usuarioLogineado = "";
            this.sessionData = "";
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
   },

   components: {
      InputUser,
      loginUser,
   },

   setup() {
      const $q = useQuasar();
      // $q.dark.set(true); // or false or "auto"
      // $q.dark.toggle(); // toggle

      return {};
   },
});
</script>
