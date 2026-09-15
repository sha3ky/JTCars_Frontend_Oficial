<template>
   <q-layout view="lHh Lpr lFf">
      <HeaderLayout
         :is-authenticated="isAuthenticated()"
         :usuario-logineado="usuarioLogineado"
         @login="loginearUsuario"
         @logout="logOut"
      />

      <Footer_Layout />

      <q-page-container class="contacto-page">
         <!-- ============================================================
              HERO
              ============================================================ -->
         <section class="contacto-hero">
            <img src="/contactar.webp" alt="Contacto" class="hero-bg" />
            <div class="hero-overlay" aria-hidden="true"></div>
            <div class="hero-gold-line" aria-hidden="true"></div>

            <div class="hero-content">
               <div class="hero-eyebrow">
                  <span class="luxe-dot"></span>
                  <span>Ponte en contacto</span>
                  <span class="luxe-dot"></span>
               </div>
               <h1 class="hero-title">
                  Contacta con nosotros y sé el primero
                  <br />
                  en conocer las <em>novedades</em>.
               </h1>
            </div>
         </section>

         <!-- ============================================================
              CUERPO
              ============================================================ -->
         <div class="contacto-body">
            <!-- FORMULARIO -->
            <section class="luxe-card">
               <div class="luxe-card__glow" aria-hidden="true"></div>
               <div class="luxe-card__top-line" aria-hidden="true"></div>

               <header class="luxe-card__header">
                  <div class="luxe-eyebrow">
                     <span class="luxe-dot"></span>
                     <span>Nuestro compromiso</span>
                     <span class="luxe-dot"></span>
                  </div>
                  <h2 class="luxe-title">
                     En <em>[Tu nombre tienda]</em> nos tomamos en serio su
                     satisfacción
                  </h2>
                  <p class="luxe-lead">
                     Estamos comprometidos a brindarle no solo un coche, sino
                     una experiencia confiable y placentera. Su felicidad al
                     conducir es nuestra prioridad número uno.
                  </p>
               </header>

               <q-form
                  @submit="onSubmit"
                  @reset="onReset"
                  class="q-gutter-md luxe-form"
               >
                  <q-input
                     v-model="formData.nombre"
                     label="Tu nombre *"
                     class="luxe-input"
                     filled
                     borderless
                  />

                  <q-input
                     type="email"
                     v-model="formData.email"
                     label="Tu Email *"
                     lazy-rules
                     class="luxe-input"
                     filled
                     borderless
                  />

                  <q-input
                     type="tel"
                     v-model="formData.mobileNumber"
                     label="Tu Número de Teléfono"
                     class="luxe-input q-mb-md md:q-mb-0"
                     filled
                     borderless
                  />

                  <q-input
                     v-model="formData.textareaModel"
                     filled
                     clearable
                     type="textarea"
                     label="Si buscas algo en particular ..."
                     hint="O si tienes dudas"
                     class="luxe-input"
                     borderless
                  />

                  <div class="luxe-toggle-wrapper">
                     <q-toggle
                        v-model="toggleAcept"
                        label="Acepto el envío de novedades"
                        class="luxe-toggle"
                     />
                  </div>

                  <div class="luxe-form__actions">
                     <q-btn
                        label="Enviar"
                        type="submit"
                        no-caps
                        unelevated
                        class="luxe-btn luxe-btn--primary"
                     />
                     <q-btn
                        label="Reset"
                        type="reset"
                        no-caps
                        flat
                        class="luxe-btn luxe-btn--ghost"
                     />
                  </div>
               </q-form>
            </section>

            <!-- INFO + MAPA -->
            <section class="luxe-card luxe-card--info">
               <div class="luxe-card__glow" aria-hidden="true"></div>
               <div class="luxe-card__top-line" aria-hidden="true"></div>

               <header class="luxe-card__header">
                  <div class="luxe-eyebrow">
                     <span class="luxe-dot"></span>
                     <span>Visítanos</span>
                     <span class="luxe-dot"></span>
                  </div>
                  <h2 class="luxe-title">Estamos en <em>tu ciudad</em></h2>
               </header>

               <ul class="luxe-info-list">
                  <li>
                     <q-icon name="place" size="16px" />
                     <span class="label">Dirección</span>
                     <span class="value">[Aquí va tu ubicación...]</span>
                  </li>
                  <li>
                     <q-icon name="phone" size="16px" />
                     <span class="label">Teléfono</span>
                     <span class="value">tu teléfono de contacto</span>
                  </li>
                  <li>
                     <q-icon name="schedule" size="16px" />
                     <span class="label">Lunes – Viernes</span>
                     <span class="value">8:30h – 19:30h</span>
                  </li>
                  <li>
                     <q-icon name="schedule" size="16px" />
                     <span class="label">Sábado</span>
                     <span class="value">9:00h – 13:30h</span>
                  </li>
               </ul>

               <div class="luxe-map-wrapper">
                  <iframe
                     src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3612.987654321098!2d55.30456787545768!3d25.098765477769126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f432109876543%3A0x1c0bf6bce5f2f8b5!2sDowntown%20Dubai%2C%20Dubai!5e0!3m2!1ses!2ses!4v1690000000000!5m2!1ses!2ses"
                     class="luxe-map"
                     allowfullscreen=""
                     loading="lazy"
                     referrerpolicy="no-referrer-when-downgrade"
                  ></iframe>
               </div>
            </section>
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

