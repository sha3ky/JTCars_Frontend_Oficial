<template>
   <!-- Componente de botones flotantes -->
   <div class="floating-chat-buttons">
      <q-btn
         round
         size="lg"
         class="whatsapp-btn"
         icon="message"
         :href="`https://wa.me/${number}`"
         target="_blank"
      >
         <q-tooltip>WhatsApp</q-tooltip>
      </q-btn>
      <!-- Telegram -->
      <!--  <q-btn
         round
         size="md"
         class="telegram-btn shadow-4"
         icon="telegram"
         type="a"
         :href="telegramUrl"
         target="_blank"
      >
         <q-tooltip anchor="top middle" self="bottom middle">
            Contactar por Telegram
         </q-tooltip>
      </q-btn> -->
   </div>
</template>

<script>
import { defineComponent, computed } from "vue";

export default defineComponent({
   name: "FloatingChatButtons",

   props: {
      // Puedes personalizar desde el padre si quieres
      phoneNumber: {
         type: String,
         default: "34722411324", // Tu número por defecto
      },
      telegramUser: {
         type: String,
         default: "JTCars", // Tu usuario de Telegram
      },
      whatsappMessage: {
         type: String,
         default: "Hola, me interesa saber más sobre sus coches",
      },
   },

   setup(props) {
      const number = props.phoneNumber;
      // URLs computadas
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
.floating-chat-buttons {
   position: fixed;
   bottom: 30px;
   right: 30px;
   z-index: 1000;
   display: flex;
   flex-direction: row;
   gap: 15px;
}

.whatsapp-btn {
   background: #25d366;
   color: white;
   animation: pulse-green 2s infinite;
}

.telegram-btn {
   background: #0088cc;
   color: white;
   animation: pulse-blue 2s infinite;
}

/* Efectos hover */
.whatsapp-btn:hover,
.telegram-btn:hover {
   transform: scale(1.1);
   transition: transform 0.3s ease;
}

/* Animaciones de pulso */
@keyframes pulse-green {
   0% {
      box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7);
   }
   70% {
      box-shadow: 0 0 0 10px rgba(37, 211, 102, 0);
   }
   100% {
      box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
   }
}

@keyframes pulse-blue {
   0% {
      box-shadow: 0 0 0 0 rgba(0, 136, 204, 0.7);
   }
   70% {
      box-shadow: 0 0 0 10px rgba(0, 136, 204, 0);
   }
   100% {
      box-shadow: 0 0 0 0 rgba(0, 136, 204, 0);
   }
}

/* Responsive */
@media (max-width: 600px) {
   .floating-chat-buttons {
      bottom: 20px;
      right: 20px;
   }

   .whatsapp-btn,
   .telegram-btn {
      width: 50px;
      height: 50px;
   }

   .whatsapp-btn :deep(.q-icon),
   .telegram-btn :deep(.q-icon) {
      font-size: 20px;
   }
}
</style>
