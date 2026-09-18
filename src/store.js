import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import axios from "axios";
import apiLink from "./composable/apiLink";

const store = createStore({
   /*
   📦 ALMACÉN CENTRAL (State - El Inventario)
   Aquí guardo TODOS los datos importantes de tu app
   */
   state: {
      access_token: null, // 🎫 Tu carnet VIP para entrar
      refresh_token: null, // 🔄 Tu pase de renovación
      name: null, // 🏷️ Cómo te llamas
      email: null, // 📧 Tu email (para spam... digo, notificaciones)
      isAdmin: null, // 👑 ¿Eres el jefe? true/false
      darkMode: false, // 🌙/☀️ Modo oscuro o claro
   },

   /*
   ✏️ MODIFICADORES OFICIALES (Mutations - Los Cambios Permitidos)
   Solo YO puedo cambiar directamente el inventario. ¡Reglas!
   */
   mutations: {
      // 📝 Método para actualizar TODO de una vez
      setSessionData(state, payload) {
         Object.assign(state, payload); // 🔄 "Copia estos datos al inventario"
      },

      // 🎫 Especialista en renovar carnets
      updateTokens(state, { access_token, refresh_token }) {
         state.access_token = access_token; // 🆕 Carnet nuevo
         if (refresh_token) {
            state.refresh_token = refresh_token; // 🔄 Pase de renovación
         }
      },

      // 🌙/☀️ Interruptor oficial del modo oscuro
      SET_DARK_MODE(state, value) {
         state.darkMode = value; // "¡Luzes! ¡Cámara! ¡Acción!"
      },

      // 🧹 El equipo de limpieza (cuando cierra la tienda)
      clearSessionData(state) {
         state.access_token = null; // ❌ Se acabó el carnet VIP
         state.refresh_token = null; // ❌ Se acabaron las renovaciones
         state.name = null; // ❌ Olvidé tu nombre
         state.email = null; // ❌ No más emails
         state.darkMode = false; // ⚡ ¡Luzes encendidas!
         state.isAdmin = null; // ❌ Adiós jefatura
      },
   },

   /*
   🎭 ACCIONES (Actions - Los Asistentes que Hacen el Trabajo Sucio)
   Ellos hacen las tareas complicadas y luego me piden a MÍ que actualice el inventario
   */
   actions: {
      // 🚪 Acción: "¡Usuario quiere entrar!"
      login({ commit }, payload) {
         commit("setSessionData", payload); // 📞 "Oye mutations, guarda estos datos"
      },

      // 🔄 Acción: "¡Renovar carnets!"
      refreshTokens({ commit }, payload) {
         commit("updateTokens", payload); // 📞 "Mutations, actualiza los tokens"
      },

      // 🚶‍♂️ Acción: "¡Usuario quiere salir!"
      async logout({ commit, state }) {
         try {
            // 📡 "Hola servidor, este usuario se va"
            await axios.post(
               `${apiLink}api/logout/`,
               {
                  refresh_token: state.refresh_token,
               },
               {
                  headers: {
                     Authorization: `Bearer ${state.access_token}`,
                  },
               }
            );
         } catch (error) {
            // 😅 "Ups, el servidor no contesta... pero igual lo echo"
            console.error("Logout API error:", error);
         } finally {
            // 🧹 "Limpien todo, se fue el cliente"
            commit("clearSessionData");
         }
      },
   },

   /*
   💾 MEMORIA FOTOGRÁFICA (Persisted State - No sufra por pérdida de memoria)
   Guardo una foto de tus datos para cuando recargues la página
   */
   plugins: [
      createPersistedState({
         storage: window.sessionStorage, // 📸 "Foto que dura hasta cerrar pestaña"
      }),
   ],
});
// ❌ ELIMINAR la función logout externa
// const logout = async () => { ... }

export default store;
