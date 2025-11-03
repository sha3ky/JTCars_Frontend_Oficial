<template>
   <q-layout view="lHh Lpr lFf" v-if="isAuthenticated() && userIsAdmin">
      <HeaderLayout
         :is-authenticated="isAuthenticated()"
         :user-is-admin="userIsAdmin"
         :usuario-logineado="usuarioLogineado"
         @login="loginearUsuario"
         @logout="logOut"
      />

      <Footer_Layout />

      <!--  -->
      <q-page-container>
         <div
            style="
               width: 100vw;
               height: 100vh;
               display: flex; /* 1. Activa Flexbox */
               flex-direction: column; /* 2. Pone los hijos en columna (uno debajo del otro) */
               align-items: center; /* 3. Centra horizontalmente todos los hijos */
               background-image: url('/gemConcesWaterPx.webp'); /* La ruta desde la carpeta 'public' */
               background-size: cover; /* Asegura que la imagen cubra toda el área */
               background-position: center center; /* Centra la imagen para que se vea bien en diferentes tamaños */
            "
         >
            <div
               style="
                  background-color: rgb(244, 67, 54, 0.5);
                  width: 50vh;
                  text-align: center; /* Centrado horizontal del texto (funciona para líneas simples) */
                  margin-top: 3%;
                  height: 6%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  border-radius: 5px;
               "
            >
               <h4>Mi Garaje</h4>
            </div>

            <q-card style="margin-top: 10%; width: 100%">
               <q-tabs
                  v-model="tab"
                  dense
                  class="text-grey"
                  active-color="primary"
                  indicator-color="primary"
                  align="justify"
                  narrow-indicator
               >
                  <q-tab name="coches" label="Garaje" />
                  <q-tab name="personas" label="Clientes" />
                  <!-- <q-tab name="datos" label="Datos personales" /> -->
               </q-tabs>

               <q-separator />

               <q-tab-panels v-model="tab" animated>
                  <q-tab-panel name="coches">
                     <div>
                        <q-btn color="teal" @click="addNewCar">
                           <q-icon left size="1em" name="add" />
                           <div>Añadir Coche</div>
                        </q-btn>
                     </div>
                     <div class="q-pa-md">
                        <q-table
                           title="Garaje"
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
                                 placeholder="Buscar coche"
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
                                 type="text"
                              />
                           </div>
                           <div>
                              <q-input
                                 filled
                                 v-model="datosCoches.marca"
                                 label="Marca"
                                 dense
                                 type="text"
                              />
                           </div>
                           <div>
                              <q-input
                                 filled
                                 v-model="datosCoches.modelo"
                                 label="Modelo"
                                 dense
                                 type="text"
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
                                 label="KM sin puntos"
                                 dense
                                 @keypress="soloNumerosYPuntos"
                              />
                           </div>
                           <div style="width: 33vw">
                              <q-input
                                 filled
                                 v-model="datosCoches.descripcion"
                                 label="Descripcion"
                                 dense
                                 type="text"
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
                                 label="Precio sin puntos"
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
         </div>
      </q-page-container>
      <InputUser
         :inputUserDialog="showInputUser"
         @close-dialog-newuser="handleDialogClose"
      />
      <loginUser
         :loginUserDialog="showLoginUser"
         @close-dialog-loginuser="handleDialogClose"
      />
      <!-- @update-usuario-logineado="updateUsuarioLogineado" -->
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
         <q-card-section class="q-pt-none" style="display: contents">
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
import store from "../../src/store";
import InputUser from "components/InputUser.vue"; // Replace with the actual path
import loginUser from "src/components/loginUser.vue";
import { Notify } from "quasar";
import getAllData from "src/composable/loadAllData";
import getAllusers from "src/composable/getUsersContact";
import deleteCar from "src/composable/deleteCar";
import HeaderLayout from "components/HeaderComponent.vue";
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
import { authMixin } from "../mixins/authMixin";
export default defineComponent({
   name: "AdminPage",
   mixins: [authMixin],
   data() {
      return {
         anadirImagenDialog: false,
         dialogCoches: false,
         showInputUser: false, // Initialize showInputUser to control InputUser component
         showLoginUser: false,
         userId: null,
         modelSelectedMenu: ref("coches"),
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

            {
               name: "createdAt",
               label: "Fecha de Contacto",
               field: "created_at", // <--- Debe coincidir EXACTAMENTE con el campo del modelo
               sortable: true,
               // Opcional: Formatear la fecha para que se vea mejor
               format: (val) => {
                  // 1. Crea el objeto Date a partir de la cadena ISO (UTC)
                  const date = new Date(val);

                  // 2. Extrae y formatea los componentes de la fecha y hora usando métodos UTC.
                  // getUTC...() asegura que usamos la hora 09:53, no la convertida 10:53

                  // Obtener componentes de fecha
                  const day = String(date.getUTCDate()).padStart(2, "0");
                  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Meses son 0-indexados
                  const year = date.getUTCFullYear();

                  // Obtener componentes de hora
                  const hours = String(date.getUTCHours()).padStart(2, "0");
                  const minutes = String(date.getUTCMinutes()).padStart(2, "0");

                  // 3. Devolver la cadena en formato DD/MM/AAAA HH:MM
                  return `${day}/${month}/${year} ${hours}:${minutes}`;
               },
               align: "left", // Alineación
            },
         ],
         datosCoches: {},
         imagenesArray: [],
         base64Image: null,
         imagenParaCambiar: "",
         inputImagen: null,
         inputPdf: null,
         mediaTable: {},
         optionsPromotion: tipoPromocion,
         optionsEtiqueta: etiquetaCoche,
         optionsTipo: tipoCoche,
         optionsAno: cocheAno,
         optionsCombustible: tipoCombustible,
         coloresBanners: coloresBanners,
         newCar: false,
         modelInImgNew: null,
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
      this.waitDialog = true;
      this.rowsCoches = await getAllData();
      this.rowsPersonas = await getAllusers();
      this.waitDialog = false;
   },
   methods: {
      soloNumerosYPuntos(event) {
         const char = String.fromCharCode(event.which || event.keyCode);

         // Permitir solo: números (0-9) y punto (.)
         if (!/[0-9.]/.test(char)) {
            event.preventDefault();
            return false;
         }

         return true;
      },
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
      Footer_Layout,
      HeaderLayout,
   },
});
</script>
