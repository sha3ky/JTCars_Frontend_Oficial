<template>
   <div style="text-align: right; width: 370px">
      <q-dialog v-model="inputDialog" @hide="closeDialog">
         <q-card>
            <q-card class="my-card blue-grey-2 text-red">
               <q-card-section>
                  <div class="text-subtitle2">Registrar Nuevo Usuario</div>
               </q-card-section>
               <q-separator dark />

               <q-input
                  v-model="userName"
                  label="nombre"
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
                     @click="handleInput"
                     flat
                     >Aceptar</q-btn
                  >
               </q-card-actions>
            </q-card>
         </q-card>
      </q-dialog>
   </div>
</template>
<script>
import { defineComponent } from "vue";
import apiLink from "../composable/apiLink";
import insertUser from "../composable/usersInput";
import { Notify } from "quasar";
export default defineComponent({
   name: "InputUser",
   props: {
      inputUserDialog: Boolean, // Define a prop to receive showLogin from parent
   },
   data() {
      return {
         api: apiLink,
         correoInput: "",
         contrasenaInput: "",
         userName: "",
         users: [],
         colorEmail: "red",
         colorPass: "red",
         inputDialog: false,
      };
   },
   watch: {
      inputUserDialog: function (item) {
         debugger;
         this.inputDialog = item;
      },
   },
   methods: {
      closeDialog() {
         debugger;
         this.$emit("close-dialog-newuser"); // Emit an event to notify the parent component
      },
      async handleInput() {
         debugger;
         // Assuming login function takes 'username' and 'password' as parameters
         const username = this.userName;
         const password = this.contrasenaInput;
         const email = this.correoInput;

         // Call the login function
         const result = await insertUser(username, email, password);

         if (result) {
            console.log("usuario registrado");
            Notify.create({
               type: "positive",
               message: "Usuario registrado correctamente.",
            });
         } else {
            console.log("usuario no registrado");
            Notify.create({
               type: "negative",
               message: "Error al registrar el usuario.",
            });
         }

         this.inputDialog = false;
         this.userName = "";
         this.contrasenaInput = "";
         this.correoInput = "";
      },


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
