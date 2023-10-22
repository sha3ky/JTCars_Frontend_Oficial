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
                     <q-item clickable>
                        <q-item-section>Coches</q-item-section>
                     </q-item>
                     <q-item clickable>
                        <q-item-section>Ofertas</q-item-section>
                     </q-item>
                     <q-separator />
                     <q-item clickable>
                        <q-item-section>Contacto</q-item-section>
                     </q-item>
                  </q-list>
               </q-menu>
            </q-btn>
            <!-- <q-img
               height="40px"
               width="108px"
               src="../../public/logoIconCar.png"
               v-if="$q.screen.width > 600"
            >
            </q-img> -->
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
                     <q-btn-toggle
                        v-model="modelSelectedMenu"
                        flat
                        stretch
                        toggle-color="green-2"
                        :options="optionsMenu"
                     ></q-btn-toggle>
                  </div>
               </div>
            </template>
            <!-- reactividad -->
            <q-space></q-space>
            <div>
               <q-btn
                  flat
                  round
                  dense
                  icon="img:loginGreen.png"
                  @click="register"
                  style="width: 50px"
               ></q-btn>
               <q-btn
                  flat
                  round
                  dense
                  icon="img:userPlusGreen.png"
                  @click="ingresar"
               ></q-btn>
            </div>
            <q-toggle
               color="white"
               dark
               v-model="white"
               @click="toggleDarkMode"
            />
         </q-toolbar>
      </q-header>
      <q-footer elevated class="bg-blue-grey-9">
         <q-toolbar>
            <q-toolbar-title>Footer</q-toolbar-title>
         </q-toolbar>
      </q-footer>

      <q-page-container style="min-height: 100vh; text-align: center">
         <q-img
            src="../../public/banner.png"
            class="q-mx-auto"
            :max-width="400"
            :max-height="425"
            alt="Beny1 Logo"
         ></q-img>
         <div>
            <div style="padding: 25px;    background: #37474F;">
               <p style="font-size:6vw;text-align: center;    text-align: center;
    color: white;">
                  Coches de segunda mano, vehículos de ocasión y kilómetro 0
               </p>
            </div>
         </div>

         <div style="text-align: center; display: inline-block">
            <InputUser :show-newUser="showNewUser" />
            <loginUser :show-loginUser="showLoginUser" />
         </div>
         <!-- <q-page v-if="showLogin == true">
            <InputUser
               @show-login-updated="updateShowLogin"
               :show-login="showLogin"
               @user-id-updated="updateUserId"
               @user-admin="updateAdmin"
            />
         </q-page> -->

         <!-- <q-page v-if="showLogin === false && userIsAdmin === true">
            <AdminPart
               @show-login-updated="updateShowLogin"
               :show-login="showLogin"
               :user-id="userId"
               @user-admin="updateAdmin"
            />
         </q-page>
         <q-page v-if="showLogin === false && userIsAdmin === false">
            <LabellerUser
               @show-login-updated="updateShowLogin"
               :show-login="showLogin"
               :user-id="userId"
               @user-admin="updateAdmin"
            />
         </q-page> -->
         <router-view />
      </q-page-container>
   </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";
import InputUser from "components/InputUser.vue"; // Replace with the actual path
import loginUser from "src/components/loginUser.vue";
import AdminPart from "components/AdminPart.vue"; // Adjust the path as needed
import LabellerUser from "components/LabellerUser.vue";

//import EssentialLink from 'components/EssentialLink.vue'; // Adjust the path as needed

export default defineComponent({
   name: "MainLayout",
   data() {
      return {
         showNewUser: false,
         showLoginUser: false,
         userId: null,
         userIsAdmin: false,
         white: ref(false),
         modelSelectedMenu: ref("coches"),
         optionsMenu: [
            { label: "Coches", value: "coches" },
            { label: "Ofertas", value: "ofertas" },
            { label: "Contacto", value: "contacto" },
         ],

         // Initialize with your desired value
      };
   },
   methods: {
      ingresar() {
         debugger;
         this.showLoginUser = true;
         this.showNewUser = false;
      },
      register() {
         debugger;
         this.showNewUser = true;
         this.showLoginUser = false;
      },
      toggleDarkMode() {
         const $q = this.$q;
         $q.dark.toggle();
      },
      // updateShowLogin(value) {
      //    this.showLogin = value;
      //    console.log(this.showLogin);
      // },
      // updateUserId(userId) {
      //    // Receive the 'userId' emitted from InputUser component
      //    this.userId = userId;
      // },
      // updateAdmin(value) {
      //    this.userIsAdmin = value;
      // },
   },
   mounted() {},
   components: {
      //EssentialLink,
      InputUser,
      loginUser,
      // AdminPart,
      // LabellerUser,
   },

   setup() {
      const $q = useQuasar();
      $q.dark.set(true); // or false or "auto"
      $q.dark.toggle(); // toggle
   },
});
</script>
