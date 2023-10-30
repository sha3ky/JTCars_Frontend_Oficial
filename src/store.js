import { createStore } from "vuex";

const store = createStore({
   state: {
      sessionData: null,
      name: null,
      darkMode: null,
   },
   mutations: {
      setSessionData(state, { sessionData, name, darkMode }) {
         state.sessionData = sessionData;
         state.name = name;
         state.darkMode = darkMode;
      },
      clearSessionData(state) {
         state.sessionData = null;
         state.name = null;
         state.darkMode = null;
      },
   },
   actions: {
      login({ commit }, { sessionData, name, darkMode }) {
         commit("setSessionData", { sessionData, name, darkMode });
      },
      logout({ commit }) {
         commit("clearSessionData");
         // Perform any additional logout actions (e.g., clear session storage)
      },
   },
});

export default store;

///////////////////ALTERNATIVAS//////////////////////
// const state = {
//   sessionData: null,
// };

// const mutations = {
//   setSessionData(state, sessionData) {
//     state.sessionData = sessionData;
//     // Store the session data in sessionStorage
//     sessionStorage.setItem("sessionData", JSON.stringify(sessionData));
//   },
//   clearSessionData(state) {
//     state.sessionData = null;
//     // Clear the session data from sessionStorage
//     sessionStorage.removeItem("sessionData");
//   },
// };

// const actions = {
//   login({ commit }, sessionData) {
//     commit("setSessionData", sessionData);
//   },
//   logout({ commit }) {
//     commit("clearSessionData");
//     // Perform any additional logout actions (e.g., clearing other session-related data)
//   },
// };

// export default {
//   state,
//   mutations,
//   actions,
// };
