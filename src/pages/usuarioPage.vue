<template>
   <q-layout view="lHh Lpr lFf" v-if="isAuthenticated()">
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
                     <router-link to="/home">
                        <q-item clickable>
                           <q-item-section>Coches</q-item-section>
                        </q-item>
                     </router-link>
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
                     <!-- <template v-if="sessionData">
                        <router-link to="/usuarioPage">
                           <q-item clickable>
                              <q-item-section>Mis datos</q-item-section>
                           </q-item>
                        </router-link>
                     </template> -->
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
                     <router-link to="/home">
                        <q-btn style="color: #bbdefb" clickable>
                           <q-item-section>Coches</q-item-section>
                        </q-btn>
                     </router-link>
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
            <!-- reactividad -->
            <q-space></q-space>
            <div>
               <template v-if="!isAuthenticated()">
                  <div>
                     <!--   <q-btn
                        flat
                        round
                        dense
                        icon="img:loginGreen.png"
                        @click="loginearUsuario"
                        style="width: 50px"
                     ></q-btn> -->
                     <!--  <q-btn
                        flat
                        round
                        dense
                        icon="img:userplusGreen.png"
                        @click="nuevoUsuario"
                     ></q-btn> -->
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
            <dark-mode-toggle />
         </q-toolbar>
      </q-header>
      <Footer_Layout />
      <q-page-container style="min-height: 100vh; text-align: center">
         <h4 style="margin: 15px">Ajustes Usuario</h4>
         <q-card style="">
            <div
               style="
                  height: 50vh;
                  width: 100vw;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  background-image: url('/gemConces.webp');
                  background-size: cover;
                  background-position: center;
                  z-index: 1;
                  position: relative;
               "
            >
               <div
                  class="q-pa-md"
                  style="
                     max-width: 550px;
                     z-index: 10;
                     background-color: rgba(0, 0, 0, 0.62);
                     border-radius: 10px;
                  "
               >
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
                        <q-card>
                           <q-card-section>
                              <div style="padding: 3px">
                                 <q-input
                                    dense
                                    v-model="oldPassword"
                                    type="password"
                                    label="Password antiguo"
                                 />
                              </div>
                              <div style="padding: 3px">
                                 <q-input
                                    v-model="newPassword"
                                    label="Password nuevo"
                                    dense
                                    type="password"
                                 />
                              </div>
                              <div style="padding: 3px">
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
                  </q-list>
               </div>
            </div>
         </q-card>
         <q-card-actions align="right" class="text-primary">
            <div style="padding: 5px">
               <q-btn color="red" @click="eliminarCuenta">
                  ELIMINAR CUENTA
               </q-btn>
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
   <!--  <q-dialog v-model="busquedaDialog">
      <q-card>
         <q-card-section>
            <div class="text-h6">Busqueda avanzada</div>
         </q-card-section>

         <q-card-section class="q-pt-none">
            <div style="display: flex; padding: 5px">
               <div style="width: 33vw">
                  <q-select
                     filled
                     v-model="objetoNotifField.ano"
                     :options="optionsAno"
                     label="Selecionar Año Hasta"
                     dense
                     style="max-width: 100%"
                  />
               </div>
               <div style="width: 33vw">
                  <q-select
                     filled
                     v-model="objetoNotifField.km"
                     :options="optionskm"
                     label="Km hasta"
                     dense
                     style="max-width: 100%"
                  />
               </div>
            </div>
            <div style="display: flex; padding: 5px">
               <div style="width: 33vw">
                  <div>
                     <q-select
                        filled
                        v-model="objetoNotifField.etiqueta"
                        :options="optionsEtiqueta"
                        label="Selecionar Etiqueta"
                        dense
                        style="max-width: 100%"
                     />
                  </div>
               </div>

               <div style="width: 33vw">
                  <div>
                     <q-select
                        filled
                        v-model="objetoNotifField.tipo"
                        :options="optionsTipo"
                        label="Selecionar Tipo"
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
                     v-model="objetoNotifField.combustible"
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
                     v-model="objetoNotifField.precio"
                     label="Indica el precio maximo"
                  />
               </div>
            </div>
         </q-card-section>

         <q-card-actions align="right">
            <q-btn
               flat
               label="Cancelar"
               @click="cancelarDialog"
               color="primary"
               v-close-popup
            />
            <q-btn flat label="OK" color="primary" v-close-popup />
         </q-card-actions>
      </q-card>
   </q-dialog> -->
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
import { defineComponent } from "vue";
import store from "../../src/store";
import InputUser from "components/InputUser.vue"; // Replace with the actual path
import loginUser from "src/components/loginUser.vue";
import { Notify } from "quasar";
import updateUser from "src/composable/updateUser";
import contactUser from "src/composable/contactUser";
import updatePasswordUser from "src/composable/updatePasswordUser";
import eliminarUsuario from "src/composable/eliminarCuenta";
import { authMixin } from "../mixins/authMixin";
import DarkModeToggle from "src/components/DarkModeToggle.vue";
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
            username: sessionStorage.getItem("username"),
            email: sessionStorage.getItem("email"),
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
      async eliminarCuenta() {
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
      },
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
      DarkModeToggle,
   },
});
</script>
