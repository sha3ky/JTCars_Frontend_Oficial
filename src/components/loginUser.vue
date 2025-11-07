<template>
   <div style="text-align: right; width: 370px">
      <q-dialog v-model="loginDialog" @hide="closeDialog">
         <q-card class="my-card blue-grey-2 text-red">
            <q-card-section>
               <div class="text-subtitle2">Login Usuario</div>
            </q-card-section>
            <q-separator dark />
            <q-input
               v-model="userName"
               label="Correo"
               style="padding: 24px; font-size: 20px"
            >
               <template v-slot:label>
                  <div class="row items-center all-pointer-events">
                     <q-icon
                        class="q-mr-xs"
                        :color="colorEmail"
                        size="24px"
                        name="person"
                     />
                  </div>
               </template>
            </q-input>
            <q-input
               type="password"
               v-model="contrasenaInput"
               label="Contraseña"
               style="padding: 24px; font-size: 20px"
               hint="Debe contener una o más letras mayúsculas, minúsculas, números y carácteres especiales."
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
            <q-card-actions style="justify-content: flex-end">
               <q-btn
                  glossy
                  rounded
                  color="deep-orange"
                  @click="handleLogin"
                  flat
                  >Aceptar</q-btn
               >
            </q-card-actions>
         </q-card>
      </q-dialog>
   </div>
</template>
<script>
import { defineComponent } from "vue";

import login from "../composable/loginUser";
import { Notify } from "quasar";

export default defineComponent({
   props: {
      loginUserDialog: Boolean, // Define a prop to receive showLogin from parent
   },
   data() {
      return {
         userName: "",
         contrasenaInput: "",
         users: [],
         colorEmail: "red",
         colorPass: "red",
         loginDialog: false,
      };
   },

   watch: {
      loginUserDialog: function (item) {
         this.loginDialog = item;
      },
   },
   methods: {
      closeDialog() {
         this.$emit("close-dialog-loginuser"); // Emit an event to notify the parent component
      },
      async handleLogin() {
         if (this.userName && this.contrasenaInput) {
            const username = this.userName.toLowerCase();
            const password = this.contrasenaInput;
            // Call the login function
            const result = await login(username, password);
            console.log("result login", result);
            if (result) {
               console.log("usuario logineado");
               Notify.create({
                  type: "positive",
                  message: "Usuario logineado correctamente.",
               });
            } else {
               console.log("usuario no logineado");
               Notify.create({
                  type: "negative",
                  message: "Error al loginear.",
               });
            }
            this.userName = "";
            this.contrasenaInput = "";
            this.loginDialog = false;
         } else {
            if (!this.userName) {
               Notify.create({
                  type: "negative",
                  message: "Falta nombre.",
               });
            }
            if (!this.contrasenaInput) {
               Notify.create({
                  type: "negative",
                  message: "Falta contraseña.",
               });
            }
         }
      },
   },
});
</script>
