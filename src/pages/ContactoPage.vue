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
                     <!-- <router-link to="/contacto">
                        <q-item clickable>
                           <q-item-section>Contacto</q-item-section>
                        </q-item>
                     </router-link> -->
                     <!-- <template v-if="sessionData"> -->
                     <router-link to="/noticias">
                        <q-item clickable>
                           <q-item-section>Noticias</q-item-section>
                        </q-item>
                     </router-link>
                     <template v-if="userIsAdmin">
                        <router-link to="/admin">
                           <q-item clickable>
                              <q-item-section>Admin</q-item-section>
                           </q-item>
                        </router-link>
                     </template>
                     <template v-if="isAuthenticated()">
                        <router-link to="/usuarioPage">
                           <q-item clickable>
                              <q-item-section>Mis datos</q-item-section>
                           </q-item>
                        </router-link>
                     </template>
                     <!-- </template> -->
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
                     <!-- <router-link to="/contacto">
                        <q-btn

                           style="color: #1aee9f; margin-left: 10px"
                           clickable
                           rounded
                        >
                           <q-item-section>Contacto</q-item-section>
                        </q-btn>
                     </router-link> -->
                     <!-- test -->
                     <!-- <template v-if="sessionData"> -->
                     <router-link to="/noticias">
                        <q-btn
                           style="color: #bbdefb; margin-left: 15px"
                           clickable
                        >
                           <q-item-section>Noticias</q-item-section>
                        </q-btn>
                     </router-link>
                     <template v-if="isAuthenticated()">
                        <router-link to="/usuarioPage">
                           <q-btn
                              style="color: #ffab91; margin-left: 15px"
                              clickable
                           >
                              <q-item-section>Mis Datos</q-item-section>
                           </q-btn>
                        </router-link>
                     </template>
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

                     <!-- </template> -->
                     <!-- test -->
                  </div>
               </div>
            </template>
            <!-- reactividad -->
            <q-space></q-space>
            <div>
               <template v-if="!isAuthenticated()">
                  <div>
                     <!--  <q-btn
                        flat
                        round
                        dense
                        icon="img:loginGreen.png"
                        @click="loginearUsuario"
                        style="width: 50px"
                     ></q-btn> -->
                     <!--   <q-btn
                        flat
                        round
                        dense
                        icon="img:userplusGreen.png"
                        @click="nuevoUsuario"
                     ></q-btn> -->
                  </div>
               </template>
               <template v-if="isAuthenticated()">
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
            <dark-mode-toggle />
         </q-toolbar>
      </q-header>
      <Footer_Layout />
      <q-page-container style="min-height: 100vh; text-align: center">
         <!-- <div>
            <q-img
               src="/newPngFuture.png"
               class="q-mx-auto"
               alt="Beny1 Logo"
            >
            </q-img>
         </div> -->
         <div class="q-pa-md q-gutter-md">
            <div class="row justify-between">
               <div
                  style="
                     position: relative;
                     width: 100%;
                     height: 500px;
                     overflow: hidden;
                  "
               >
                  <!-- Imagen de fondo -->
                  <img
                     src="/contactar.webp"
                     style="
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        object-position: center 60%;
                        position: absolute;
                        top: 0;
                        left: 0;
                        z-index: 1;
                     "
                  />

                  <!-- Capa oscura encima -->
                  <div
                     style="
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(
                           0,
                           0,
                           0,
                           0.5
                        ); /* oscuro semitransparente */
                        z-index: 2;
                     "
                  ></div>

                  <!-- Texto encima de todo -->
                  <div
                     style="
                        position: relative;
                        z-index: 3;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100%;
                     "
                  >
                     <h1 class="text-h2 text-white text-bold">Contáctanos</h1>
                  </div>
               </div>
            </div>
         </div>

         <div style="padding: 20px">
            <div>
               <h4 style="margin: 10px">
                  <!-- Contacta con nosotros y sé el primero en <br />
                  enterarte de las novedades. -->
                  Contacta con nosotros y sé el primero <br />
                  en conocer las novedades.
               </h4>
            </div>
            <div style="margin-bottom: 5px">
               <div
                  class="q-pa-md"
                  style="
                     display: grid;
                     justify-content: space-around;
                     border: 2px solid #787575;
                     padding: 20px;
                     border-radius: 15px;
                  "
               >
                  <div>
                     <h5>
                        En <b>JTCars</b>, nos tomamos en serio su
                        satisfacción.<br />
                        Estamos comprometidos a brindarle no solo un coche, sino
                        una experiencia <br />
                        confiable y placentera. Su felicidad al conducir es
                        nuestra prioridad número uno.
                     </h5>
                  </div>
                  <q-form
                     @submit="onSubmit"
                     @reset="onReset"
                     class="q-gutter-md"
                  >
                     <q-input
                        outlined
                        v-model="obj.nombre.value"
                        label="Tu nombre *"
                     />

                     <q-input
                        outlined
                        type="email"
                        v-model="obj.email.value"
                        label="Tu Email *"
                        lazy-rules
                     />
                     <q-input
                        outlined
                        type="tel"
                        v-model="obj.mobileNumber.value"
                        label="Tu Número de Teléfono"
                        class="q-mb-md md:q-mb-0"
                     />
                     <q-input
                        v-model="obj.textareaModel.value"
                        filled
                        clearable
                        type="textarea"
                        color="red-12"
                        label="Si buscas algo en particular ..."
                        hint="O si tienes dudas"
                     />

                     <q-toggle
                        v-model="toggleAcept"
                        label="Acepto el envio de novedades"
                     />

                     <div>
                        <q-btn
                           label="Aceptar"
                           type="aceptar"
                           style="color: #1aee9f"
                        />
                        <q-btn
                           label="Reset"
                           type="reset"
                           color="red"
                           flat
                           class="q-ml-sm"
                        />
                     </div>
                  </q-form>
               </div>
            </div>

            <div
               style="
                  display: flow;
                  border: 2px solid #787575;
                  padding: 10px;
                  border-radius: 15px;
               "
            >
               <div>
                  <h5 style="margin: 10px">
                     Estamos en Cubelles, Carrer Maestrat número 5 <br />
                     Contactar al Teléfono: 614103736 <br />
                     Lunes - Viernes: 9.00-20:00h<br />
                     Sabado : 10.00 - 15.00h
                  </h5>
               </div>
               <q-card flat bordered class="q-mt-md">
                  <q-card-section class="text-h6 text-bold">
                     Nuestra Ubicación — Carrer Maresme, 5 (Cubelles)
                  </q-card-section>

                  <div
                     style="
                        position: relative;
                        padding-bottom: 26.25%;
                        height: 0;
                        overflow: hidden;
                        border-radius: 8px;
                     "
                  >
                     <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d860.9329499534263!2d1.6458031696481854!3d41.19937910728468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a388dac308fe55%3A0xf212fec437802d0f!2sCarrer%20Maresme%2C%205%2C%2008880%20Cubelles%2C%20Barcelona!5e1!3m2!1ses!2ses!4v1757338182625!5m2!1ses!2ses"
                        width="600"
                        height="450"
                        style="border: 0"
                        allowfullscreen=""
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                     ></iframe>
                  </div>
               </q-card>
            </div>
         </div>
         <InputUser
            :inputUserDialog="showInputUser"
            @close-dialog-newuser="handleDialogClose"
         />

         <loginUser
            :loginUserDialog="showLoginUser"
            @close-dialog-loginuser="handleDialogClose"
         />
         <!--  @update-usuario-logineado="updateUsuarioLogineado" -->
         <router-view />
      </q-page-container>
   </q-layout>
