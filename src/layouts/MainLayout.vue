<template>
   <q-layout view="lHh Lpr lFf">
      <q-header elevated>
         <q-toolbar class="bg-secondary">
            <q-toolbar-title> Test FullStack con Quasar </q-toolbar-title>
         </q-toolbar>
      </q-header>
      <q-page-container style="padding-top: 100px">
         <q-page v-if="showLogin == true">
            <router-view />
            <InputUser
               @show-login-updated="updateShowLogin"
               :show-login="showLogin"
               @user-id-updated="updateUserId"
               @user-admin="updateAdmin"
            />
         </q-page>
         <q-page v-if="showLogin === false && userIsAdmin === true">
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
         </q-page>
      </q-page-container>
   </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import InputUser from "components/InputUser.vue"; // Replace with the actual path
import AdminPart from "components/AdminPart.vue"; // Adjust the path as needed
import LabellerUser from "components/LabellerUser.vue";

//import EssentialLink from 'components/EssentialLink.vue'; // Adjust the path as needed

export default defineComponent({
   name: "MainLayout",
   data() {
      return {
         showLogin: true,
         userId: null,
         userIsAdmin: false,

         // Initialize with your desired value
      };
   },
   methods: {
      updateShowLogin(value) {
         this.showLogin = value;
         console.log(this.showLogin);
      },
      updateUserId(userId) {
         // Receive the 'userId' emitted from InputUser component
         this.userId = userId;
      },
      updateAdmin(value) {
         this.userIsAdmin = value;
      },
   },
   mounted() {},
   components: {
      //EssentialLink,
      InputUser,
      AdminPart,
      LabellerUser,
   },

   setup() {},
});
</script>
