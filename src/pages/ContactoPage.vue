<template>
   <q-layout view="lHh Lpr lFf">
      <HeaderLayout
         :is-authenticated="isAuthenticated()"
         :usuario-logineado="usuarioLogineado"
         @login="loginearUsuario"
         @logout="logOut"
      />

      <Footer_Layout />
      <q-page-container style="min-height: 100vh; text-align: center">
         <div class="q-pa-md q-gutter-md">
            <div class="row justify-between">
               <div
                  style="
                     position: relative;
                     width: 100%;
                     height: 30vh;
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
                        background-color: rgba(0, 0, 0, 0.5);
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
                     <h1
                        class="text-white text-bold"
                        style="
                           font-size: clamp(1.5rem, 4vw, 2.5rem);
                           line-height: 1.2;
                        "
                     >
                        Contacta con nosotros y sé el primero <br />
                        en conocer las novedades.
                     </h1>
                  </div>
               </div>
            </div>
         </div>

         <div style="padding: 20px">
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
                        En <b>[Tu nombre tienda]</b>, nos tomamos en serio su
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
                        v-model="formData.nombre"
                        label="Tu nombre *"
                     />

                     <q-input
                        outlined
                        type="email"
                        v-model="formData.email"
                        label="Tu Email *"
                        lazy-rules
                     />
                     <q-input
                        outlined
                        type="tel"
                        v-model="formData.mobileNumber"
                        label="Tu Número de Teléfono"
                        class="q-mb-md md:q-mb-0"
                     />
                     <q-input
                        v-model="formData.textareaModel"
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
                           type="submit"
                           color="primary"
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
                     Estamos en: [ Aqui va tu tu ubicación... ],
                     <br />
                     Contactar al Teléfono: tu telefono de contacto <br />
                     Lunes - Viernes: 8:30h - 19:30h<br />
                     Sábado: 9:00h - 13:30h
                  </h5>
               </div>

               <q-card flat bordered class="q-mt-md">
                  <q-card-section class="text-h6 text-bold">
                     Nuestra Ubicación ....
                  </q-card-section>

                  <iframe
                     src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3612.987654321098!2d55.30456787545768!3d25.098765477769126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f432109876543%3A0x1c0bf6bce5f2f8b5!2sDowntown%20Dubai%2C%20Dubai!5e0!3m2!1ses!2ses!4v1690000000000!5m2!1ses!2ses"
                     style="
                        border: 0;
                        width: 100%;
                        height: 400px;
                        border-radius: 8px;
                     "
                     allowfullscreen=""
                     loading="lazy"
                     referrerpolicy="no-referrer-when-downgrade"
                  ></iframe>
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

         <router-view />
      </q-page-container>
   </q-layout>
</template>

<style>
body.body--dark {
   background: #0c0c0c;
}
</style>

<script>
/* import FloatingChatButtons from "components/FloatingChatButtons.vue"; */

import { authMixin } from "../mixins/authMixin";
import Footer_Layout from "src/layouts/Footer_Layout.vue";
import { defineComponent, ref, onMounted, computed } from "vue";
import { useQuasar, Notify } from "quasar";
import { useRouter } from "vue-router";
import InputUser from "components/InputUser.vue";
import loginUser from "src/components/loginUser.vue";
import store from "../../src/store";
import contactUser from "src/composable/contactUser";
import HeaderLayout from "components/HeaderComponent.vue";

export default defineComponent({
   name: "ContactoPage",
   mixins: [authMixin],

   components: {
      InputUser,
      loginUser,
      Footer_Layout,
      HeaderLayout,
   },

   setup(props, context) {
      const $q = useQuasar();
      const router = useRouter();

      // Acceder a los métodos del mixin a través de 'this'
      // Pero en setup() no tenemos 'this', así que necesitamos una alternativa

      // Refs reactivas
      const myForm = ref(null);
      const showInputUser = ref(false);
      const showLoginUser = ref(false);
      const userId = ref(null);
      const modelSelectedMenu = ref("coches");

      const formData = ref({
         textareaModel: "",
         nombre: "",
         mobileNumber: "",
         email: "",
      });

      const toggleAcept = ref(false);
      const dialogVisible = ref(false);

      // Métodos
      const handleDialogClose = () => {
         showLoginUser.value = false;
         showInputUser.value = false;
      };

      const nuevoUsuario = () => {
         showInputUser.value = true;
      };

      const loginearUsuario = () => {
         showLoginUser.value = true;
      };

      const logOut = async () => {
         await store.dispatch("logout");
         Notify.create({
            type: "positive",
            message: "Adiós",
         });
         router.push({ name: "principal-coches" });
      };

      const mensaje = (msg, color) => {
         $q.notify({
            color: color,
            textColor: "white",
            message: msg,
         });
      };

      const onSubmit = () => {
         debugger;
         if (!toggleAcept.value) {
            mensaje("Debes aceptar los términos y condiciones", "red");
            return;
         }

         if (!formData.value.nombre?.trim()) {
            mensaje("Introducir un nombre por favor", "red");
            return;
         }

         if (!formData.value.email) {
            mensaje("El email es obligatorio", "red");
            return;
         }

         const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
         if (!emailRegex.test(formData.value.email)) {
            mensaje("El email no es válido", "red");
            return;
         }

         if (formData.value.mobileNumber) {
            const phoneNumberRegex = /^[0-9]*$/;
            if (!phoneNumberRegex.test(formData.value.mobileNumber)) {
               mensaje("El número no es válido", "red");
               return;
            }
         }

         if (!formData.value.textareaModel?.trim()) {
            mensaje("Indica en qué te podríamos ayudar", "red");
            return;
         }

         const objetoBBDD = {
            username: formData.value.nombre.trim(),
            mobileNumber: formData.value.mobileNumber,
            email: formData.value.email,
            textareaModel: formData.value.textareaModel.trim(),
            notifications: true,
         };

         const datosEnviados = contactUser(objetoBBDD);
         if (datosEnviados) {
            mensaje("Datos guardados", "green");
         } else {
            mensaje("Error al guardadr los datos", "red");
         }
         formData.value = {
            textareaModel: "",
            nombre: "",
            mobileNumber: "",
            email: "",
         };
         toggleAcept.value = false;
         dialogVisible.value = false;

         mensaje("Gracias por ponerte en contacto con nosotros", "green");
      };

      const onReset = () => {
         formData.value = {
            textareaModel: "",
            nombre: "",
            mobileNumber: "",
            email: "",
         };
         toggleAcept.value = false;
      };

      onMounted(() => {
         // Código que estaba en mounted()
      });

      return {
         // Refs
         myForm,
         showInputUser,
         showLoginUser,
         userId,
         modelSelectedMenu,
         formData,
         toggleAcept,
         dialogVisible,

         // Métodos
         handleDialogClose,
         nuevoUsuario,
         loginearUsuario,
         logOut,
         mensaje,
         onSubmit,
         onReset,
      };
   },
});
</script>
