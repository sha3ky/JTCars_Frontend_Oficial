<template>
   <q-page style="display: flex; justify-content: center">
      <div style="padding-top: 120px; text-align: right; width: 370px">
         <q-card class="my-card bg-secondary text-white" v-if="showLogin">
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
               <q-btn
                  glossy
                  rounded
                  color="deep-orange"
                  @click="comprobarUsuario"
                  flat
                  >Aceptar</q-btn
               >
            </q-card-actions>
         </q-card>
      </div>
   </q-page>
</template>

<style></style>
<script>
import { defineComponent } from "vue";
import axios from "axios";
axios.defaults.baseURL = 'https://5eb0-37-158-136-4.ngrok-free.app/'

// import { ref } from "vue";
// import MainLayout from "src/layouts/MainLayout.vue";

export default defineComponent({
   name: "InputUser",
   props: {
      showLogin: Boolean, // Define a prop to receive showLogin from parent
   },
   data() {
      return {
         apiUrlWeb: "https://5eb0-37-158-136-4.ngrok-free.app/",
         api: "http://127.0.0.1:8000/",
         correoInput: "", // Define correoInput data property
         contrasenaInput: "", // Define contrasenaInput data property
         users: [],
         colorEmail: "red",
         colorPass: "red",
      };
   },
 async mounted() {
  await  this.fetchUserData();
},
   methods: {
     async fetchUserData() {
      try {
        console.log("Fetching data from:", `${this.apiUrlWeb}usuarios/`);
        const response = await axios.get(`usuarios/`, {
      headers: {
        'Content-Type': 'application/json', // Set the Content-Type header
        'ngrok-skip-browser-warning': '1231',
      'access-control-allow-origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Methods': '*',
      },
    });
        this.users = response.data;
        console.log("Data received:", this.users);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },

      comprobarUsuario() {
         let contrasena, usuario;
         usuario = this.users.filter(
            (item) =>
               item.correo.toLowerCase() === this.correoInput.toLowerCase()
         )[0];
         if (usuario) {
            this.colorEmail = usuario ? "green" : "red";
            contrasena =
               usuario.password * 1 === this.contrasenaInput * 1 ? true : "";
            this.colorPass = contrasena ? "green" : "red";
         }
         if (usuario && contrasena) {
            console.log("id", usuario.id);
            this.$emit("show-login-updated", false);
            this.$emit("user-id-updated", usuario.id);
            if (usuario.admin) {
               this.$emit("user-admin", usuario.admin);
               console.log("Administrador");
            } else {
               console.log("No es Administrador");
            }
         } else {
            console.log("usuario no existente");
         }
      },
   },
});
</script>
