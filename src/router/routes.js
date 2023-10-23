const routes = [
   {
      // path: "/",
      path: "/",
      name: "Coches",
      component: () => import("layouts/MainLayout.vue"),
      // children: [
      //   { path: '', component: () => import('pages/ContactoPage.vue') }
      // ]
   },
   {
      path: "/contacto",
      name: "Contacto",
      component: () => import("pages/ContactoPage.vue"),
   },

   // Always leave this as last one,
   // but you can also remove it
   {
      path: "/:catchAll(.*)*",
      component: () => import("pages/ErrorNotFound.vue"),
   },
];

export default routes;
