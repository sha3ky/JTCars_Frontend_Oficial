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

const store = createStore({
   state: {
      access_token: null, // ← Agregar
      refresh_token: null, // ← Agregar
      name: null,
      email: null, // ← Agregar
      isAdmin: null,
      darkMode: false,
   },
   mutations: {
      setSessionData(
         state,
         { access_token, refresh_token, name, email, darkMode, isAdmin }
      ) {
         state.access_token = access_token;
         state.refresh_token = refresh_token;
         state.name = name;
         state.email = email;
         state.darkMode = darkMode;
         state.isAdmin = isAdmin;
      },
      updateTokens(state, { access_token, refresh_token }) {
         state.access_token = access_token;
         if (refresh_token) {
            // ← Rotación opcional
            state.refresh_token = refresh_token;
         }
      },
      clearSessionData(state) {
         state.access_token = null;
         state.refresh_token = null;
         state.name = null;
         state.email = null;
         state.darkMode = false;
         state.isAdmin = null;
      },
   },
   actions: {
      login(
         { commit },
         { access_token, refresh_token, name, email, darkMode, isAdmin }
      ) {
         commit("setSessionData", {
            access_token,
            refresh_token,
            name,
            email,
            darkMode,
            isAdmin,
         });
      },
      refreshTokens({ commit }, { access_token, refresh_token }) {
         commit("updateTokens", { access_token, refresh_token });
      },
      logout({ commit }) {
         commit("clearSessionData");
      },
   },

   // 🧠 Aquí activamos la persistencia
   plugins: [
      createPersistedState({
         // Persistir solo datos no sensibles
         paths: ["name", "email", "isAdmin", "darkMode"],
      }),
   ],
});

export default store;
