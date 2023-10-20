<template>
   <q-layout view="lHh Lpr lFf">
      <q-header elevated>
         <q-toolbar class="bg-secondary">
            <q-toolbar-title> Test FullStack con Quasar </q-toolbar-title>
         </q-toolbar>
      </q-header>
      <q-page-container style="padding-top: 100px">
         <div style="text-align: center">
            <div>
               <q-btn color="secondary" label="Register" @click="register" />

               <q-btn color="primary" label="Ingresar" @click="ingresar" />
            </div>
            <div style="text-align: center; display: inline-block">
               <InputUser :show-newUser="showNewUser" />
               <loginUser :show-loginUser="showLoginUser" />
            </div>
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

   setup() {},
});
</script>
