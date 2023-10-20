<template>
   <div style="padding-top: 120px; text-align: right; width: 370px">
      <q-card class="my-card bg-secondary text-white" v-if="showNewUser">
         <q-card-section>
            <div class="text-subtitle2">by Julian Raita</div>
         </q-card-section>
         <q-separator dark />
         <q-input
            v-model="correoInput"
            label="Correo"
            style="padding: 24px; font-size: 20px"
         >
            <template v-slot:label>
               <div class="row items-center all-pointer-events">
                  <q-icon
                     class="q-mr-xs"
                     :color="colorEmail"
                     size="24px"
                     name="mail"
                  />
               </div>
            </template>
         </q-input>
         <q-input
            type="password"
            v-model="contrasenaInput"
            label="Contraseña"
            style="padding: 24px; font-size: 20px"
         >
            <template v-slot:label>
               <div class="row items-center all-pointer-events">
                  <q-icon
                     class="q-mr-xs"
                     :color="colorPass"
                     size="24px"
                     name="key"
                  />
               </div>
            </template>
         </q-input>
         <q-separator dark />
         <q-card-actions style="justify-content: flex-end">
            <q-btn glossy rounded color="deep-orange" @click="handleLogin" flat
               >Aceptar</q-btn
            >
            <q-btn glossy rounded color="deep-orange" @click="handleLogOut" flat
               >LogOut</q-btn
            >
         </q-card-actions>
      </q-card>
   </div>
</template>

<script>
import { defineComponent } from "vue";
import apiLink from "../composable/apiLink";
import insertUser from "../composable/usersInput";
import logout from "src/composable/logOut";

export default defineComponent({
   name: "InputUser",
   props: {
      showNewUser: Boolean, // Define a prop to receive showLogin from parent
   },
   data() {
      return {
         api: apiLink,
         correoInput: "",
         contrasenaInput: "",
         users: [],
         colorEmail: "red",
         colorPass: "red",
      };
   },
   //  async mounted() {
   //     this.users = await fetchUserData();
   //  },
   methods: {
      async handleLogin() {
         debugger;
         // Assuming login function takes 'username' and 'password' as parameters
         const username = this.correoInput;
         const password = this.contrasenaInput;

         // Call the login function
         const result = await insertUser(username, password);

         if (result) {
            console.log("usuario registrado");
            // Login was successful
            // You can perform actions like redirecting to a dashboard or updating the UI here.
         } else {
            console.log("usuario no registrado");
            // Login failed, handle the error, e.g., show an error message.
         }
      },
      handleLogOut(){
        debugger
        logout()
      }

      // comprobarUsuario() {
      //    let contrasena, usuario;
      //    usuario = this.users.filter(
      //       (item) =>
      //          item.correo.toLowerCase() === this.correoInput.toLowerCase()
      //    )[0];
      //    if (usuario) {
      //       this.colorEmail = usuario ? "green" : "red";
      //       contrasena =
      //          usuario.password * 1 === this.contrasenaInput * 1 ? true : "";
      //       this.colorPass = contrasena ? "green" : "red";
      //    }
      //    if (usuario && contrasena) {
      //       console.log("id", usuario.id);
      //       this.$emit("show-login-updated", false);
      //       this.$emit("user-id-updated", usuario.id);
      //       if (usuario.admin) {
      //          this.$emit("user-admin", usuario.admin);
      //          console.log("Administrador");
      //       } else {
      //          console.log("No es Administrador");
      //       }
      //    } else {
      //       console.log("usuario no existente");
      //    }
      // },
   },
});
</script>
../composable/usersInput
