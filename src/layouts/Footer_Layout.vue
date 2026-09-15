<template>
   <q-footer elevated class="app-footer text-white">
      <!-- ✨ Línea superior con gradiente animado -->
      <div class="footer-top-line" aria-hidden="true"></div>

      <!-- ✨ Efecto de brillo de fondo -->
      <div class="footer-glow" aria-hidden="true"></div>

      <div class="footer-inner">
         <div class="footer-text row items-center no-wrap q-gutter-x-sm">
            <span class="logo-wrapper">
               <q-img
                  src="/logoEmpresa.png"
                  width="32px"
                  height="32px"
                  alt="Cybernetic Solution"
                  class="footer-logo"
               />
            </span>

            <span class="footer-brand">
               Cybernetic Solutions
               <span class="footer-year">{{ currentYear }}</span>
            </span>
         </div>
      </div>

      <!-- ✅ USAR EL MIXIN EN VEZ DEL STORE DIRECTAMENTE -->
      <div v-if="!isAuthenticated()">
         <FloatingChatButtons class="floating-buttons" />
      </div>
   </q-footer>
</template>

<script>
import FloatingChatButtons from "../components/FloatingChatButtons.vue";
import { authMixin } from "../mixins/authMixin";

export default {
   mixins: [authMixin],
   components: {
      FloatingChatButtons,
   },
   computed: {
      currentYear() {
         return new Date().getFullYear();
      },
   },
};
</script>

<style scoped>
/* ============================================================
   CONTENEDOR PRINCIPAL — COMPACTO, SIN ROMPER EL FIXED DE QUASAR
   ============================================================ */
.app-footer {
   /* ❌ NO position:relative — Quasar ya lo pone fixed */
   /* ❌ NO overflow:hidden — recortaría los floating buttons */
   background: linear-gradient(
      135deg,
      #0f1720 0%,
      #1a2332 50%,
      #0f1720 100%
   ) !important;
   backdrop-filter: blur(12px);
   border-top: 1px solid rgba(255, 255, 255, 0.08);
   box-shadow: 0 -4px 30px rgba(0, 0, 0, 0.4) !important;

   /* ✅ CLAVE: forzamos altura mínima pequeña */
   min-height: unset !important;
   padding: 0 !important;
}

/* ✅ Sobrescribimos el min-height del toolbar de Quasar */
.app-footer :deep(.q-toolbar) {
   min-height: unset !important;
   padding: 0 !important;
}

/* ✨ Línea superior con gradiente animado */
.footer-top-line {
   position: absolute;
   top: 0;
   left: 0;
   right: 0;
   height: 2px;
   background: linear-gradient(
      90deg,
      transparent,
      #64b5f6,
      #ff9800,
      #64b5f6,
      transparent
   );
   background-size: 200% 100%;
   animation: lineFlow 6s linear infinite;
   z-index: 3;
   pointer-events: none;
}

@keyframes lineFlow {
   0% {
      background-position: 0% 50%;
   }
   100% {
      background-position: 200% 50%;
   }
}

/* ✨ Efecto de brillo de fondo */
.footer-glow {
   position: absolute;
   inset: 0;
   background: radial-gradient(
      circle at 50% 100%,
      rgba(100, 181, 246, 0.12),
      transparent 70%
   );
   pointer-events: none;
   z-index: 0;
}

/* ============================================================
   CONTENIDO — ALTURA CONTROLADA
   ============================================================ */
.footer-inner {
   position: relative;
   z-index: 2;
   display: flex;
   align-items: center;
   justify-content: center;
   /* ✅ Controla la altura total del footer aquí */
   padding: 6px 16px;
   min-height: 42px;
}

.footer-text {
   display: flex;
   align-items: center;
   justify-content: center;
   flex-wrap: wrap;
   gap: 8px;
   font-size: clamp(12px, 1.6vw, 14px);
   line-height: 1.2;
}

/* ============================================================
   LOGO
   ============================================================ */
.logo-wrapper {
   display: inline-flex;
   align-items: center;
   vertical-align: middle;
   transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.logo-wrapper:hover {
   transform: scale(1.1) rotate(-3deg);
}

.footer-logo {
   filter: drop-shadow(0 4px 12px rgba(100, 181, 246, 0.45));
   transition: filter 0.35s ease;
}

.logo-wrapper:hover .footer-logo {
   filter: drop-shadow(0 6px 20px rgba(100, 181, 246, 0.8));
}

/* ============================================================
   TEXTO DE MARCA
   ============================================================ */
.footer-brand {
   letter-spacing: 0.4px;
   font-weight: 500;
   background: linear-gradient(90deg, #cfd8dc 0%, #ffffff 50%, #cfd8dc 100%);
   background-size: 200% auto;
   -webkit-background-clip: text;
   background-clip: text;
   -webkit-text-fill-color: transparent;
   animation: brandShine 5s ease-in-out infinite;
}

@keyframes brandShine {
   0%,
   100% {
      background-position: 0% center;
   }
   50% {
      background-position: 100% center;
   }
}

.footer-year {
   display: inline-block;
   margin-left: 4px;
   font-weight: 700;
   background: linear-gradient(135deg, #64b5f6, #ff9800);
   -webkit-background-clip: text;
   background-clip: text;
   -webkit-text-fill-color: transparent;
   transition: transform 0.3s ease;
}

.footer-brand:hover .footer-year {
   transform: scale(1.15);
}

/* ============================================================
   BOTONES FLOTANTES
   ============================================================ */
/* .floating-buttons {
   position: fixed;
   z-index: 2;
}
 */
/* ============================================================
   RESPONSIVE
   ============================================================ */
@media (max-width: 600px) {
   .footer-inner {
      padding: 4px 12px;
      min-height: 36px;
   }

   .footer-text {
      font-size: 12px;
      gap: 6px;
   }
}

@media (max-width: 400px) {
   .footer-text {
      font-size: 11px;
   }
}

/* ♿ Accesibilidad */
@media (prefers-reduced-motion: reduce) {
   .footer-top-line,
   .footer-brand,
   .logo-wrapper,
   .footer-logo,
   .footer-year {
      animation: none !important;
      transition: none !important;
   }
}
</style>
