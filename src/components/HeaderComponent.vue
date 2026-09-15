<template>
   <q-header elevated class="app-header">
      <q-toolbar class="header-toolbar">
         <!-- ✨ EFECTO DE BRILLO ANIMADO -->
         <div class="header-glow" aria-hidden="true"></div>
         <!-- ✨ LÍNEA DORADA INFERIOR -->
         <div class="header-gold-line" aria-hidden="true"></div>

         <!-- MENÚ HAMBURGUESA (Móvil) -->
         <q-btn
            flat
            round
            dense
            icon="menu"
            class="q-mr-sm menu-btn"
            v-if="$q.screen.width < 899"
         >
            <q-menu
               transition-show="flip-right"
               transition-hide="flip-left"
               class="mobile-menu"
            >
               <q-list style="min-width: 220px" class="q-py-sm">
                  <router-link to="/home">
                     <q-item clickable v-ripple class="menu-item">
                        <q-item-section avatar>
                           <q-icon name="home" class="menu-icon" />
                        </q-item-section>
                        <q-item-section>Inicio</q-item-section>
                     </q-item>
                  </router-link>

                  <router-link to="/contacto">
                     <q-item clickable v-ripple class="menu-item">
                        <q-item-section avatar>
                           <q-icon name="contact_mail" class="menu-icon" />
                        </q-item-section>
                        <q-item-section>Contactar</q-item-section>
                     </q-item>
                  </router-link>

                  <template v-if="isAuthenticated">
                     <router-link to="/admin">
                        <q-item clickable v-ripple class="menu-item">
                           <q-item-section avatar>
                              <q-icon name="directions_car" class="menu-icon" />
                           </q-item-section>
                           <q-item-section>
                              <span class="menu-text">Garaje</span>
                           </q-item-section>
                        </q-item>
                     </router-link>
                  </template>

                  <template v-if="isAuthenticated">
                     <router-link to="/usuarioPage">
                        <q-item clickable v-ripple class="menu-item">
                           <q-item-section avatar>
                              <q-icon name="tune" class="menu-icon" />
                           </q-item-section>
                           <q-item-section>
                              <span class="menu-text">Opciones</span>
                           </q-item-section>
                        </q-item>
                     </router-link>
                  </template>

                  <q-separator class="q-my-sm mobile-separator" />
               </q-list>
            </q-menu>
         </q-btn>

         <!-- LOGO -->
         <q-separator
            vertical
            inset
            class="logo-separator"
            v-if="$q.screen.width < 599"
         />

         <router-link to="/home" class="logo-wrapper">
            <q-img
               height="70px"
               width="108px"
               class="logo-img"
               src="/logo.png"
            />
         </router-link>

         <q-space></q-space>

         <!-- NAVEGACIÓN DESKTOP -->
         <template v-if="$q.screen.width > 899">
            <div class="row items-center q-gutter-md nav-desktop">
               <router-link to="/home" class="nav-link">
                  <q-btn
                     unelevated
                     no-caps
                     icon="home"
                     label="Inicio"
                     class="nav-btn nav-btn--home"
                  />
               </router-link>

               <router-link to="/contacto" class="nav-link">
                  <q-btn
                     unelevated
                     no-caps
                     icon="contact_mail"
                     label="Contactar"
                     class="nav-btn nav-btn--contact"
                  />
               </router-link>

               <template v-if="isAuthenticated">
                  <router-link to="/admin" class="nav-link">
                     <q-btn
                        unelevated
                        no-caps
                        icon="directions_car"
                        label="Garaje"
                        class="nav-btn nav-btn--garage"
                     />
                  </router-link>
               </template>

               <template v-if="isAuthenticated">
                  <router-link to="/usuarioPage" class="nav-link">
                     <q-btn
                        unelevated
                        no-caps
                        icon="tune"
                        label="Opciones"
                        class="nav-btn nav-btn--options"
                     />
                  </router-link>
               </template>
            </div>
         </template>

         <q-space></q-space>

         <!-- SECCIÓN USUARIO -->
         <div class="row items-center q-gutter-sm user-section">
            <template v-if="!isAuthenticated">
               <q-btn
                  flat
                  round
                  dense
                  icon="login"
                  class="login-btn"
                  @click="$emit('login')"
               >
                  <q-tooltip class="tooltip-luxe">Iniciar sesión</q-tooltip>
               </q-btn>
            </template>

            <template v-else>
               <q-chip
                  dense
                  class="user-chip"
                  icon="account_circle"
                  color="transparent"
                  text-color="white"
               >
                  {{ usuarioLogineado }}
               </q-chip>

               <q-btn
                  flat
                  round
                  dense
                  @click="$emit('logout')"
                  icon="logout"
                  class="logout-btn"
               >
                  <q-tooltip class="tooltip-luxe">Salir</q-tooltip>
               </q-btn>
            </template>

            <dark-mode-toggle />
         </div>
      </q-toolbar>
      <router-view />
   </q-header>