<style scoped>
/* ============================================================
   PÁGINA
   ============================================================ */
.contacto-page {
   overflow-x: hidden;
}

/* ============================================================
   HERO
   ============================================================ */
.contacto-hero {
   position: relative;
   width: 100%;
   height: 42vh;
   min-height: 300px;
   overflow: hidden;
   border-bottom: 1px solid rgba(212, 175, 55, 0.35);
}

.hero-bg {
   position: absolute;
   inset: 0;
   width: 100%;
   height: 100%;
   object-fit: cover;
   object-position: center 60%;
   z-index: 1;
   animation: subtleZoom 24s ease-in-out infinite;
}

@keyframes subtleZoom {
   0%,
   100% {
      transform: scale(1);
   }
   50% {
      transform: scale(1.08);
   }
}

.hero-overlay {
   position: absolute;
   inset: 0;
   background: linear-gradient(
      180deg,
      rgba(15, 23, 32, 0.7) 0%,
      rgba(15, 23, 32, 0.55) 40%,
      rgba(15, 23, 32, 0.9) 100%
   );
   z-index: 2;
   pointer-events: none;
}

.hero-gold-line {
   position: absolute;
   bottom: 0;
   left: 0;
   right: 0;
   height: 2px;
   background: linear-gradient(
      90deg,
      transparent,
      rgba(212, 175, 55, 0.6),
      rgba(245, 230, 168, 0.95),
      rgba(212, 175, 55, 0.6),
      transparent
   );
   background-size: 200% 100%;
   animation: goldFlow 6s ease-in-out infinite;
   z-index: 3;
}

@keyframes goldFlow {
   0%,
   100% {
      background-position: 0% 50%;
   }
   50% {
      background-position: 100% 50%;
   }
}

.hero-content {
   position: relative;
   z-index: 3;
   height: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   text-align: center;
   padding: 0 20px;
   color: #f5f5f5;
}

.hero-eyebrow {
   display: inline-flex;
   align-items: center;
   gap: 10px;
   color: #d4af37;
   font-size: 11px;
   font-weight: 600;
   letter-spacing: 4px;
   text-transform: uppercase;
   margin-bottom: 14px;
}

.luxe-dot {
   width: 4px;
   height: 4px;
   border-radius: 50%;
   background: #d4af37;
   box-shadow: 0 0 10px #d4af37;
}

