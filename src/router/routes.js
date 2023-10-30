// import ContactoPageVue from "src/pages/ContactoPage.vue";
// import ExtraUsuarioVue from "src/pages/ExtraUsuario.vue";
// import PrincipalCoches from "src/pages/PrincipalCoches.vue";
// import AdminPageVue  from "src/pages/AdminPage.vue";
// import { createRouter, createWebHistory } from 'vue-router';
// import store from '../store'; // Adjust the import path as needed

// // ---------------------------forStore----------------------
// // import { createRouter, createWebHistory } from "vue-router";
// // import store from "../store";

// const routes = [
//    {
//       // path: "/",
//       path: "/",
//       name: "principal-coches",
//       component: PrincipalCoches,
//       // component: () => import("pages/PrincipalCoches.vue"),
//       // children: [
//       //   { path: '', component: () => import('pages/ContactoPage.vue') }
//       // ]
//    },
//    {
//       path: "/contacto",
//       name: "contacto-page",
//       component: ContactoPageVue,
//    },
//    {
//       path: "/extra",
//       name: "extra-usuario",
//       component: ExtraUsuarioVue,
//       // meta: { requiresAuth: true },
//    },
//    {
//     path: "/admin",
//     name: "admin-page",
//     component: AdminPageVue, //AdminPage.vue
//     meta: { requiresAuth: true },
//  },
//    // Always leave this as last one,
//    // but you can also remove it
//    {
//       path: "/:catchAll(.*)*",
//       component: () => import("pages/ErrorNotFound.vue"),
//    },
// ];

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
// });

// router.beforeEach((to, from, next) => {
//  if (to.meta.requiresAuth) {
//    // Check if the route requires authentication
//    if (!store.state.sessionData) {
//      // Session data not found; user is not authenticated
//      next({ name: "principal-coches" }); // Redirect to a suitable route (e.g., login page)
//    } else {
//      // Session data found; user is authenticated
//      next();
//    }
//  } else {
//    next();
//  }
// });

// export default router;

// import { createRouter, createWebHistory } from 'vue-router';
// import store from '../store';

import ContactoPageVue from 'src/pages/ContactoPage.vue';
import ExtraUsuarioVue from 'src/pages/ExtraUsuario.vue';
import PrincipalCoches from 'src/pages/PrincipalCoches.vue';
import AdminPageVue from 'src/pages/AdminPage.vue';

const routes = [
  {
    path: '/',
    name: 'principal-coches',
    component: PrincipalCoches,
  },
  {
    path: '/contacto',
    name: 'contacto-page',
    component: ContactoPageVue,
  },
  {
    path: '/extra',
    name: 'extra-usuario',
    component: ExtraUsuarioVue,
    meta: { requiresAuth: true },
  },
  {
    path: '/admin',
    name: 'admin-page',
    component: AdminPageVue,
    meta: { requiresAuth: true },
  },
  // ... other route configurations
];

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
// });

// router.beforeEach((to, from, next) => {

//   if (to.meta.requiresAuth) {
//     if (!store.state.sessionData) {
//       next({ name: 'principal-coches' }); // Redirect to the login page or another route
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// });

export default routes;
