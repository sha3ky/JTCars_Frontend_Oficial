<template>
   <!-- Solo renderiza si el usuario está autenticado -->
   <q-layout view="lHh Lpr lFf" v-if="isAuthenticated()">
      <!-- Se mantienen componentes de Layout necesarios -->
      <HeaderLayout
         :is-authenticated="isAuthenticated()"
         :user-is-admin="userIsAdmin"
         :usuario-logineado="usuarioLogineado"
         @login="loginearUsuario"
         @logout="logOut"
      />
      <Footer_Layout />

      <q-page-container>
         <div
            style="
               height: 100vh;
               width: 100vw;
               display: flex;
               flex-direction: column;
               background-image: linear-gradient(
                     rgba(0, 0, 0, 0.5),
                     rgba(0, 0, 0, 0.5)
                  ),
                  url('/mechanic.webp');
               align-items: center;
               background-size: cover;
               background-position: center;
               z-index: 1;
               position: relative;
            "
         >
            <!-- Título de la Sección -->
            <div
               style="
                  background-color: rgb(255, 152, 0, 0.5);
                  width: 50vh;
                  text-align: center;
                  margin-top: 3%;
                  height: 6%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  border-radius: 5px;
               "
            >
               <h4>Ajustes Usuario</h4>
            </div>

            <!-- Contenedor Principal de Ajustes -->
            <div class="q-pa-md" :style="backgroundStyle">
               <q-list bordered class="rounded-borders">
                  <!-- SECCIÓN ÚNICA: MODIFICAR CONTRASEÑA -->
                  <q-expansion-item
                     group="somegroup"
                     expand-separator
                     icon="key"
                     label="Modificar contraseña"
                     dense
                     default-opened
                     style="
                        color: white;
                        font-size: clamp(1.3rem, 4vw, 1.875rem);
                     "
                  >
                     <q-card class="text-primary q-pa-md">
                        <q-card-section>
                           <div class="q-pb-md">
                              <q-input
                                 dense
                                 v-model="oldPassword"
                                 type="password"
                                 label="Contraseña antigua"
                              />
                           </div>
                           <div class="q-pb-md">
                              <q-input
                                 v-model="newPassword"
                                 label="Contraseña nueva"
                                 dense
                                 type="password"
                                 :rules="[
                                    (val) =>
                                       val.length >= 8 || 'Mínimo 8 caracteres',
                                    (val) =>
                                       /[A-Z]/.test(val) ||
                                       'Debe incluir una Mayúscula',
                                    (val) =>
                                       /[a-z]/.test(val) ||
                                       'Debe incluir una Minúscula',
                                    (val) =>
                                       /[0-9]/.test(val) ||
                                       'Debe incluir un Número',
                                    (val) =>
                                       /[^a-zA-Z0-9\s]/.test(val) ||
                                       'Debe incluir un Símbolo',
                                 ]"
                                 hide-bottom-space
                              />
                           </div>
                           <div>
                              <q-input
                                 v-model="newPassword2"
                                 label="Repetir contraseña"
                                 dense
                                 type="password"
                              />
                           </div>
                        </q-card-section>
                     </q-card>
                  </q-expansion-item>

                  <!-- Botón de Guardar -->
                  <q-card-actions align="right" class="text-primary q-pa-md">
                     <div>
                        <q-btn
                           label="Guardar Contraseña"
                           @click="aceptarCambios"
                           color="green"
                           text-color="black"
                        />
                     </div>
                  </q-card-actions>
               </q-list>
            </div>
         </div>
         <router-view />
      </q-page-container>
   </q-layout>

   <!-- Contenedor si NO está autenticado (404) -->
   <q-layout v-else>
      <div
         class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center"
      >
         <div>
            <div style="font-size: 30vh">404</div>
            <div class="text-h2" style="opacity: 0.4">
               Oops. No hay nada que ver aqui...
            </div>
            <q-btn
               class="q-mt-xl"
               color="white"
               text-color="blue"
               unelevated
               to="/"
               label="Primera página"
               no-caps
            />
         </div>
      </div>
   </q-layout>
