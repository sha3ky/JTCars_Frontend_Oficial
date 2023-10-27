import ContactoPageVue from "src/pages/ContactoPage.vue";
import ExtraUsuarioVue from "src/pages/ExtraUsuario.vue";
import PrincipalCoches from "src/pages/PrincipalCoches.vue";
import { createRouter, createWebHistory } from "vue-router";
import store from "./../store";

const routes = [
   {
      // path: "/",
      path: "/",
      name: "principal-coches",
      component: PrincipalCoches,
      // component: () => import("pages/PrincipalCoches.vue"),
      // children: [
      //   { path: '', component: () => import('pages/ContactoPage.vue') }
      // ]
   },
   {
      path: "/contacto",
      name: "contacto-page",
      component: ContactoPageVue,
   },
   {
      path: "/extra",
      name: "extra-usuario",
      component: ExtraUsuarioVue,
      meta: { requiresAuth: true },
   },
   // Always leave this as last one,
   // but you can also remove it
   {
      path: "/:catchAll(.*)*",
      component: () => import("pages/ErrorNotFound.vue"),
   },
];

const router = createRouter({
   history: createWebHistory(),
   routes, // You can directly pass the `routes` array
});

// router.beforeEach((to, from, next) => {
//   if (to.meta.requiresAuth) {
//     // Check if the route requires authentication
//     if (!store.state.sessionData) {
//       // Session data not found; user is not authenticated
//       next({ name: "login" }); // Redirect to login page
//     } else {
//       // Session data found; user is authenticated
//       next();
//     }
//   } else {
//     next();
//   }
// });

export default routes;
