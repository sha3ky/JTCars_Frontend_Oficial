<template>
   <q-layout view="lHh Lpr lFf">
      <q-header elevated>
         <q-toolbar class="bg-blue-grey-9">
          <q-icon src="img:logoIconCar.png"/>
            <q-btn flat round dense icon="menu" class="q-mr-sm">
               <q-menu>
                  <q-list style="min-width: 100px">
                     <q-item clickable v-close-popup>
                        <q-item-section>New tab</q-item-section>
                     </q-item>
                     <q-item clickable v-close-popup>
                        <q-item-section>New incognito tab</q-item-section>
                     </q-item>
                     <q-separator />
                     <q-item clickable v-close-popup>
                        <q-item-section>Recent tabs</q-item-section>
                     </q-item>
                     <q-item clickable v-close-popup>
                        <q-item-section>History</q-item-section>
                     </q-item>
                     <q-item clickable v-close-popup>
                        <q-item-section>Downloads</q-item-section>
                     </q-item>
                     <q-separator />
                     <q-item clickable v-close-popup>
                        <q-item-section>Settings</q-item-section>
                     </q-item>
                     <q-separator />
                     <q-item clickable v-close-popup>
                        <q-item-section>Help &amp; Feedback</q-item-section>
                     </q-item>
                  </q-list>
               </q-menu>
            </q-btn>
            <q-separator vertical inset style="background: aliceblue;"/>
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

      <q-page-container style="min-height: 100vh;    text-align: center;">



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
