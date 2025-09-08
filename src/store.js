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
      sessionData: null,
      name: null,
      darkMode: false,
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
         state.darkMode = false;
         state.isAdmin = null;
      },
   },
   actions: {
      login({ commit }, { sessionData, name, darkMode, isAdmin }) {
         commit("setSessionData", { sessionData, name, darkMode, isAdmin });
      },
      logout({ commit }) {
         commit("clearSessionData");
      },
   },

   // 🧠 Aquí activamos la persistencia
   plugins: [createPersistedState()],
});

export default store;
