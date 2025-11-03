<template>
   <q-layout view="lHh Lpr lFf" v-if="isAuthenticated()">
      <HeaderLayout
         :is-authenticated="isAuthenticated()"
         :user-is-admin="userIsAdmin"
         :usuario-logineado="usuarioLogineado"
         @login="loginearUsuario"
         @logout="logOut"
      />

      <Footer_Layout />
      <!--  <q-page-container
         :class="{ 'carbon-white': esModoClaro, 'carbon-dark': !esModoClaro }"
         style="min-height: 100vh; text-align: center"
      > -->
      <!-- :style="backgroundStyle" -->
      <q-page-container>
         <div
            style="
               height: 100vh;
               width: 100vw;
               display: flex;
               flex-direction: column;
               background-image: linear-gradient(
                     rgba(0, 0, 0, 0.5),
                     rgba(0, 0, 0, 0.5)
                  ),
                  url('/mechanic.webp');
               align-items: center;
               align-items: center;
               background-size: cover;
               background-position: center;
               z-index: 1;
               position: relative;
            "
         >
            <div
               style="
                  background-color: rgb(255, 152, 0, 0.5);
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
               <h4>Ajustes Usuario</h4>
            </div>
            <div class="q-pa-md" :style="backgroundStyle">
               <q-list bordered class="rounded-borders">
                  <q-expansion-item
                     group="somegroup"
                     expand-separator
                     icon="perm_identity"
                     label="Modificar Nombre y Correo"
                     dense
                     style="
                        color: white;
                        font-size: clamp(1.3rem, 4vw, 1.875rem);
                     "
                  >
                     <q-card>
                        <q-card-section>
                           <div style="margin-top: 2%">
                              <q-input
                                 v-model="objetoNotifField.username"
                                 :label="usuarioLogineado"
                              />
                           </div>
                           <div style="">
                              <q-input
                                 v-model="objetoNotifField.email"
                                 label="Email"
                              />
                           </div>
                        </q-card-section>
                     </q-card>
                  </q-expansion-item>

                  <q-expansion-item
                     group="somegroup"
                     expand-separator
                     icon="key"
                     label="Modificar contraseña"
                     dense
                     style="
                        color: white;
                        font-size: clamp(1.3rem, 4vw, 1.875rem);
                     "
                  >
                     <q-card class="text-primary q-pa-md">
                        <q-card-section>
                           <div>
                              <q-input
                                 dense
                                 v-model="oldPassword"
                                 type="password"
                                 label="Password antiguo"
                              />
                           </div>
                           <div>
                              <q-input
                                 v-model="newPassword"
                                 label="Password nuevo"
                                 dense
                                 type="password"
                              />
                           </div>
                           <div>
                              <q-input
                                 v-model="newPassword2"
                                 label="Repetir password"
                                 dense
                                 type="password"
                              />
                           </div>
                        </q-card-section>
                     </q-card>
                  </q-expansion-item>
                  <q-card-actions align="right" class="text-primary q-pa-md">
                     <div>
                        <q-btn
                           label="Guardar"
                           @click="aceptarCambios"
                           v-close-popup
                           color="green"
                           text-color="black"
                        />
                     </div>
                  </q-card-actions>
               </q-list>
            </div>
         </div>

         <!--  <q-card-actions align="right" class="text-primary">
            <div>
               <q-btn
                  label="Aceptar"
                  @click="aceptarCambios"
                  v-close-popup
                  color="green"
                  text-color="black"
               />
            </div>
         </q-card-actions> -->
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
      </q-page-container>
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
</template>
<style scoped>
.big-input :deep(.q-field__native) {
   font-size: 30px !important;
   min-height: 50px !important;
}

.big-input :deep(.q-field__control) {
   min-height: 60px !important;
}

.big-input :deep(.q-field__label) {
   font-size: 20px !important;
   top: 15px !important;
}
.iframe-container {
   width: 100%;
   height: 100vh; /* This makes the container take up the full viewport height */
   /* Add any additional styles to the container if needed */
}
body.body--dark {
   background: #0c0c0c;
}
.q-select__dialog {
   width: 200px !important;
}
</style>
<script>
import {
   etiquetaCoche,
   tipoCoche,
   tipoCombustible,
   cocheAno,
   km,
} from "src/composable/dataSelectores";
import Footer_Layout from "src/layouts/Footer_Layout.vue";
import { defineComponent, computed } from "vue";
import store from "../../src/store";
import InputUser from "components/InputUser.vue"; // Replace with the actual path
import loginUser from "src/components/loginUser.vue";
import { Notify } from "quasar";
import updateUser from "src/composable/updateUser";
import contactUser from "src/composable/contactUser";
import updatePasswordUser from "src/composable/updatePasswordUser";
/* import eliminarUsuario from "src/composable/eliminarCuenta"; */
import { authMixin } from "../mixins/authMixin";
import HeaderLayout from "components/HeaderComponent.vue";

