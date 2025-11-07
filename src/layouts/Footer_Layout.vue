<template>
   <q-footer elevated class="bg-blue-grey-9 text-white">
      <q-toolbar class="q-px-md">
         <q-toolbar-title class="text-center footer-content">
            <div class="footer-text row items-center no-wrap q-gutter-x-sm">
               <span class="logo-wrapper">
                  <q-img
                     src="/logoEmpresa.png"
                     width="40px"
                     height="40px"
                     alt="BytePunk Studios"
                  />
               </span>

               <!-- El texto de la empresa y el año -->
               <span class="text-subtitle1 text-weight-medium">
                  BytePunk Studios {{ currentYear }}
               </span>
            </div>
         </q-toolbar-title>
      </q-toolbar>

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
.footer-content {
   padding: 8px 0;
}

.footer-text {
   display: flex;
   align-items: center;
   justify-content: center;
   flex-wrap: wrap;
   gap: 8px;
   font-size: clamp(14px, 2vw, 16px); /* Responsive font size */
   line-height: 1.4;
}

.logo-wrapper {
   display: inline-flex;
   align-items: center;
   vertical-align: middle;
}

/* Responsive */
@media (max-width: 600px) {
   .footer-text {
      flex-direction: column;
      gap: 4px;
   }

   .q-toolbar {
      min-height: 60px;
   }
}

@media (max-width: 400px) {
   .footer-text {
      font-size: 14px;
   }

   .q-img {
      width: 35px !important;
      height: 35px !important;
   }
}
</style>
