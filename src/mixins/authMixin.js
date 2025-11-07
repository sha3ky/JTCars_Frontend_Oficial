import store from "../../src/store";

export const authMixin = {
   computed: {
      usuarioLogineado() {
         return store.state.name;
      },
      // ✅ OPCIÓN: También puedes hacerlo como computed
      isAuthenticatedComputed() {
         return !!store.state.access_token;
      },
   },
   methods: {
      // ✅ Método para verificar autenticación
      isAuthenticated() {
         return !!store.state.access_token;
      },
      logout() {
         store.dispatch("logout");
         this.$router.push("/login");
      },
   },
};
