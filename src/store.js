/* import { createStore } from "vuex";

const store = createStore({
   state: {
      sessionData: null,
      name: null,
      darkMode: null,
      isAdmin: null,
   },
   mutations: {
      setSessionData(state, { sessionData, name, darkMode, isAdmin }) {
         state.sessionData = sessionData;
         state.name = name;
         state.darkMode = darkMode;
         state.isAdmin = isAdmin;
      },
      clearSessionData(state) {
         state.sessionData = null;
         state.name = null;
         state.darkMode = null;
         state.isAdmin = null;
      },
   },
   actions: {
      login({ commit }, { sessionData, name, darkMode, isAdmin }) {
         commit("setSessionData", { sessionData, name, darkMode, isAdmin });
      },
      logout({ commit }) {
         commit("clearSessionData");
         // Perform any additional logout actions (e.g., clear session storage)
      },
   },
});

export default store; */

import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import axios, { AxiosHeaders } from "axios";
import apiLink from "./composable/apiLink";
const store = createStore({
   state: {
      access_token: null,
      refresh_token: null,
      name: null,
      email: null,
      isAdmin: null,
      darkMode: false,
   },
   mutations: {
      setSessionData(state, payload) {
         Object.assign(state, payload);
      },
      updateTokens(state, { access_token, refresh_token }) {
         state.access_token = access_token;
         if (refresh_token) {
            state.refresh_token = refresh_token;
         }
      },
      clearSessionData(state) {
         // ✅ SOLO limpieza del estado (sin efectos secundarios)
         state.access_token = null;
         state.refresh_token = null;
         state.name = null;
         state.email = null;
         state.darkMode = false;
         state.isAdmin = null;
      },
   },
   actions: {
      login({ commit }, payload) {
         commit("setSessionData", payload);
      },
      refreshTokens({ commit }, payload) {
         commit("updateTokens", payload);
      },
      async logout({ commit, state }) {
         try {
            // ✅ Lógica de logout en ACTION (donde pertenece)
            await axios.post(
               `${apiLink}api/logout/`,
               {
                  refresh_token: state.refresh_token, // ← Usa el token del state
               },
               {
                  headers: {
                     Authorization: `Bearer ${state.access_token}`,
                  },
               }
            );
         } catch (error) {
            console.error("Logout API error:", error);
            // ✅ Importante: limpiar estado incluso si falla la API
         } finally {
            // ✅ Siempre limpiar el estado local
            commit("clearSessionData");
         }
      },
   },
   plugins: [
      createPersistedState({
         storage: window.sessionStorage,
      }),
   ],
});

// ❌ ELIMINAR la función logout externa
// const logout = async () => { ... }

export default store;
