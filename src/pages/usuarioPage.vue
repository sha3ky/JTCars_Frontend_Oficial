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
         <h4>Opciones Usuario</h4>
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
                  "
               >
                  <div style="padding: 10px; margin-top: 10%">
                     <q-input v-model="username" label="Nombre usuario" dense />
                  </div>
                  <div style="padding: 10px">
                     <q-input v-model="email" label="Email" dense />
                  </div>
                  <div>
                     <p>Dejar de recibir notificaciones</p>
                     <q-toggle v-model="notificacionesIsActive" color="green" />
                  </div>
               </div>
               <div
                  style="
                     background-color: rgb(50, 182, 205);
                     height: 40vh;
                     width: 60vw;
                     display: flex;
                     flex-direction: column;
                     align-items: center;
                     border-radius: 25px;
                  "
               >
                  <div style="padding: 10px; margin-top: 10%">
                     <q-input
                        v-model="oldPassword"
                        label="Password antiguo"
                        dense
                     />
                  </div>
                  <div style="padding: 10px">
                     <q-input
                        v-model="newPassword"
                        label="Password nuevo"
                        dense
                     />
                  </div>
               </div>
            </div>
            <q-card-actions align="right" class="text-primary">
               <div style="">
                  <q-btn color="red"> ELIMINAR CUENTA </q-btn>
               </div>
               <div style="padding: 5px">
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
</style>
<script>
// const username = sessionStorage.getItem('username');
// const email = sessionStorage.getItem('email');

import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";
import store from "../../src/store";
import InputUser from "components/InputUser.vue"; // Replace with the actual path
import loginUser from "src/components/loginUser.vue";
import logout from "src/composable/logOut";
import { Notify } from "quasar";
import updateUser from "src/composable/updateUser";
import { createLogger } from "vuex";
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
         notificacionesIsActive: false,
         username: sessionStorage.getItem("username"),
         email: sessionStorage.getItem("email"),
      };
   },
   watch: {
      notificacionesIsActive: function (item) {
         debugger;
         item;
      },
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
   },
   methods: {
      async aceptarCambios() {
         let res = await updateUser(
            this.username,
            this.email,
            this.notificacionesIsActive
         );
         if (res) {
            console.log("usuario update ok");
         } else {
            console.log("error al updatear usuario");
         }
      },
      updateUsuarioLogineado(bool) {
         debugger;
         if (bool) {
            this.usuarioLogineado = store.state.name;
            this.sessionData = store.state.sessionData;
            this.userIsAdmin = store.state.isAdmin;
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
