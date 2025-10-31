<template>
   <q-header elevated>
      <q-toolbar class="bg-blue-grey-9">
         <!-- MENÚ HAMBURGUESA (Móvil) -->
         <q-btn
            flat
            round
            dense
            icon="menu"
            class="q-mr-sm"
            v-if="$q.screen.width < 599"
         >
            <q-menu transition-show="flip-right" transition-hide="flip-left">
               <q-list style="min-width: 100px">
                  <router-link to="/home">
                     <q-item clickable>
                        <q-item-section>Inicio</q-item-section>
                     </q-item>
                  </router-link>
                  <router-link to="/contacto">
                     <q-item clickable>
                        <q-item-section>Contactar</q-item-section>
                     </q-item>
                  </router-link>

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

                  <template v-if="isAuthenticated">
                     <router-link to="/usuarioPage">
                        <q-item clickable>
                           <q-item-section>Mis datos</q-item-section>
                        </q-item>
                     </router-link>
                  </template>

                  <q-separator />
               </q-list>
            </q-menu>
         </q-btn>

         <!-- LOGO -->
         <q-img
            height="70px"
            width="108px"
            src="/logo.png"
            v-if="$q.screen.width > 599"
         />

         <q-separator
            vertical
            inset
            style="background: aliceblue"
            v-if="$q.screen.width < 599"
         />

         <q-space></q-space>

         <!-- MENÚ ESCRITORIO -->
         <!--   <template v-if="$q.screen.width > 599">
            <div class="row items-center q-gutter-xs">
               <router-link to="/home">
                  <q-btn style="color: #bbdefb" clickable>
                     <q-item-section>Inicio</q-item-section>
                  </q-btn>
               </router-link>

               <router-link to="/contacto">
                  <q-btn style="color: #bbdefb" clickable>
                     <q-item-section>Contactar</q-item-section>
                  </q-btn>
               </router-link>

                 <router-link to="/noticias">
                  <q-btn style="color: #bbdefb" clickable>
                     <q-item-section>Noticias</q-item-section>
                  </q-btn>
               </router-link>

               <template v-if="isAuthenticated">
                  <router-link to="/usuarioPage">
                     <q-btn style="color: #ffab91" clickable>
                        <q-item-section>Mis Datos</q-item-section>
                     </q-btn>
                  </router-link>
               </template>

               <template v-if="userIsAdmin">
                  <router-link to="/admin">
                     <q-btn style="color: #ffab91" clickable>
                        <q-item-section>Admin</q-item-section>
                     </q-btn>
                  </router-link>
               </template>
            </div>
         </template>
 -->
         <template v-if="$q.screen.width > 599">
            <div class="row items-center q-gutter-md">
               <router-link to="/home">
                  <q-btn
                     color="dark"
                     text-color="white"
                     icon="home"
                     label="Inicio"
                     class="nav-btn"
                  />
               </router-link>

               <router-link to="/contacto">
                  <q-btn
                     color="dark"
                     text-color="white"
                     icon="contact_mail"
                     label="Contacto"
                     class="nav-btn"
                  />
               </router-link>

               <template v-if="isAuthenticated">
                  <router-link to="/usuarioPage">
                     <q-btn
                        color="orange"
                        text-color="white"
                        icon="speed"
                        label="Mi Garage"
                        class="nav-btn"
                     />
                  </router-link>
               </template>

               <template v-if="userIsAdmin">
                  <router-link to="/admin">
                     <q-btn
                        color="red"
                        text-color="white"
                        icon="tune"
                        label="Admin"
                        class="nav-btn"
                     />
                  </router-link>
               </template>
            </div>
         </template>

         <q-space></q-space>

         <!-- SECCIÓN USUARIO -->
         <div class="row items-center q-gutter-sm">
            <template v-if="!isAuthenticated">
               <q-btn
                  flat
                  dense
                  icon="login"
                  style="color: #bbdefb; width: 50px"
                  @click="$emit('login')"
               />
            </template>

            <template v-else>
               <div class="text-caption text-white">
                  {{ usuarioLogineado }}
               </div>
               <q-btn
                  flat
                  round
                  dense
                  @click="$emit('logout')"
                  icon="logout"
                  style="color: #ffab91"
               >
                  <q-tooltip>Salir</q-tooltip>
               </q-btn>
            </template>

            <dark-mode-toggle />
         </div>
      </q-toolbar>
   </q-header>
</template>

<script>
import { defineComponent } from "vue";
import DarkModeToggle from "./DarkModeToggle.vue";
import { useQuasar, Notify } from "quasar";
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
      userIsAdmin: {
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
/* Estilos para los router-links */
a {
   text-decoration: none;
}

/* Botones de navegación con separación */
:deep(.nav-btn) {
   border-radius: 6px;
   font-weight: bold;
   padding: 0 16px;
   transition: all 0.3s ease;
}

:deep(.nav-btn:hover) {
   transform: translateY(-2px);
   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}
</style>
