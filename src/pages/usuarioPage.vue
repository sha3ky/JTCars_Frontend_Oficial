<template>
   <q-layout view="lHh Lpr lFf" v-if="sessionData">
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
                           <q-item-section>Contactar</q-item-section>
                        </q-item>
                     </router-link>
                     <!-- <template v-if="sessionData"> -->
                     <!-- <router-link to="/extra">
                          <q-item clickable>
                             <q-item-section>Extra</q-item-section>
                          </q-item>
                       </router-link> -->
                     <!-- </template> -->
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
            <template v-if="$q.screen.width > 600">
               <div>
                  <div>
                     <router-link to="/home">
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
                     <router-link to="/extra">
                        <q-btn
                           style="color: #1aee9f; margin-left: 10px"
                           clickable
                           rounded
                        >
                           <q-item-section>Noticias</q-item-section>
                        </q-btn>
                     </router-link>
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
                     <!-- <template v-if="sessionData">
                        <router-link to="/usuarioPage">
                           <q-btn
                              style="color: #f11212; margin-left: 10px"
                              clickable
                              rounded
                           >
                              <q-item-section>Mis Datos</q-item-section>
                           </q-btn>
                        </router-link>
                     </template> -->
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
      <Footer_Layout />
      <q-page-container style="min-height: 100vh; text-align: center">
         <h4 style="margin: 15px">Opciones Usuario</h4>
         <q-card>
            <div
               style="
                  height: 50vh;
                  width: 100vw;
                  display: flex;
                  justify-content: center;
                  align-items: center;
               "
            >
               <div
                  style="
                     background-color: yellowgreen;
                     height: 40vh;
                     width: 60vw;
                     display: flex;
                     flex-direction: column;
                     align-items: center;
                     border-radius: 25px;
                     justify-content: center;
                  "
               >
                  <div>
                     <p style="margin: 0">Quiero modifcar nombre y email</p>
                     <q-toggle v-model="modificarNomEmail" color="green" />
                  </div>
                  <div>
                     <p style="margin: 0">Quiero recibir notificaciones</p>
                     <q-toggle v-model="notificaciones" color="green" />
                  </div>
                  <div>
                     <p style="margin: 0">Quiero modificar la contraseña</p>
                     <q-toggle v-model="modificarPassword" color="green" />
                  </div>
               </div>

               <template v-if="modificarNomEmail">
                  <div
                     style="
                        background-color: rgb(50, 205, 153);
                        height: 40vh;
                        width: 60vw;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        border-radius: 25px;
                        justify-content: center;
                     "
                  >
                     <div style="padding: 10px; margin-top: 2%">
                        <q-input
                           v-model="objetoNotifField.username"
                           label="Nombre usuario"
                           dense
                        />
                     </div>
                     <div style="padding: 10px">
                        <q-input
                           v-model="objetoNotifField.email"
                           label="Email"
                           dense
                        />
                     </div>
                  </div>
               </template>
               <template v-if="notificaciones">
                  <div
                     style="
                        background-color: rgb(205, 169, 50);
                        height: 40vh;
                        width: 60vw;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        border-radius: 25px;
                        justify-content: center;
                     "
                  >
                     <div>
                        <q-input
                           type="tel"
                           v-model="objetoNotifField.mobileNumber"
                           label="Tu Número de Teléfono"
                           class="q-mb-md md:q-mb-0"
                        />
                     </div>
                     <div>
                        <q-input
                           v-model="objetoNotifField.textareaModel"
                           filled
                           clearable
                           type="textarea"
                           color="red-12"
                           label="Si buscas algo en particular ..."
                        />
                     </div>
                     <div style="padding: 5px">
                        <q-btn
                           push
                           style="background: yellowgreen"
                           label="Preferencias"
                           @click="busquedaAvanzada"
                        />
                     </div>
                  </div>
               </template>
               <template v-if="modificarPassword">
                  <div
                     style="
                        background-color: rgb(50, 182, 205);
                        height: 40vh;
                        width: 60vw;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        border-radius: 25px;
                        j
                     "
                  >
                     <div style="padding: 10px; margin-top: 10%">
                        <q-input
                           dense
                           v-model="oldPassword"
                           filled
                           type="password"
                           label="Password antiguo"
                        />
                     </div>
                     <div style="padding: 10px">
                        <q-input
                           v-model="newPassword"
                           label="Password nuevo"
                           dense
                           type="password"
                        />
                     </div>
                     <div style="padding: 10px">
                        <q-input
                           v-model="newPassword2"
                           label="Repetir password"
                           dense
                           type="password"
                        />
                     </div>
                  </div>
               </template>
            </div>
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
         </q-card>

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
   <q-dialog v-model="busquedaDialog">
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
               <!-- tipoCoches -->
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
               <!-- promotions -->
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
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";
import store from "../../src/store";
import InputUser from "components/InputUser.vue"; // Replace with the actual path
import loginUser from "src/components/loginUser.vue";
import logout from "src/composable/logOut";
import { Notify } from "quasar";
import updateUser from "src/composable/updateUser";
import contactUser from "src/composable/contactUser";
import updatePasswordUser from "src/composable/updatePasswordUser";
import eliminarUsuario from "src/composable/eliminarCuenta";

export default defineComponent({
   name: "ExtraUsuario",
   data() {
      return {
         showInputUser: false, // Initialize showInputUser to control InputUser component
         showLoginUser: false,
         userId: null,
         userIsAdmin: false,
         toggleDark: false,
         modelSelectedMenu: ref("coches"),
         usuarioLogineado: "",
         sessionData: "",
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
   async mounted() {
      // cuando vienes de otras rutas
      this.sessionData = store.state.sessionData;
      this.usuarioLogineado = store.state.name;
      this.userIsAdmin = store.state.isAdmin
         ? store.state.isAdmin
         : this.userIsAdmin;
      this.toggleDark = store.state.toggleDarkMode
         ? store.state.toggleDarkMode
         : this.toggleDark;
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
            this.userIsAdmin = false;
            Notify.create({
               type: "positive",
               message: "Adios.",
            });
            this.$router.push({ name: "principal-coches" });
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
      return {};
   },
});
</script>