export default defineComponent({
   name: "ExtraUsuario",
   mixins: [authMixin],
   data() {
      return {
         showInputUser: false, // Initialize showInputUser to control InputUser component
         showLoginUser: false,
         userId: null,
         fechaActual: new Date().getFullYear(),
         oldPassword: "",
         newPassword: "",
         newPassword2: "",
         notificaciones: false,
         modificarPassword: false,
         busquedaDialog: false,
         modificarNomEmail: false,
         ////////////////////////////
         optionsEtiqueta: etiquetaCoche,
         optionsTipo: tipoCoche,
         optionsAno: cocheAno,
         optionsCombustible: tipoCombustible,
         optionskm: km,
         objetoNotifField: {
            username: "",
            email: "",
            notificaciones: true,
            mobileNumber: "",
            textareaModel: "",
            ano: 0,
            km: 0,
            etiqueta: "",
            precio: 0,
            combustible: "",
            tipo: "",
         },
      };
   },
   watch: {
      notificaciones: function (item) {
         if (item) {
            this.modificarPassword = false;
            this.modificarNomEmail = false;
         }
      },
      modificarPassword: function (item) {
         if (item) {
            this.notificaciones = false;
            this.modificarNomEmail = false;
         }
      },
      modificarNomEmail: function (item) {
         if (item) {
            this.notificaciones = false;
            this.modificarPassword = false;
         }
      },
   },
   computed: {
      backgroundStyle() {
         console.log("pici", store.state.darkMode);
         const baseStyle = {
            "max-width": "550px",
            "z-index": "10",
            "border-radius": "10px",
            "margin-top": "10%",
         };
         // Si el usuario ES Admin (por ejemplo) o está en modo claro
         if (store.state.darkMode) {
            return {
               ...baseStyle,
               "background-color": "rgba(251, 251, 251, 0.33)",
            };
         } else {
            // Si NO es Admin, usa la versión oscura
            return {
               ...baseStyle,
               "background-color": "rgba(0, 0, 0, 0.62)",
            };
         }
      },
   },
   methods: {
      showNotificaciones() {
         this.activeSection = "notificaciones";
      },
      showModificarPassword() {
         this.activeSection = "modificarPassword";
      },
      showModificarNomEmail() {
         this.activeSection = "modificarNomEmail";
      },
      cancelarDialog() {
         this.objetoNotifField.mobileNumber = "";
         this.objetoNotifField.textareaModel = "";
         this.objetoNotifField.ano = "";
         this.objetoNotifField.km = 0;
         this.objetoNotifField.etiqueta = "";
         this.objetoNotifField.precio = "";
         this.objetoNotifField.combustible = "";
         this.objetoNotifField.tipo = "";
      },
      busquedaAvanzada() {
         this.busquedaDialog = true;
      },
      /*  async eliminarCuenta() {
         let delCuenta = await eliminarUsuario();
         if (delCuenta) {
            Notify.create({
               type: "succes",
               message: "Cuenta Eliminada",
            });

            // window.location.href = './home';
            this.$router.push({ name: "principal-coches" });
            store.dispatch("logout");
            await logout();
         } else {
            Notify.create({
               type: "negative",
               message: "Error al eliminar la cuenta",
            });
            return;
         }
      }, */
      async aceptarCambios() {
         let userNam = sessionStorage.getItem("username");
         let mail = sessionStorage.getItem("email");

         // Handle notificaciones
         if (this.notificaciones) {
            let respuestaNot = await contactUser(this.objetoNotifField);
            if (respuestaNot) {
               console.log("Cambios realizados");
               this.objetoNotifField.mobileNumber = "";
               this.objetoNotifField.textareaModel = "";
               Notify.create({
                  type: "positive",
                  message: "Cambios realizados",
               });
            } else {
               console.log("Cambios no realizados");
               Notify.create({
                  type: "negative",
                  message: "Cambios no realizados",
               });
            }
         } else if (this.modificarPassword) {
            if (this.newPassword !== this.newPassword2) {
               console.log("Las contraseñas no son iguales");
               Notify.create({
                  type: "negative",
                  message: "Las contraseñas no son iguales",
               });
            } else {
               let resPassword = await updatePasswordUser(
                  this.oldPassword,
                  this.newPassword
               );
               if (resPassword) {
                  console.log("Usuario update ok");
                  Notify.create({
                     type: "positive",
                     message: "Contraseña cambiada",
                  });
                  this.oldPassword = "";
                  this.newPassword = "";
                  this.newPassword2 = "";
               } else {
                  console.log("Error al cambiar la contraseña");
                  Notify.create({
                     type: "negative",
                     message: "Error al cambiar la contraseña",
                  });
               }
            }
         }

         if (
            this.modificarNomEmail &&
            (userNam !== this.objetoNotifField.username ||
               mail !== this.objetoNotifField.email)
         ) {
            let res = await updateUser(
               this.objetoNotifField.username,
               this.objetoNotifField.email
            );
            if (res) {
               sessionStorage.setItem(
                  "username",
                  this.objetoNotifField.username
               );
               sessionStorage.setItem("email", this.objetoNotifField.email);
               console.log("Usuario update ok");
               Notify.create({
                  type: "positive",
                  message: "Nombre cambiado",
               });
            } else {
               console.log("Error al actualizar el usuario");
               Notify.create({
                  type: "negative",
                  message: "Error al cambiar el nombre",
               });
            }
         }
      },

      updateUsuarioLogineado(bool) {
         if (bool) {
            this.usuarioLogineado = store.state.name;
            this.sessionData = store.state.sessionData;
            this.userIsAdmin = store.state.isAdmin;
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
