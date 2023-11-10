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
                     <router-link to="/extra">
                        <q-item clickable>
                           <q-item-section>Extra</q-item-section>
                        </q-item>
                     </router-link>
                     <template v-if="userIsAdmin">
                        <router-link to="/admin">
                           <q-item clickable>
                              <q-item-section>Admin</q-item-section>
                           </q-item>
                        </router-link>
                     </template>
                     <template v-if="sessionData">
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
                        <q-btn style="color: #1aee9f" clickable rounded>
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
                     <router-link to="/extra">
                        <q-btn
                           style="color: #1aee9f; margin-left: 10px"
                           clickable
                           rounded
                        >
                           <q-item-section>Noticias</q-item-section>
                        </q-btn>
                     </router-link>
                     <template v-if="sessionData">
                        <router-link to="/usuarioPage">
                           <q-btn
                              style="color: #f11212; margin-left: 10px"
                              clickable
                              rounded
                           >
                              <q-item-section>Mis Datos</q-item-section>
                           </q-btn>
                        </router-link>
                     </template>
                     <template v-if="userIsAdmin">
                        <router-link to="/admin">
                           <q-btn
                              style="color: #f11212; margin-left: 10px"
                              clickable
                              rounded
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
      <Footer_Layout />
      <q-page-container style="min-height: 100vh; text-align: center">
         <q-img
            src="/banner1WebP.webp"
            class="q-mx-auto"
            :max-width="400"
            :max-height="225"
            alt="Beny1 Logo"
         >
         </q-img>
         <div style="padding: 20px">
            <div>
               <h4 style="margin: 10px">
                  Contacta con nosotros y serás el primero <br />
                  en enterarte las las novedades
               </h4>
            </div>
            <div>
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
                     <h5>En <b>Benny's Cars</b>, nos tomamos en serio su satisfacción.<br>
                      Estamos comprometidos a brindarle no solo un coche, sino una experiencia <br>
                       confiable y placentera. Su felicidad al conducir es nuestra prioridad número uno.</h5>
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
                           glossy
                           style="color: #1aee9f"
                           rounded
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
                  display: flex;
                  justify-content: center;
                  border: 2px solid #787575;
                  padding: 10px;
                  border-radius: 15px;
               "
            >
               <div>
                  <h5 style="margin: 10px">
                     Estamos en Cubelles, Carrer Maestrat número 3 <br />
                     Contactar al Teléfono: 614103736 / 722411324 <br />
                     Lunes - Viernes: 9.00-20:00h<br />
                     Sabado : 10.00 - 15.00h
                  </h5>
               </div>
               <div>
                  <iframe
                     src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d909.7966577374251!2d1.6512922696582077!3d41.19919300728751!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDHCsDExJzU3LjEiTiAxwrAzOScwNy4wIkU!5e1!3m2!1ses!2ses!4v1698127089612!5m2!1ses!2ses"
                     style="border: 0"
                     allowfullscreen=""
                     loading="lazy"
                     referrerpolicy="no-referrer-when-downgrade"
                  ></iframe>
               </div>
            </div>
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
/* .body--{
  background-color: beige;
} */
body.body--dark {
   background: #0c0c0c;
}
</style>
<script>
import Footer_Layout from "src/layouts/Footer_Layout.vue";
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";
import { RouterView, RouterLink } from "vue-router";
import InputUser from "components/InputUser.vue"; // Replace with the actual path
import loginUser from "src/components/loginUser.vue";
import store from "../../src/store";
import logout from "src/composable/logOut";
import contactUser from "src/composable/contactUser";
// import toggleDarkMode from "src/composable/toggleDark";
import { Notify } from "quasar";
export default defineComponent({
   name: "ContactoPage",
   data() {
      return {
         //  correo: "",
         sessionData: "",
         usuarioName: "",
         showInputUser: false, // Initialize showInputUser to control InputUser component
         showLoginUser: false,
         userId: null,
         userIsAdmin: false,
         toggleDark: false,
         modelSelectedMenu: ref("coches"),
         usuarioLogineado: "",
      };
   },

   mounted() {
      this.sessionData = store.state.sessionData;
      this.usuarioLogineado = store.state.name;
      this.userIsAdmin = store.state.isAdmin
         ? store.state.isAdmin
         : this.userIsAdmin;
      this.toggleDark = store.state.toggleDarkMode
         ? store.state.toggleDarkMode
         : this.toggleDark;
   },
   methods: {
      updateUsuarioLogineado(bool) {
         if (bool) {
            this.usuarioLogineado = store.state.name;
            this.sessionData = store.state.sessionData;
            this.userIsAdmin = store.state.isAdmin;
         }
      },
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
      toggleDarkMode() {
         const $q = this.$q;
         $q.dark.toggle();
         store.state.toggleDarkMode = this.toggleDark;
      },
      async logOut() {
         const result = await logout();
         if (result) {
            store.dispatch("logout");
            this.usuarioLogineado = "";
            this.sessionData = "";
            this.userIsAdmin = false;
            Notify.create({
               type: "positive",
               message: "Adios.",
            });
            this.$router.push({ name: "principal-coches" });
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
      Footer_Layout,
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
