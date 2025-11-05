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
                  <q-tab name="personas" label="Interesados" />
                  <!-- <q-tab name="datos" label="Datos personales" /> -->
               </q-tabs>

               <q-separator />

               <q-tab-panels v-model="tab" animated>
                  <q-tab-panel name="coches">
                     <div>
                        <q-btn color="teal" @click="resetDataCar">
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
                     <div class="text-h6">Interesados</div>
                     <q-table
                        title="Personas"
                        :rows="rowsPersonas"
                        :columns="columnsPersonas"
                        row-key="email"
                        dense
                        :rows-per-page="10"
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
                                 maxlength="10"
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
                           <div style="width: 50vw">
                              <q-select
                                 filled
                                 v-model="datosCoches.ano"
                                 :options="optionsAno"
                                 label="Selecionar Año"
                                 dense
                                 style="max-width: 100%"
                              />
                           </div>
                           <div style="width: 50vw">
                              <q-input
                                 filled
                                 v-model="datosCoches.km"
                                 type="number"
                                 label="KM "
                                 min="0"
                                 max="1000000"
                                 step="1"
                                 dense
                                 @keypress="soloNumerosYPuntos"
                                 input-class="no-arrows"
                              />
                           </div>
                        </div>
                        <div style="">
                           <q-input
                              filled
                              v-model="datosCoches.descripcion"
                              label="Descripción"
                              dense
                              type="textarea"
                              maxlength="150"
                              counter
                              :rules="reglasDescripcion"
                              autogrow
                           >
                              <template v-slot:counter>
                                 <span :class="contadorClass">
                                    {{
                                       datosCoches.descripcion
                                          ? datosCoches.descripcion.length
                                          : 0
                                    }}/150
                                 </span>
                              </template>
                           </q-input>
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
                                 v-model.number="datosCoches.precio"
                                 type="number"
                                 label="Precio"
                                 @keypress="soloNumerosYPuntos"
                                 input-class="no-arrows"
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
                                    v-model="nuevaImagen"
                                    label="Añadir imagen"
                                    dense
                                    accept="image/*"
                                    max-files="1"
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
                                       :src="image.ruta"
                                       class="responsive-image"
                                       style="max-width: 180px; height: 60px"
                                    />
                                    <q-separator />
                                    <q-card-actions align="center">
                                       <q-btn
                                          flat
                                          @click="modImg(image)"
                                          icon="edit"
                                          class="q-mr-sm"
                                       />
                                       <q-btn
                                          flat
                                          @click="deleteImage(image)"
                                          icon="delete"
                                          color="negative"
                                       />
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
                           text-color="white"
                           label="Eliminar"
                           @click="confirmDeleteCar"
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
      <!-- Dialog de confirmación elimnar imagen-->
      <!--  <q-dialog v-model="confirmDialog">
         <q-card>
            <q-card-section>
               <div class="text-h6">Confirmar eliminación</div>
            </q-card-section>

            <q-card-section>
               ¿Estás seguro de que quieres eliminar esta imagen?
            </q-card-section>

            <q-card-actions align="right">
               <q-btn flat label="Cancelar" color="primary" v-close-popup />
               <q-btn
                  flat
                  label="Eliminar"
                  color="negative"
                  @click="executeDelete"
               />
            </q-card-actions>
         </q-card>
      </q-dialog> -->
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
.no-arrows::-webkit-outer-spin-button,
.no-arrows::-webkit-inner-spin-button {
   -webkit-appearance: none;
   margin: 0;
}

