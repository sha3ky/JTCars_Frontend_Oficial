import ContactoPageVue from 'src/pages/ContactoPage.vue'
import PrincipalCoches from 'src/pages/PrincipalCoches.vue'

const routes = [
  {
      // path: "/",
      path: "/",
      name: "principal-coches",
      component:PrincipalCoches,
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
   // Always leave this as last one,
   // but you can also remove it
   {
      path: "/:catchAll(.*)*",
      component: () => import("pages/ErrorNotFound.vue"),
   },
];

export default routes;
