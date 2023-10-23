const routes = [
  {
      // path: "/",
      path: "/",
      name: "principal-coches",
      component: () => import("pages/PrincipalCoches.vue"),
      // children: [
      //   { path: '', component: () => import('pages/ContactoPage.vue') }
      // ]
   },
   {
      path: "/contacto",
      name: "contacto-page",
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