</template>

<style scoped>
/* Estilos se mantienen */
.big-input :deep(.q-field__native) {
   font-size: 30px !important;
   min-height: 50px !important;
}

.big-input :deep(.q-field__control) {
   min-height: 60px !important;
}

.big-input :deep(.q-field__label) {
   font-size: 20px !important;
   top: 15px !important;
}
.iframe-container {
   width: 100%;
   height: 100vh;
}
body.body--dark {
   background: #0c0c0c;
}
.q-select__dialog {
   width: 200px !important;
}
</style>

<script>
// Limpiamos las importaciones no utilizadas
import Footer_Layout from "src/layouts/Footer_Layout.vue";
import { defineComponent, computed } from "vue";
import store from "../../src/store";
import { Notify } from "quasar";
import updatePasswordUser from "src/composable/updatePasswordUser"; // Mantener solo lo necesario
import { authMixin } from "../mixins/authMixin";
import HeaderLayout from "components/HeaderComponent.vue";

export default defineComponent({
   name: "ExtraUsuario",
   mixins: [authMixin],
   data() {
      return {
         // Se eliminan showInputUser, showLoginUser, modificarNomEmail, notificaciones, etc.
         oldPassword: "",
         newPassword: "",
         newPassword2: "",

         // Se eliminan todos los campos innecesarios del formulario
      };
   },

   // Se elimina el watcher, ya que solo hay una sección

   computed: {
      backgroundStyle() {
         const baseStyle = {
            "max-width": "550px",
            "z-index": "10",
            "border-radius": "10px",
            "margin-top": "10%",
         };
         // Si el usuario ES Admin (por ejemplo) o está en modo claro
         if (store.state.darkMode) {
            return {
               ...baseStyle,
               "background-color": "rgba(251, 251, 251, 0.33)",
            };
         } else {
            // Si NO es Admin, usa la versión oscura
            return {
               ...baseStyle,
               "background-color": "rgba(0, 0, 0, 0.62)",
            };
         }
      },
   },
   methods: {
      // Simplificamos 'aceptarCambios' para que solo maneje el cambio de contraseña
      async aceptarCambios() {
         if (this.newPassword !== this.newPassword2) {
            console.log("Las contraseñas no son iguales");
            Notify.create({
               type: "negative",
               message: "Las contraseñas no son iguales",
            });
         } else {
            // Llama a la función del composable para actualizar la contraseña
            let resPassword = await updatePasswordUser(
               this.oldPassword,
               this.newPassword
            );

            if (resPassword) {
               console.log("Contraseña actualizada correctamente");
               Notify.create({
                  type: "positive",
                  message: "Contraseña cambiada exitosamente",
               });
               // Limpia los campos después del éxito
               this.oldPassword = "";
               this.newPassword = "";
               this.newPassword2 = "";
            } else {
               // Esto incluye el caso de que la oldPassword sea incorrecta
               console.log("Error al cambiar la contraseña");
               Notify.create({
                  type: "negative",
                  message:
                     "Error al cambiar la contraseña. Verifica tu contraseña antigua.",
               });
            }
         }
      },

      // Mantener solo los métodos de autenticación si son necesarios para HeaderLayout
      updateUsuarioLogineado(bool) {
         if (bool) {
            this.usuarioLogineado = store.state.name;
            this.sessionData = store.state.sessionData;
            this.userIsAdmin = store.state.isAdmin;
         }
      },
      handleDialogClose() {
         // Método de manejo de diálogos eliminado
      },
      nuevoUsuario() {
         // Método eliminado
      },
      loginearUsuario() {
         // Método eliminado
      },

      async logOut() {
         store.dispatch("logout");
         Notify.create({
            type: "positive",
            message: "Adios.",
         });
         this.$router.push({ name: "principal-coches" });
      },
   },
   components: {
      // Se eliminan InputUser y loginUser
      Footer_Layout,
      HeaderLayout,
   },
});
</script>
