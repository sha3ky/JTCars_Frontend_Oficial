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
                     <router-link to="/">
                        <q-item clickable>
                           <q-item-section>Coches</q-item-section>
                        </q-item>
                     </router-link>
                     <router-link to="/contacto">
                        <q-item clickable>
                           <q-item-section>Contacto</q-item-section>
                        </q-item>
                     </router-link>
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
                        <q-btn
                           class="glossy"
                           style="color: #1aee9f"
                           clickable
                           rounded
                        >
                           <q-item-section>Coches</q-item-section>
                        </q-btn>
                     </router-link>
                     <router-link to="/contacto">
                        <q-btn
                           class="glossy"
                           style="color: #1aee9f; margin-left: 10px"
                           clickable
                           rounded
                        >
                           <q-item-section>Contacto</q-item-section>
                        </q-btn>
                     </router-link>
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
            <q-toggle
               color="red"
               dark
               v-model="toggleDark"
               @click="toggleDarkMode"
            />
         </q-toolbar>
      </q-header>
      <q-footer elevated class="bg-blue-grey-9">
         <q-toolbar>
            <q-toolbar-title style="text-align: center"
               >Made with
               <span
                  ><q-img src="/lovePng.png" width="50px" height="50px"></q-img
               ></span>
               by Sha3ky's TEAM</q-toolbar-title
            >
         </q-toolbar>
      </q-footer>
      <q-page-container style="min-height: 100vh; text-align: center">
         <q-img
            src="/banner.png"
            class="q-mx-auto"
            :max-width="400"
            :max-height="225"
            alt="Beny1 Logo"
            style="opacity: 0.7;"

         >
         </q-img>
         <div style="padding: 40px">
            <div>
               <h2 style="margin: 10px">
                  Contacta con nosotros y serás el primero <br />
                  en enterarte las las novedades
               </h2>
            </div>
            <div>
               <div
                  class="q-pa-md"
                  style="
                     display: flex;
                     justify-content: center;
                     border: 2px solid #787575;
                     padding: 20px;
                  "
               >
                  <q-form
                     @submit="onSubmit"
                     @reset="onReset"
                     class="q-gutter-md"
                  >
                     <q-input
                        outlined
                        v-model="nombre"
                        label="Tu nombre *"
                        hint="Nombre y Apellido"
                        lazy-rules
                        :rules="[
                           (val) =>
                              (val && val.length > 0) ||
                              'Por favor introduce el nombre',
                        ]"
                     />

                     <q-input
                        outlined
                        type="email"
                        v-model="email"
                        label="Tu Email *"
                        lazy-rules
                        :rules="[
                           (val) => {
                              if (!val) return 'Por favor introduce tu email';
                              const emailRegex =
                                 /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
                              return (
                                 emailRegex.test(val) ||
                                 'Este email no es válido'
                              );
                           },
                        ]"
                     />
                     <q-input
                        outlined
                        type="tel"
                        v-model="mobileNumber"
                        label="Tu Número de Teléfono"
                        lazy-rules
                        :rules="[
                           (val) => {
                              if (!val) return 'Por favor un número válido ';
                              const phoneNumberRegex = /^[0-9]*$/; // Regular expression to match only numbers
                              if (phoneNumberRegex.test(val)) {
                                 return true; // It's a valid phone number
                              }
                              return 'Este número no es valido';
                           },
                        ]"
                        class="q-mb-md md:q-mb-0"
                     />

                     <q-toggle
                        v-model="toggleAcept"
                        label="Acepto envio de novedades"
                     />

                     <div>
                        <q-btn
                           label="Aceptar"
                           type="aceptar"
                           glossy
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

            <div>
               <h2 style="margin: 10px">
                  Estamos en Cubelles <br />
                  Carrer Maestrat número 3
               </h2>
            </div>
            <div
               style="
                  display: flex;
                  justify-content: center;
                  border: 2px solid #787575;
                  padding: 20px;
               "
            >
               <iframe
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d909.7966577374251!2d1.6512922696582077!3d41.19919300728751!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDHCsDExJzU3LjEiTiAxwrAzOScwNy4wIkU!5e1!3m2!1ses!2ses!4v1698127089612!5m2!1ses!2ses"
                  width="800"
                  height="650"
                  style="border: 0"
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
               ></iframe>
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
         <router-view />
      </q-page-container>
   </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";
import { RouterView, RouterLink } from "vue-router";
import InputUser from "components/InputUser.vue"; // Replace with the actual path
import loginUser from "src/components/loginUser.vue";
export default defineComponent({
   name: "ContactoPage",
   data() {
      return {
         //  correo: "",

         showInputUser: false, // Initialize showInputUser to control InputUser component
         showLoginUser: false,
         userId: null,
         userIsAdmin: false,
         toggleDark: ref(false),
         modelSelectedMenu: ref("coches"),
         optionsMenu: [
            { label: "Coches", value: "coches" },
            // { label: "Ofertas", value: "ofertas" },
            { label: "Contacto", value: "contacto" },
         ],
         imageUrls: [
            "https://cdn.quasar.dev/img/parallax1.jpg",
            "https://cdn.quasar.dev/img/parallax2.jpg",
            "https://cdn.quasar.dev/img/parallax1.jpg",
            "https://cdn.quasar.dev/img/parallax2.jpg",
            "https://cdn.quasar.dev/img/parallax1.jpg",
            "https://cdn.quasar.dev/img/parallax2.jpg",
            "https://cdn.quasar.dev/img/parallax1.jpg",
            "https://cdn.quasar.dev/img/parallax2.jpg",
         ],
         expanded: false,
         lorem: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
         // Initialize with your desired value
      };
   },
   //  watch: {
   //     modelSelectedMenu: function (item) {
   //        debugger;
   //        item;
   //     },
   //},
   methods: {
      handleDialogClose() {
         debugger;
         this.showLoginUser = false; // Set showLoginUser to false when the dialog is closed
         this.showInputUser = false;
      },
      nuevoUsuario() {
         debugger;
         this.showInputUser = true;
         //this.showLoginUser = false;
      },
      loginearUsuario() {
         debugger;
         this.showLoginUser = true;
         //this.showInputUser = false;
      },
      toggleDarkMode() {
         const $q = this.$q;
         $q.dark.toggle();
      },
   },
   mounted() {},
   components: {
      InputUser,
      loginUser,
   },

   setup() {
      const myForm = ref(null);
      const $q = useQuasar();
      $q.dark.set(true); // or false or "auto"
      $q.dark.toggle(); // toggle
      const nombre = ref(null);
      const email = ref(null);
      const mobileNumber = ref(null);
      const toggleAcept = ref(false);
      const dialogVisible = ref(false);

      function onSubmit() {
         $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Gracias por subscribirte",
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
         nombre,
         email,
         toggleAcept,
         myForm,
         mobileNumber,
      };
   },
});
</script>