</template>

<script>
import { defineComponent } from "vue";
import DarkModeToggle from "./DarkModeToggle.vue";
import { RouterView, RouterLink } from "vue-router";

export default defineComponent({
   name: "HeaderLayout",
   components: {
      DarkModeToggle,
   },
   props: {
      isAuthenticated: {
         type: Boolean,
         default: false,
      },
      usuarioLogineado: {
         type: String,
         default: "",
      },
   },
   emits: ["login", "logout"],
});
</script>

<style scoped>
/* ============================================================
   CONTENEDOR PRINCIPAL
   ============================================================ */
.app-header {
   background: linear-gradient(
      135deg,
      #1a2332 0%,
      #2c3e50 50%,
      #1a2332 100%
   ) !important;
   backdrop-filter: blur(12px);
   border-bottom: 1px solid rgba(255, 255, 255, 0.08);
   box-shadow: 0 4px 30px rgba(0, 0, 0, 0.4) !important;
}

.header-toolbar {
   position: relative;
   z-index: 2;
   min-height: 76px;
}

/* ✨ Efecto de brillo animado de fondo */
.header-glow {
   position: absolute;
   inset: 0;
   background: linear-gradient(
      90deg,
      transparent,
      rgba(100, 181, 246, 0.08),
      rgba(255, 152, 0, 0.06),
      transparent
   );
   background-size: 200% 100%;
   animation: shimmer 8s ease-in-out infinite;
   pointer-events: none;
}

@keyframes shimmer {
   0%,
   100% {
      background-position: 0% 50%;
   }
   50% {
      background-position: 100% 50%;
   }
}

/* ============================================================
   LOGO
   ============================================================ */