</template>
<style>
/* .body--{
  background-color: beige;
} */
body.body--dark {
   background: #0c0c0c;
}
</style>

<script>
import DarkModeToggle from "src/components/DarkModeToggle.vue";
import { authMixin } from "../mixins/authMixin";
import Footer_Layout from "src/layouts/Footer_Layout.vue";
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";
import { RouterView, RouterLink } from "vue-router";
import InputUser from "components/InputUser.vue"; // Replace with the actual path
import loginUser from "src/components/loginUser.vue";
import store from "../../src/store";
import contactUser from "src/composable/contactUser";
import { Notify } from "quasar";
export default defineComponent({
   name: "ContactoPage",
   mixins: [authMixin],
   data() {
      return {
         showInputUser: false, // Initialize showInputUser to control InputUser component
         showLoginUser: false,
         userId: null,
         modelSelectedMenu: ref("coches"),
      };
   },

   mounted() {},
   methods: {
      handleDialogClose() {
         this.showLoginUser = false; // Set showLoginUser to false when the dialog is closed
         this.showInputUser = false;
      },
      nuevoUsuario() {
         this.showInputUser = true;
      },
      loginearUsuario() {
         this.showLoginUser = true;
         //this.showInputUser = false;
      },
      async logOut() {
         store.dispatch("logout");
         Notify.create({
            type: "positive",
            message: "Adios.",
         });
         this.$router.push({ name: "principal-coches" });
      },
   },

   components: {
      InputUser,
      loginUser,
      Footer_Layout,
      DarkModeToggle,
   },

   setup() {
      const myForm = ref(null);
      const $q = useQuasar();
      // $q.dark.set(true); // or false or "auto"
      // $q.dark.toggle(); // toggle
      const obj = {
         textareaModel: ref(""),
         nombre: ref(""),
         mobileNumber: ref(""),
         email: ref(""),
      };
      // const textareaModel = ref("");
      // const nombre = ;
      // const email = ref(null);
      // const mobileNumber = ref(null);
      const toggleAcept = ref(false);
      const dialogVisible = ref(false);

      function onSubmit() {
         let res;
         if (toggleAcept.value) {
            if (obj.email) {
               const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
               res = emailRegex.test(obj.email.value);
               if (!res) {
                  mensaje("El email no es valido", "red");
                  return;
               }
            } else {
               return;
            }

            if (obj.mobileNumber) {
               const phoneNumberRegex = /^[0-9]*$/; // Regular expression to match only numbers
               res = phoneNumberRegex.test(obj.mobileNumber.value);
               if (!res) {
                  mensaje("El número no es valido", "red");
                  return;
               }
            } else {
               return;
            }
            if (!obj.nombre.value) {
               mensaje("Introducir un nombre por favor", "red");
               return;
            }
            if (!obj.textareaModel.value) {
               mensaje("Indica en que te podriamos ayudar", "red");
               return;
            }
            const objetoBBDD = {
               username: obj.nombre.value,
               mobileNumber: obj.mobileNumber.value,
               email: obj.email.value,
               textareaModel: obj.textareaModel.value,
               notifications: true,
            };
            contactUser(objetoBBDD);
            obj.mobileNumber.value = "";
            obj.email.value = "";
            obj.nombre = "";
            obj.textareaModel = "";
            toggleAcept.value = false;
            dialogVisible.value = false;
            mensaje("Gracias por ponerte en contacto con nostros", "green");
         }
      }
      function mensaje(msg, color) {
         $q.notify({
            color: color,
            textColor: "white",
            message: msg,
         });
      }
      // to reset validations:
      function onReset() {
         nombre.value = null;
         email.value = null;
         toggleAcept.value = false;
      }
      return {
         dialogVisible,
         onReset,
         onSubmit,
         mensaje,
         obj,
         toggleAcept,
         myForm,
      };
   },
});
</script>