.no-arrows {
   -moz-appearance: textfield;
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
import { defineComponent, ref, computed } from "vue";
import store from "../../src/store";
import InputUser from "components/InputUser.vue";
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
import axios from "axios";
import apiLink from "../composable/apiLink";

export default defineComponent({
   name: "AdminPage",
   mixins: [authMixin],
   data() {
      return {
         link: apiLink,
         anadirImagenDialog: false,
         dialogCoches: false,
         showInputUser: false,
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
               field: "created_at",
               sortable: true,
               format: (val) => {
                  const date = new Date(val);
                  const day = String(date.getUTCDate()).padStart(2, "0");
                  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
                  const year = date.getUTCFullYear();
                  const hours = String(date.getUTCHours()).padStart(2, "0");
                  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
                  return `${day}/${month}/${year} ${hours}:${minutes}`;
               },
               align: "left",
            },
         ],
         datosCoches: {},
         imagenesArray: [],
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
         nuevaImagen: null,
         existPdf: null,
         fechaActual: new Date().getFullYear(),
         filterCoches: "",
         filterPersonas: "",
         waitDialog: false,
         imagenesParaEliminar: [],
      };
   },
   computed: {
      reglasDescripcion() {
         return [
            (val) => (val && val.length > 0) || "La descripción es obligatoria",
            (val) => val.length <= 150 || "Máximo 150 caracteres",
            (val) => val.length >= 10 || "Mínimo 10 caracteres",
         ];
      },
      contadorClass() {
         const length = this.datosCoches.descripcion
            ? this.datosCoches.descripcion.length
            : 0;
         if (length > 140) return "text-negative";
         if (length > 120) return "text-warning";
         return "text-grey";
      },
   },
   watch: {
      // ✅ PDF sigue en base64
      inputPdf: function (item) {
         convertFileToBase64(item).then((result) => {
            if (result) {
               this.existPdf = result;
            } else {
               console.log("El pdf no se ha podido añadir");
            }
         });
      },
      // ✅ NUEVAS imágenes - usar archivo directamente
      nuevaImagen: function (archivo) {
         debugger;
         if (archivo) {
            this.procesarNuevaImagen(archivo);
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
      // ✅ Procesar nueva imagen sin base64
      procesarNuevaImagen(archivo) {
         debugger;
         if (!archivo.type.startsWith("image/")) {
            this.$q.notify({
               type: "negative",
               message: "Por favor, selecciona un archivo de imagen válido",
               timeout: 3000,
            });
            this.nuevaImagen = null;
            return;
         }

         if (archivo.size > 5 * 1024 * 1024) {
            this.$q.notify({
               type: "negative",
               message: "La imagen es demasiado grande (máximo 5MB)",
               timeout: 3000,
            });
            this.nuevaImagen = null;
            return;
         }

         const urlTemporal = URL.createObjectURL(archivo);
         /*  this.renumerarImagenes(); */
         this.agregarImagenAlArray(urlTemporal, archivo);
         this.nuevaImagen = null;
      },

      // ✅ Agregar imagen al array
      agregarImagenAlArray(urlImagen, archivo) {
         if (this.imagenesArray.length >= 8) {
            this.$q.notify({
               type: "warning",
               message: "Máximo 8 imágenes permitidas",
               timeout: 3000,
            });
            URL.revokeObjectURL(urlImagen);
            return;
         }
         let numArray = [1, 2, 3, 4, 5, 6, 7, 8];
         this.imagenesArray.forEach((item, index) => {
            /*  const nombreEsperado = `imagen${index + 1}`; */
            const numerosEncontrados = parseInt(
               item.imagenNum.split("").at(-1)
            );
            numArray.forEach((item) => {
               debugger;
               if (item == numerosEncontrados) {
                  const indice = numArray.indexOf(valorAEliminar);
                  if (indice > -1) {
                     // Verifica que el valor fue encontrado
                     numArray.splice(indice, 1);
                  }
               }
               console.log("numarray", numArray);
            });
            /*  if (item.imagenNum !== nombreEsperado) {
               item.imagenNum = `imagen${index + 1}`;
            } */
         });

         /* const nuevoNumero = this.imagenesArray.length + 1;
         const nuevoId = `imagen_${nuevoNumero}_${Date.now()}`;
 */
         const nuevaImagen = {
            id: nuevoId,
            imagen: urlImagen, // URL temporal para previsualización
            archivo: archivo, // Archivo original para subida
            imagenNum: `imagen${nuevoNumero}`,
            nombreArchivo: archivo.name,
            esNueva: true,
            ruta: urlImagen, // ← AGREGAR ESTA LÍNEA
         };

         this.imagenesArray.push(nuevaImagen);

         this.$q.notify({
            type: "positive",
            message: `Imagen ${nuevoNumero} agregada correctamente`,
            timeout: 2000,
         });
      },

      // ✅ Eliminar imagen liberando memoria
      eliminarImagen(imagen) {
         debugger;
         const index = this.imagenesArray.findIndex(
            (img) => img.imagenNum === imagen.imagenNum
         );
         if (index !== -1) {
            this.imagenesParaEliminar.push(
               this.imagenesArray.splice(index, 1)[0]
            );
         }
      },

      // ✅ Reenumerar imágenes después de eliminar
      /*  renumerarImagenes() {
         debugger;

         this.imagenesArray.forEach((item, index) => {
            const nombreEsperado = `imagen${index + 1}`;
            if (item.imagenNum !== nombreEsperado) {
               item.imagenNum = `imagen${index + 1}`;
            }
         });
      }, */

      limpiarURLsTemporales() {
         debugger;
         this.imagenesArray.forEach((imagen) => {
            if (imagen.imagen && imagen.imagen.startsWith("blob:")) {
               URL.revokeObjectURL(imagen.imagen); // ✅ Libera memoria
            }
            // OPCIONAL: También limpiar ruta si es blob
            if (imagen.ruta && imagen.ruta.startsWith("blob:")) {
               URL.revokeObjectURL(imagen.ruta); // ✅ Libera memoria
            }
         });
      },
      // ✅ Confirmación para eliminar coche
      confirmDeleteCar() {
         this.$q
            .dialog({
               title: "🚗 Eliminar coche",
               message:
                  "¿Estás seguro de que quieres eliminar este coche? Esta acción no se puede deshacer.",
               ok: { push: true, color: "negative", label: "Eliminar" },
               cancel: { push: true, color: "primary", label: "Cancelar" },
               persistent: true,
            })
            .onOk(() => {
               this.deleteCar();
               this.$q.notify({
                  type: "positive",
                  message: "Coche eliminado correctamente",
                  timeout: 2000,
               });
            })
            .onCancel(() => {
               this.$q.notify({
                  type: "info",
                  message: "Eliminación cancelada",
                  timeout: 1500,
               });
            });
      },

      // ✅ Confirmación para eliminar imagen
      deleteImage(image) {
         this.$q
            .dialog({
               title: "Confirmar",
               message: "¿Estás seguro de que quieres eliminar esta imagen?",
               cancel: true,
               persistent: true,
            })
            .onOk(() => {
               this.eliminarImagen(image);
               this.$q.notify({
                  type: "info",
                  message: "Imagen eliminada correctamente.",
               });
            })
            .onCancel(() => {
               console.log("Eliminación de imagen cancelada.");
            });
      },

      // ✅ Validación para solo números y puntos
      soloNumerosYPuntos(event) {
         const char = String.fromCharCode(event.which || event.keyCode);
         const currentValue = event.target.value; // El valor actual del input
         if (!/[0-9.]/.test(char)) {
            event.preventDefault();
            return false;
         }
         if (char !== ".") {
            // a. Simular el nuevo valor
            const newValue =
               currentValue.slice(0, event.target.selectionStart) +
               char +
               currentValue.slice(event.target.selectionEnd);
            const numericValue = parseFloat(newValue.replace(/,/g, "")); // Reemplazar comas si usas separador
            if (numericValue > 1000000) {
               event.preventDefault();
               return false;
            }
            if (currentValue.length >= 7 && numericValue < 1000000) {
               event.preventDefault();
               return false;
            }
         }

         return true;
      },

      // ✅ Recargar datos desde API
      async reloadData() {
         this.waitDialog = true;
         this.rowsCoches = await getAllData();
         this.rowsPersonas = await getAllusers();
         this.waitDialog = false;
      },

      async deleteCar() {
         let respuesta = await deleteCar(this.datosCoches.id);
         if (respuesta) console.log(respuesta);
         this.resetDataCar();
         this.dialogCoches = false;
         await this.reloadData();
      },

      deletePdf() {
         this.existPdf = null;
      },

      resetDataCar() {
         this.dialogCoches = true;
         this.newCar = true;
         this.datosCoches = {};
         this.imagenesArray = [];
         this.existPdf = null;
         this.inputPdf = null;
      },

      async aceptarCambios() {
         debugger;

         this.datosCoches.ano = 1991;
         this.datosCoches.colorBanner = "Unknown Color"; // Recuerda, este valor es mejor si es manejado por el switch
         this.datosCoches.combustible = "Diesel";
         this.datosCoches.descripcion = "fdsfdsfsdfsdf";
         this.datosCoches.etiqueta = "A";
         this.datosCoches.km = 334433;
         this.datosCoches.marca = "Ford";
         this.datosCoches.matricula = "sdasdasd";
         this.datosCoches.modelo = "Mondeo";
         this.datosCoches.pdf = null;
         this.datosCoches.precio = 3500;
         this.datosCoches.promocion = "Recién revisado";
         this.datosCoches.tipo = "Monovolumen";

         const colorEs_En = colorsEs_En(this.datosCoches.colorBanner);
         this.datosCoches.colorBanner = colorEs_En;
         this.limpiarURLsTemporales();
         this.mediaTable = {};
         this.mediaTable = this.imagenesArray.reduce((result, item) => {
            return Object.assign(result, {
               id: item.id,
               [item.imagenNum]: item.esNueva ? item.archivo : item.imagen,
            });
         }, this.mediaTable);

         this.mediaTable.pdf = this.existPdf;
         this.mediaTable.id = this.datosCoches.id;

         this.waitDialog = true;
         try {
            if (!this.newCar) {
               let res = await updateTables(
                  this.datosCoches,
                  this.mediaTable,
                  this.imagenesParaEliminar
               );
               console.log(
                  res
                     ? "Datos subidos a la base"
                     : "Error al subir datos en la base"
               );
               this.imagenesParaEliminar = [];
            } else {
               await insertCocheNuevo(this.datosCoches, this.mediaTable);
            }
            this.newCar = false;
            await this.reloadData();
         } catch (error) {
            console.error("Error al guardar:", error);
         } finally {
            this.dialogCoches = false;
            this.datosCoches = {};
            this.inputImagen = null;
            this.waitDialog = false;
         }
      },

      cancelInputCarDialog() {
         this.newCar = false;
         this.dialogCoches = false;
      },

      handleRowClick(evt, row) {
         this.dialogCoches = true;
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
      },

      modImg(item) {
         this.imagenParaCambiar = item;
         this.anadirImagenDialog = true;
      },

      extrerImagenes(row) {
         this.imagenesArray = [];
         for (let img = 1; img <= 8; img++) {
            const propertyName = "imagen" + img;
            if (row[propertyName]) {
               // Usa URL para evitar problemas con barras
               const rutaCompleta = new URL(row[propertyName], this.link).href;

               let imgObj = {
                  imagen: row[propertyName],
                  imagenNum: propertyName,
                  id: row.media_files,
                  esNueva: false,
                  ruta: rutaCompleta, // ← URL correcta
               };

               this.imagenesArray.push(imgObj);
            }
         }
      },

      handleDialogClose() {
         this.showLoginUser = false;
         this.showInputUser = false;
      },

      nuevoUsuario() {
         this.showInputUser = true;
      },

      loginearUsuario() {
         this.showLoginUser = true;
      },

      logOut() {
         store.dispatch("logout");
         Notify.create({ type: "positive", message: "Adios." });
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
