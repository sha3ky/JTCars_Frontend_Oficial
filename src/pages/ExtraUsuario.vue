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
                     <template v-if="sessionData">
                        <router-link to="/extra">
                           <q-item clickable>
                              <q-item-section>Extra</q-item-section>
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
                        <q-btn
                           class="glossy"
                           style="color: #1aee9f"
                           clickable
                           rounded
                        >
                           <q-item-section>Coches</q-item-section>
                        </q-btn>
                     </router-link>
                     <router-link to="/contacto">
                        <q-btn
                           class="glossy"
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
                              class="glossy"
                              style="color: #1aee9f; margin-left: 10px"
                              clickable
                              rounded
                           >
                              <q-item-section>Noticias</q-item-section>
                           </q-btn>
                        </router-link>
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
         toggleDark: ref(false),
         modelSelectedMenu: ref("coches"),
         usuarioLogineado: "",
         sessionData: "",
      };
   },
   async mounted() {
      debugger;
      // cuando vienes de otras rutas
      this.sessionData = store.state.sessionData;
      this.usuarioLogineado = store.state.name;
   },
   methods: {
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
      $q.dark.set(true); // or false or "auto"
      $q.dark.toggle(); // toggle

      return {};
   },
});
</script>
