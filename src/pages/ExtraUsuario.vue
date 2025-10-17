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
                     <template v-if="sessionData">
                        <router-link to="/usuarioPage">
                           <q-item clickable>
                              <q-item-section>Mis datos</q-item-section>
                           </q-item>
                        </router-link>
                     </template>
                     <template v-if="userIsAdmin">
                        <router-link to="/admin">
                           <q-item clickable>
                              <q-item-section>Admin</q-item-section>
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
                     <router-link to="/">
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
                     <template v-if="sessionData">
                        <router-link to="/usuarioPage">
                           <q-btn
                              style="color: #ffab91; margin-left: 15px"
                              clickable
                           >
                              <q-item-section>Mis Datos</q-item-section>
                           </q-btn>
                        </router-link>
                     </template>
                     <!-- test -->
                     <!-- <template v-if="sessionData"> -->
                     <!-- <router-link to="/extra">
                           <q-btn

                              style="color: #1aee9f; margin-left: 10px"
                              clickable

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
                        <q-btn flat round dense @click="logOut">Salir</q-btn>
                     </div>
                  </div>
               </template>
               <!--  -->
            </div>
            <q-toggle
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
            </q-toggle>
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
         <div class="iframe-container">
            <iframe
               src="https://loscochesmasvendidos.com/"
               width="100%"
               height="100%"
               style="border: 0"
               allowfullscreen=""
               loading="lazy"
               referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
         </div>
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
import Footer_Layout from "src/layouts/Footer_Layout.vue";
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";
import store from "../../src/store";
import InputUser from "components/InputUser.vue"; // Replace with the actual path
import loginUser from "src/components/loginUser.vue";
import logout from "src/composable/logOut";
import { Notify } from "quasar";
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
      };
   },
   async mounted() {
      // cuando vienes de otras rutas
      // ⏺️ Recuperamos datos persistidos del store
      const { sessionData, name, isAdmin, darkMode } = store.state;

      this.sessionData = sessionData;
      this.usuarioLogineado = name;
      this.userIsAdmin = isAdmin ?? this.userIsAdmin;

      // ✅ Aplica el modo oscuro directamente en Quasar si está activo
      this.toggleDark = darkMode ?? this.toggleDark;
      if (this.$q.dark.isActive !== this.toggleDark) {
         this.$q.dark.set(this.toggleDark);
      }
   },
   methods: {
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

         // Cambia el modo en Quasar
         $q.dark.toggle();

         // Obtiene el nuevo estado (true / false)
         const isDark = $q.dark.isActive;

         // Actualiza solo la propiedad darkMode, manteniendo el resto
         store.commit("setSessionData", {
            sessionData: store.state.sessionData,
            name: store.state.name,
            isAdmin: store.state.isAdmin,
            darkMode: isDark,
         });

         // No necesitas guardar manualmente en localStorage gracias a vuex-persistedstate
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
      // $q.dark.set(true); // or false or "auto"
      // $q.dark.toggle(); // toggle

      return {};
   },
});
</script>
../stores ../../../store