.logo-wrapper {
   display: inline-flex;
   align-items: center;
   margin-left: 5%;
   transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.logo-wrapper:hover {
   transform: scale(1.06) rotate(-1deg);
}

.logo-img {
   filter: drop-shadow(0 4px 12px rgba(100, 181, 246, 0.4));
   transition: filter 0.3s ease;
}

.logo-wrapper:hover .logo-img {
   filter: drop-shadow(0 6px 20px rgba(100, 181, 246, 0.7));
}

.logo-separator {
   background: linear-gradient(
      to bottom,
      transparent,
      rgba(255, 255, 255, 0.5),
      transparent
   ) !important;
}

/* ============================================================
   NAVEGACIÓN DESKTOP
   ============================================================ */
/* ============================================================
   NAVEGACIÓN DESKTOP — DORADO PRIVILEGE
   ============================================================ */
.nav-desktop {
   gap: 6px;
}

a {
   text-decoration: none;
}

:deep(.nav-btn) {
   position: relative;
   border-radius: 6px;
   font-family: inherit;
   font-weight: 600;
   letter-spacing: 2.5px;
   text-transform: uppercase;
   font-size: 11px;
   padding: 10px 24px;
   min-height: 44px;
   overflow: hidden;

   /* Fondo oscuro con un pelín de calidez */
   background: linear-gradient(135deg, #141c26 0%, #1a2430 100%) !important;

   /* Texto dorado degradado (champagne → oro viejo) */
   background-clip: padding-box;
   color: #e6c877 !important;

   /* Doble borde dorado (efecto "marco de reloj") */
   border: 1px solid rgba(212, 175, 55, 0.55);
   box-shadow: inset 0 0 0 1px rgba(212, 175, 55, 0.12),
      0 2px 10px rgba(0, 0, 0, 0.4);

   transition: all 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}

/* ✨ Relleno dorado que crece desde abajo al hover */
:deep(.nav-btn::before) {
   content: "";
   position: absolute;
   inset: 0;
   background: linear-gradient(180deg, #d4af37 0%, #b8860b 100%);
   transform: translateY(101%);
   transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
   z-index: 0;
}

:deep(.nav-btn:hover::before) {
   transform: translateY(0);
}

/* Asegura que el contenido quede encima del relleno */
:deep(.nav-btn .q-btn__content) {
   position: relative;
   z-index: 1;
   transition: color 0.35s ease;
}

:deep(.nav-btn:hover .q-btn__content) {
   color: #0f1720 !important;
}

:deep(.nav-btn:hover) {
   color: #0f1720 !important;
   border-color: #d4af37;
   transform: translateY(-2px);
   box-shadow: inset 0 0 0 1px rgba(212, 175, 55, 0.4),
      0 10px 30px rgba(212, 175, 55, 0.35), 0 0 20px rgba(212, 175, 55, 0.25);
}

/* ✨ Destello que barre el botón al hover */
:deep(.nav-btn::after) {
   content: "";
   position: absolute;
   top: 0;
   left: -75%;
   width: 50%;
   height: 100%;
   background: linear-gradient(
      120deg,
      transparent,
      rgba(255, 255, 255, 0.55),
      transparent
   );
   transform: skewX(-20deg);
   transition: left 0.7s cubic-bezier(0.22, 1, 0.36, 1);
   z-index: 2;
   pointer-events: none;
}

:deep(.nav-btn:hover::after) {
   left: 125%;
}

/* ============================================================
   Todos los botones comparten el mismo ADN dorado
   (sin diferenciar por color)
   ============================================================ */
:deep(.nav-btn--home),
:deep(.nav-btn--contact),
:deep(.nav-btn--garage),
:deep(.nav-btn--options) {
   background: linear-gradient(135deg, #141c26 0%, #1a2430 100%) !important;
}

/* Hover idéntico para todos */
:deep(.nav-btn--home:hover),
:deep(.nav-btn--contact:hover),
:deep(.nav-btn--garage:hover),
:deep(.nav-btn--options:hover) {
   background: linear-gradient(135deg, #141c26 0%, #1a2430 100%) !important;
}

/* Quitar subrayado de router-link */
a {
   text-decoration: none;
}

/* Botones de navegación premium */
:deep(.nav-btn) {
   position: relative;
   border-radius: 12px;
   font-weight: 700;
   letter-spacing: 0.4px;
   padding: 8px 20px;
   min-height: 42px;
   overflow: hidden;
   transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
   border: 1px solid rgba(255, 255, 255, 0.08);
   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
}

/* Efecto de onda al hover */
:deep(.nav-btn::before) {
   content: "";
   position: absolute;
   inset: 0;
   background: linear-gradient(
      120deg,
      transparent 30%,
      rgba(255, 255, 255, 0.25) 50%,
      transparent 70%
   );
   transform: translateX(-100%);
   transition: transform 0.6s ease;
}

:deep(.nav-btn:hover::before) {
   transform: translateX(100%);
}

:deep(.nav-btn:hover) {
   transform: translateY(-3px) scale(1.03);
   box-shadow: 0 10px 25px rgba(0, 0, 0, 0.45);
   border-color: rgba(255, 255, 255, 0.2);
}

/* Colores específicos por botón */
:deep(.nav-btn--home) {
   background: linear-gradient(135deg, #37474f, #263238) !important;
}
:deep(.nav-btn--home:hover) {
   background: linear-gradient(135deg, #455a64, #37474f) !important;
}

:deep(.nav-btn--contact) {
   background: linear-gradient(135deg, #0277bd, #01579b) !important;
}
:deep(.nav-btn--contact:hover) {
   background: linear-gradient(135deg, #0288d1, #0277bd) !important;
}

:deep(.nav-btn--garage) {
   background: linear-gradient(135deg, #c62828, #8e0000) !important;
}
:deep(.nav-btn--garage:hover) {
   background: linear-gradient(135deg, #e53935, #c62828) !important;
   box-shadow: 0 10px 25px rgba(229, 57, 53, 0.5);
}

:deep(.nav-btn--options) {
   background: linear-gradient(135deg, #ef6c00, #e65100) !important;
}
:deep(.nav-btn--options:hover) {
   background: linear-gradient(135deg, #fb8c00, #ef6c00) !important;
   box-shadow: 0 10px 25px rgba(251, 140, 0, 0.5);
}

/* ============================================================
   SECCIÓN USUARIO
   ============================================================ */
/* ============================================================
   SECCIÓN USUARIO — DORADO PRIVILEGE
   ============================================================ */
.user-section {
   padding-right: 12px;
}

/* Login */
.login-btn {
   color: #e6c877 !important;
   background: linear-gradient(135deg, #141c26, #1a2430);
   border: 1px solid rgba(212, 175, 55, 0.55);
   box-shadow: inset 0 0 0 1px rgba(212, 175, 55, 0.12);
   transition: all 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}

.login-btn:hover {
   background: linear-gradient(135deg, #d4af37, #b8860b) !important;
   color: #0f1720 !important;
   border-color: #d4af37;
   transform: translateY(-2px);
   box-shadow: 0 10px 26px rgba(212, 175, 55, 0.4),
      0 0 18px rgba(212, 175, 55, 0.3);
}

/* Chip usuario */
.user-chip {
   background: linear-gradient(
      135deg,
      rgba(212, 175, 55, 0.12),
      rgba(212, 175, 55, 0.04)
   ) !important;
   border: 1px solid rgba(212, 175, 55, 0.55);
   box-shadow: inset 0 0 0 1px rgba(212, 175, 55, 0.1);
   border-radius: 999px;
   padding: 4px 14px;
   font-weight: 600;
   letter-spacing: 2px;
   font-size: 11px;
   text-transform: uppercase;
   color: #f5e6a8 !important;
   backdrop-filter: blur(8px);
}

/* Logout */
.logout-btn {
   color: #e6c877 !important;
   background: linear-gradient(135deg, #141c26, #1a2430);
   border: 1px solid rgba(212, 175, 55, 0.55);
   box-shadow: inset 0 0 0 1px rgba(212, 175, 55, 0.12);
   transition: all 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}

.logout-btn:hover {
   background: linear-gradient(135deg, #d4af37, #b8860b) !important;
   color: #0f1720 !important;
   border-color: #d4af37;
   transform: translateY(-2px);
   box-shadow: 0 10px 26px rgba(212, 175, 55, 0.4),
      0 0 18px rgba(212, 175, 55, 0.3);
}

/* ============================================================
   MENÚ MÓVIL
   ============================================================ */
.menu-btn {
   color: #e3f2fd !important;
   transition: all 0.3s ease;
}

.menu-btn:hover {
   background: rgba(255, 255, 255, 0.1) !important;
   transform: rotate(90deg);
}

.mobile-menu {
   background: linear-gradient(
      160deg,
      rgba(26, 35, 50, 0.98),
      rgba(44, 62, 80, 0.98)
   ) !important;
   backdrop-filter: blur(20px);
   border: 1px solid rgba(255, 255, 255, 0.1);
   border-radius: 12px;
   box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6) !important;
}

.menu-item {
   color: #cfd8dc;
   border-radius: 8px;
   margin: 2px 6px;
   transition: all 0.25s ease;
}

.menu-item:hover {
   background: rgba(100, 181, 246, 0.12) !important;
   transform: translateX(4px);
}

/* ============================================================
   RESPONSIVE
   ============================================================ */
@media (max-width: 899px) {
   .header-toolbar {
      min-height: 64px;
   }
   .logo-wrapper {
      margin-left: 2%;
   }
}
</style>
