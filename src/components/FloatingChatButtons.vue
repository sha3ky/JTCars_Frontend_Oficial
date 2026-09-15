<template>
   <!-- Componente de botones flotantes -->
   <div class="floating-chat-buttons">
      <q-btn
         round
         dense
         size="md"
         type="a"
         class="whatsapp-btn"
         icon="chat"
         :href="whatsappUrl"
         target="_blank"
         rel="noopener noreferrer"
      >
         <q-tooltip anchor="top middle" self="bottom middle" class="bg-green-9">
            Contactar por WhatsApp
         </q-tooltip>
      </q-btn>

      <!-- Telegram (opcional) -->
      <!--
      <q-btn
         round
         dense
         size="md"
         type="a"
         class="telegram-btn"
         icon="telegram"
         :href="telegramUrl"
         target="_blank"
         rel="noopener noreferrer"
      >
         <q-tooltip anchor="top middle" self="bottom middle" class="bg-blue-9">
            Contactar por Telegram
         </q-tooltip>
      </q-btn>
      -->
   </div>
</template>

<script>
import { defineComponent, computed } from "vue";

export default defineComponent({
   name: "FloatingChatButtons",

   props: {
      phoneNumber: {
         type: String,
         default: "34722411324",
      },
      telegramUser: {
         type: String,
         default: "JTCars",
      },
      whatsappMessage: {
         type: String,
         default: "Hola, me interesa saber más sobre sus coches",
      },
   },

   setup(props) {
      const number = props.phoneNumber;

      const whatsappUrl = computed(() => {
         const encodedMessage = encodeURIComponent(props.whatsappMessage);
         return `https://wa.me/${props.phoneNumber}?text=${encodedMessage}`;
      });

      const telegramUrl = computed(() => {
         return `https://t.me/${props.telegramUser}`;
      });

      return {
         whatsappUrl,
         telegramUrl,
         number,
      };
   },
});
</script>

<style scoped>
/* ============================================================
   CONTENEDOR — COMPACTO, CON COHERENCIA AL LAYOUT
   ============================================================ */
.floating-chat-buttons {
   position: fixed;
   bottom: 18px;
   right: 18px;
   float: left;
   z-index: 1000;
   display: flex;
   flex-direction: row;
   gap: 10px;
   pointer-events: none;
}

.floating-chat-buttons > * {
   pointer-events: auto;
}

/* ============================================================
   BOTÓN WHATSAPP — TAMAÑO REDUCIDO, EFECTO PREMIUM
   ============================================================ */
.whatsapp-btn {
   width: 48px;
   height: 48px;
   min-width: 48px;
   min-height: 48px;
   background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
   color: #ffffff;
   border: 1px solid rgba(255, 255, 255, 0.15);
   box-shadow: 0 6px 18px rgba(37, 211, 102, 0.35);
   transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
   animation: pulse-green 2.4s infinite;
}

.whatsapp-btn:hover {
   transform: translateY(-3px) scale(1.08);
   box-shadow: 0 10px 25px rgba(37, 211, 102, 0.55);
   animation-play-state: paused;
}

.whatsapp-btn :deep(.q-icon) {
   font-size: 22px;
}

/* ============================================================
   BOTÓN TELEGRAM (opcional)
   ============================================================ */
.telegram-btn {
   width: 48px;
   height: 48px;
   min-width: 48px;
   min-height: 48px;
   background: linear-gradient(135deg, #29b6f6 0%, #0088cc 100%);
   color: #ffffff;
   border: 1px solid rgba(255, 255, 255, 0.15);
   box-shadow: 0 6px 18px rgba(0, 136, 204, 0.35);
   transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
   animation: pulse-blue 2.4s infinite;
}

.telegram-btn:hover {
   transform: translateY(-3px) scale(1.08);
   box-shadow: 0 10px 25px rgba(0, 136, 204, 0.55);
   animation-play-state: paused;
}

.telegram-btn :deep(.q-icon) {
   font-size: 22px;
}

/* ============================================================
   ANIMACIONES DE PULSO (MÁS SUTILES)
   ============================================================ */
@keyframes pulse-green {
   0% {
      box-shadow: 0 6px 18px rgba(37, 211, 102, 0.35),
         0 0 0 0 rgba(37, 211, 102, 0.55);
   }
   70% {
      box-shadow: 0 6px 18px rgba(37, 211, 102, 0.35),
         0 0 0 12px rgba(37, 211, 102, 0);
   }
   100% {
      box-shadow: 0 6px 18px rgba(37, 211, 102, 0.35),
         0 0 0 0 rgba(37, 211, 102, 0);
   }
}

@keyframes pulse-blue {
   0% {
      box-shadow: 0 6px 18px rgba(0, 136, 204, 0.35),
         0 0 0 0 rgba(0, 136, 204, 0.55);
   }
   70% {
      box-shadow: 0 6px 18px rgba(0, 136, 204, 0.35),
         0 0 0 12px rgba(0, 136, 204, 0);
   }
   100% {
      box-shadow: 0 6px 18px rgba(0, 136, 204, 0.35),
         0 0 0 0 rgba(0, 136, 204, 0);
   }
}

/* ============================================================
   RESPONSIVE — AÚN MÁS COMPACTO EN MÓVIL
   ============================================================ */
@media (max-width: 600px) {
   .floating-chat-buttons {
      bottom: 12px;
      right: 12px;
      gap: 8px;
   }

   .whatsapp-btn,
   .telegram-btn {
      width: 42px;
      height: 42px;
      min-width: 42px;
      min-height: 42px;
   }

   .whatsapp-btn :deep(.q-icon),
   .telegram-btn :deep(.q-icon) {
      font-size: 18px;
   }
}

/* ♿ Accesibilidad */
@media (prefers-reduced-motion: reduce) {
   .whatsapp-btn,
   .telegram-btn {
      animation: none !important;
      transition: none !important;
   }
}
</style>
