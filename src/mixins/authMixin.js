// mixins/authMixin.js
import store from "../../src/store";
import { RouterView, RouterLink } from "vue-router";
export const authMixin = {
   computed: {
      usuarioLogineado() {
         return store.state.name;
      },
      userIsAdmin() {
         return store.state.isAdmin ?? false;
      },
      // ❌ NO agregar isAuthenticated como computed
   },
   methods: {
      // ✅ Seguro - método que no expone el token
      isAuthenticated() {
         return !!store.state.access_token;
      },

      logout() {
         store.dispatch("logout");
         this.$router.push("/login");
      },
   },
};