.hero-title {
   margin: 0;
   font-family: "Playfair Display", "Times New Roman", serif;
   font-weight: 400;
   font-style: italic;
   font-size: clamp(24px, 4vw, 46px);
   line-height: 1.15;
   letter-spacing: -0.5px;
   max-width: 900px;
   text-shadow: 0 4px 30px rgba(0, 0, 0, 0.7);
}

.hero-title em {
   font-style: italic;
   background: linear-gradient(90deg, #d4af37 0%, #f5e6a8 50%, #d4af37 100%);
   background-size: 200% auto;
   -webkit-background-clip: text;
   background-clip: text;
   -webkit-text-fill-color: transparent;
   animation: goldShimmer 5s linear infinite;
}

@keyframes goldShimmer {
   0% {
      background-position: 0% center;
   }
   100% {
      background-position: 200% center;
   }
}

/* ============================================================
   CUERPO
   ============================================================ */
.contacto-body {
   max-width: 900px;
   margin: 0 auto;
   padding: 50px 20px 80px;
   display: flex;
   flex-direction: column;
   gap: 32px;
}

/* ============================================================
   TARJETA LUXE
   ============================================================ */
.luxe-card {
   position: relative;
   background: linear-gradient(160deg, #0f1720 0%, #1a2332 100%);
   border: 1px solid rgba(212, 175, 55, 0.35);
   border-radius: 14px;
   padding: 40px 36px;
   color: #e0e6ed;
   box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35),
      inset 0 0 0 1px rgba(212, 175, 55, 0.08);
   overflow: hidden;
}

.luxe-card__glow {
   position: absolute;
   inset: 0;
   background: radial-gradient(
      ellipse at top center,
      rgba(212, 175, 55, 0.1),
      transparent 55%
   );
   pointer-events: none;
   z-index: 0;
}

.luxe-card__top-line {
   position: absolute;
   top: 0;
   left: 0;
   right: 0;
   height: 2px;
   background: linear-gradient(
      90deg,
      transparent,
      rgba(212, 175, 55, 0.7),
      rgba(245, 230, 168, 1),
      rgba(212, 175, 55, 0.7),
      transparent
   );
   background-size: 200% 100%;
   animation: goldFlow 6s ease-in-out infinite;
   z-index: 3;
   pointer-events: none;
}

.luxe-card > *:not(.luxe-card__glow):not(.luxe-card__top-line) {
   position: relative;
   z-index: 2;
}

/* ============================================================
   CABECERA DE TARJETA
   ============================================================ */
.luxe-card__header {
   text-align: center;
   margin-bottom: 28px;
}

.luxe-eyebrow {
   display: inline-flex;
   align-items: center;
   gap: 10px;
   color: #d4af37;
   font-size: 10px;
   font-weight: 600;
   letter-spacing: 4px;
   text-transform: uppercase;
   margin-bottom: 12px;
}

.luxe-title {
   margin: 0 0 14px;
   font-family: "Playfair Display", "Times New Roman", serif;
   font-style: italic;
   font-weight: 500;
   font-size: clamp(22px, 3vw, 32px);
   line-height: 1.2;
   color: #f5e6a8;
   letter-spacing: -0.3px;
   text-shadow: 0 2px 20px rgba(212, 175, 55, 0.25);
}

.luxe-title em {
   font-style: italic;
   background: linear-gradient(90deg, #d4af37 0%, #f5e6a8 50%, #d4af37 100%);
   background-size: 200% auto;
   -webkit-background-clip: text;
   background-clip: text;
   -webkit-text-fill-color: transparent;
}

.luxe-lead {
   margin: 0 auto;
   max-width: 640px;
   color: #cfd8dc;
   font-size: 14px;
   line-height: 1.7;
   opacity: 0.9;
}

/* ============================================================
   INPUTS LUXE
   ============================================================ */
:deep(.luxe-input .q-field__control) {
   background: rgba(255, 255, 255, 0.03) !important;
   border: 1px solid rgba(212, 175, 55, 0.25) !important;
   border-radius: 8px !important;
   color: #e0e6ed !important;
   transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
   padding: 0 14px;
}

:deep(.luxe-input .q-field__control:hover) {
   border-color: rgba(212, 175, 55, 0.5) !important;
}

:deep(.luxe-input.q-field--focused .q-field__control) {
   border-color: #d4af37 !important;
   box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.15),
      inset 0 0 12px rgba(212, 175, 55, 0.05);
}

:deep(.luxe-input .q-field__native),
:deep(.luxe-input .q-field__input),
:deep(.luxe-input textarea) {
   color: #e0e6ed !important;
   font-size: 14px;
}

:deep(.luxe-input .q-field__label) {
   color: rgba(212, 175, 55, 0.75) !important;
   font-size: 11px;
   font-weight: 600;
   letter-spacing: 2px;
   text-transform: uppercase;
}

:deep(.luxe-input.q-field--focused .q-field__label) {
   color: #d4af37 !important;
}

:deep(.luxe-input .q-field__native::placeholder),
:deep(.luxe-input textarea::placeholder) {
   color: rgba(207, 216, 220, 0.35) !important;
   font-style: italic;
}

:deep(.luxe-input .q-field__bottom) {
   color: rgba(212, 175, 55, 0.6) !important;
   font-size: 10px;
   letter-spacing: 1.5px;
   text-transform: uppercase;
}

:deep(.luxe-input .q-field__append .q-icon),
:deep(.luxe-input .q-field__control .q-icon) {
   color: #d4af37 !important;
}

/* ============================================================
   TOGGLE
   ============================================================ */
.luxe-toggle-wrapper {
   display: flex;
   justify-content: center;
   padding: 6px 0 4px;
}

:deep(.luxe-toggle .q-toggle__label) {
   color: #cfd8dc;
   font-size: 12px;
   letter-spacing: 1.2px;
   text-transform: uppercase;
   font-weight: 500;
}

:deep(.luxe-toggle .q-toggle__inner--truthy .q-toggle__track) {
   background: rgba(212, 175, 55, 0.4) !important;
}

:deep(.luxe-toggle .q-toggle__inner--truthy .q-toggle__thumb) {
   color: #d4af37 !important;
}

/* ============================================================
   ACCIONES FORMULARIO
   ============================================================ */
.luxe-form__actions {
   display: flex;
   justify-content: center;
   gap: 12px;
   margin-top: 20px;
   flex-wrap: wrap;
}

:deep(.luxe-btn) {
   position: relative;
   border-radius: 6px;
   font-weight: 600;
   letter-spacing: 2px;
   text-transform: uppercase;
   font-size: 11px;
   padding: 10px 26px;
   min-height: 44px;
   overflow: hidden;
   transition: all 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}

:deep(.luxe-btn::before) {
   content: "";
   position: absolute;
   inset: 0;
   transform: translateY(101%);
   transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
   z-index: 0;
}

:deep(.luxe-btn .q-btn__content) {
   position: relative;
   z-index: 1;
   transition: color 0.35s ease;
}

/* — Primario (Enviar) — */
:deep(.luxe-btn--primary) {
   color: #e6c877 !important;
   background: linear-gradient(135deg, #141c26, #1a2430) !important;
   border: 1px solid rgba(212, 175, 55, 0.55);
   box-shadow: inset 0 0 0 1px rgba(212, 175, 55, 0.12);
}

:deep(.luxe-btn--primary::before) {
   background: linear-gradient(180deg, #d4af37, #b8860b);
}

:deep(.luxe-btn--primary:hover::before) {
   transform: translateY(0);
}

:deep(.luxe-btn--primary:hover) {
   color: #0f1720 !important;
   border-color: #d4af37;
   transform: translateY(-2px);
   box-shadow: inset 0 0 0 1px rgba(212, 175, 55, 0.4),
      0 10px 30px rgba(212, 175, 55, 0.35), 0 0 20px rgba(212, 175, 55, 0.25);
}

:deep(.luxe-btn--primary:hover .q-btn__content) {
   color: #0f1720 !important;
}

/* — Ghost (Reset) — */
:deep(.luxe-btn--ghost) {
   color: #cfd8dc !important;
   background: transparent !important;
   border: 1px solid rgba(207, 216, 220, 0.25);
}

:deep(.luxe-btn--ghost::before) {
   background: linear-gradient(180deg, #37474f, #263238);
}

:deep(.luxe-btn--ghost:hover) {
   color: #ffffff !important;
   border-color: rgba(207, 216, 220, 0.55);
   transform: translateY(-2px);
}

:deep(.luxe-btn--ghost:hover .q-btn__content) {
   color: #ffffff !important;
}

/* ============================================================
   TARJETA INFO + MAPA
   ============================================================ */
.luxe-info-list {
   list-style: none;
   padding: 0;
   margin: 0 0 24px;
   display: grid;
   gap: 12px;
}

.luxe-info-list li {
   display: grid;
   grid-template-columns: 24px auto 1fr;
   gap: 12px;
   align-items: baseline;
   padding: 10px 14px;
   background: rgba(255, 255, 255, 0.03);
   border-left: 2px solid rgba(212, 175, 55, 0.5);
   border-radius: 6px;
   transition: all 0.3s ease;
}

.luxe-info-list li:hover {
   background: rgba(212, 175, 55, 0.08);
   border-left-color: #d4af37;
   transform: translateX(4px);
}

.luxe-info-list .q-icon {
   color: #d4af37 !important;
   opacity: 0.9;
   align-self: center;
}

.luxe-info-list .label {
   font-size: 10px;
   font-weight: 600;
   letter-spacing: 2px;
   text-transform: uppercase;
   color: rgba(212, 175, 55, 0.75);
}

.luxe-info-list .value {
   color: #f5e6a8;
   font-size: 14px;
   font-weight: 500;
   letter-spacing: 0.3px;
}

.luxe-map-wrapper {
   position: relative;
   border-radius: 10px;
   overflow: hidden;
   border: 1px solid rgba(212, 175, 55, 0.35);
   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
}

.luxe-map {
   display: block;
   border: 0;
   width: 100%;
   height: 400px;
   filter: grayscale(0.35) contrast(1.05);
   transition: filter 0.5s ease;
}

.luxe-map-wrapper:hover .luxe-map {
   filter: grayscale(0) contrast(1);
}

/* ============================================================
   RESPONSIVE
   ============================================================ */
@media (max-width: 599px) {
   .contacto-hero {
      height: 36vh;
      min-height: 260px;
   }

   .contacto-body {
      padding: 30px 14px 60px;
      gap: 24px;
   }

   .luxe-card {
      padding: 28px 20px;
      border-radius: 12px;
   }

   .luxe-card__header {
      margin-bottom: 22px;
   }

   .luxe-form__actions {
      flex-direction: column;
   }

   :deep(.luxe-btn) {
      width: 100%;
   }

   .luxe-map {
      height: 260px;
   }

   .luxe-info-list li {
      grid-template-columns: 22px 1fr;
      gap: 8px 10px;
   }

   .luxe-info-list .value {
      grid-column: 2 / -1;
      font-size: 13px;
   }
}

/* ♿ Accesibilidad */
@media (prefers-reduced-motion: reduce) {
   .hero-bg,
   .hero-gold-line,
   .hero-title em,
   .luxe-card__top-line,
   :deep(.luxe-btn),
   :deep(.luxe-btn::before),
   .luxe-info-list li {
      animation: none !important;
      transition: none !important;
   }
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
