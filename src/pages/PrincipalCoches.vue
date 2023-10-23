<template>
   <q-layout view="lHh Lpr lFf">
      <q-header elevated>
         <q-toolbar class="bg-blue-grey-9">
            <q-btn
               flat
               round
               dense
               icon="menu"
               class="q-mr-sm"
               v-if="$q.screen.width < 600"
            >
               <q-menu transition-show="scale" transition-hide="scale">
                  <q-list style="min-width: 100px">
                     <q-item clickable>
                        <q-item-section>Coches</q-item-section>
                     </q-item>

                     <q-item clickable>
                        <q-item-section>Contacto</q-item-section>
                     </q-item>
                     <!-- <q-item clickable>
                       <q-item-section>Ofertas</q-item-section>
                    </q-item> -->
                     <q-separator />
                     <q-item clickable>
                        <q-item-section>Contacto</q-item-section>
                     </q-item>
                  </q-list>
               </q-menu>
            </q-btn>
            <q-img
               height="70px"
               width="108px"
               src="/benysCarlogoMetal.png"
               v-if="$q.screen.width > 600"
            >
            </q-img>
            <q-separator
               vertical
               inset
               style="background: aliceblue"
               v-if="$q.screen.width < 600"
            />
            <q-space></q-space>
            <!-- reactividad -->
            <template v-if="$q.screen.width > 600">
               <div>
                  <div>
                     <q-btn-toggle
                        v-model="modelSelectedMenu"
                        flat
                        stretch
                        toggle-color="green-2"
                        :options="optionsMenu"
                     ></q-btn-toggle>
                  </div>
               </div>
            </template>
            <!-- reactividad -->
            <q-space></q-space>
            <div>
               <q-btn
                  flat
                  round
                  dense
                  icon="img:loginGreen.png"
                  @click="register"
                  style="width: 50px"
               ></q-btn>
               <q-btn
                  flat
                  round
                  dense
                  icon="img:userplusGreen.png"
                  @click="ingresar"
               ></q-btn>
            </div>
            <q-toggle
               color="red"
               dark
               v-model="toggleDark"
               @click="toggleDarkMode"
            />
         </q-toolbar>
      </q-header>
      <q-footer elevated class="bg-blue-grey-9">
         <q-toolbar>
            <q-toolbar-title style="text-align: center"
               >Made with love by Sha3ky's TEAM</q-toolbar-title
            >
         </q-toolbar>
      </q-footer>

      <q-page-container style="min-height: 100vh; text-align: center">
         <div>
            <div style="padding: 25px; background: #37474f">
               <p
                  style="
                     font-size: 5vw;
                     text-align: center;
                     text-align: center;
                     color: white;
                  "
               >
                  Coches de segunda mano y vehículos de ocasión.
               </p>
            </div>
         </div>
         <q-img
            src="/banner.png"
            class="q-mx-auto"
            :max-width="400"
            :max-height="425"
            alt="Beny1 Logo"
         ></q-img>
         <div>
            <div class="q-pa-md row items-start q-gutter-md">
               <div class="row">
                  <q-card
                     v-for="(image, index) in imageUrls"
                     :key="index"
                     style="padding: 10px"
                     flat
                     bordered
                     class="my-card col-6"
                  >
                     <q-img :src="image">
                        <div
                           style="
                              display: flex;
                              justify-content: flex-end;
                              display: contents;
                           "
                        >
                           <div>
                              <q-badge rounded color="red" label="DESCUENTO" />
                              <q-badge rounded color="green" label="OFERTA" />
                              <q-badge rounded color="blue" label="HIBRIDO" />
                           </div>
                           <div
                              style="display: flex; justify-content: flex-end"
                           >
                              <q-img
                                 height="7vw"
                                 width="10vw"
                                 src="/benysCarlogoMetal.png"
                              >
                              </q-img>
                           </div>
                        </div>
                     </q-img>

                     <q-card-section>
                        <div class="text-overline text-orange-9">Precio</div>
                        <div class="text-h5 q-mt-sm q-mb-xs">2500$</div>
                        <div>
                           <div class="text-caption text-grey">
                              <div>Año de fabricación: 1998</div>
                              <div>Kilómetros: 220000</div>
                              <div>Etiqueta: C</div>
                           </div>
                        </div>
                     </q-card-section>

                     <q-card-actions>
                        <q-btn
                           flat
                           color="primary"
                           label="Más Fotos"
                           @click="carouselFoto"
                        />
                        <q-btn flat color="secondary" label="Más Datos" />

                        <q-space />

                        <q-btn
                           color="grey"
                           round
                           flat
                           dense
                           :icon="
                              expanded
                                 ? 'keyboard_arrow_up'
                                 : 'keyboard_arrow_down'
                           "
                           @click="expanded = !expanded"
                        />
                     </q-card-actions>

                     <q-slide-transition>
                        <div v-show="expanded">
                           <q-separator />
                           <q-card-section class="text-subtitle2">
                              {{ lorem }}
                           </q-card-section>
                        </div>
                     </q-slide-transition>
                  </q-card>
               </div>
            </div>
         </div>

         <div style="text-align: center; display: inline-block">
            <InputUser :show-newUser="showNewUser" />
            <loginUser :show-loginUser="showLoginUser" />
         </div>
         <!-- <q-page v-if="showLogin == true">
           <InputUser
              @show-login-updated="updateShowLogin"
              :show-login="showLogin"
              @user-id-updated="updateUserId"
              @user-admin="updateAdmin"
           />
        </q-page> -->

         <!-- <q-page v-if="showLogin === false && userIsAdmin === true">
           <AdminPart
              @show-login-updated="updateShowLogin"
              :show-login="showLogin"
              :user-id="userId"
              @user-admin="updateAdmin"
           />
        </q-page>
        <q-page v-if="showLogin === false && userIsAdmin === false">
           <LabellerUser
              @show-login-updated="updateShowLogin"
              :show-login="showLogin"
              :user-id="userId"
              @user-admin="updateAdmin"
           />
        </q-page> -->
         <router-view />
         <q-dialog v-model="dialogVisible">
            <!-- Include your custom carousel component here -->
            <MyCarousel />
         </q-dialog>
      </q-page-container>
   </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";

import InputUser from "components/InputUser.vue"; // Replace with the actual path
import loginUser from "src/components/loginUser.vue";
import MyCarousel from "src/components//MyCarousel.vue"; // Adjust the path as needed
import LabellerUser from "components/LabellerUser.vue";

//import EssentialLink from 'components/EssentialLink.vue'; // Adjust the path as needed

export default defineComponent({
   name: "PrincipalCoches",
   data() {
      return {
         showNewUser: false,
         showLoginUser: false,
         userId: null,
         userIsAdmin: false,
         toggleDark: ref(false),
         modelSelectedMenu: ref("coches"),
         optionsMenu: [
            { label: "Coches", value: "coches" },
            // { label: "Ofertas", value: "ofertas" },
            { label: "Contacto", value: "contacto" },
         ],
         imageUrls: [
            "https://cdn.quasar.dev/img/parallax1.jpg",
            "https://cdn.quasar.dev/img/parallax2.jpg",
            "https://cdn.quasar.dev/img/parallax1.jpg",
            "https://cdn.quasar.dev/img/parallax2.jpg",
            "https://cdn.quasar.dev/img/parallax1.jpg",
            "https://cdn.quasar.dev/img/parallax2.jpg",
            "https://cdn.quasar.dev/img/parallax1.jpg",
            "https://cdn.quasar.dev/img/parallax2.jpg",
         ],
         expanded: false,
         lorem: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
         // Initialize with your desired value
      };
   },
    watch: {
       modelSelectedMenu: function (item) {
          debugger;
          item;
       },
   },
   methods: {
      ingresar() {
         debugger;
         this.showLoginUser = true;
         this.showNewUser = false;
      },
      register() {
         debugger;
         this.showNewUser = true;
         this.showLoginUser = false;
      },
      toggleDarkMode() {
         const $q = this.$q;
         $q.dark.toggle();
      },
      // updateShowLogin(value) {
      //    this.showLogin = value;
      //    console.log(this.showLogin);
      // },
      // updateUserId(userId) {
      //    // Receive the 'userId' emitted from InputUser component
      //    this.userId = userId;
      // },
      // updateAdmin(value) {
      //    this.userIsAdmin = value;
      // },
   },
   mounted() {},
   components: {
      //EssentialLink,
      InputUser,
      loginUser,
      MyCarousel,
      // AdminPart,
      // LabellerUser,
   },

   setup() {
      const $q = useQuasar();
      $q.dark.set(true); // or false or "auto"
      $q.dark.toggle(); // toggle

      const dialogVisible = ref(false);
      function carouselFoto() {
         dialogVisible.value = true;
      }
      return { carouselFoto, dialogVisible };
   },
});
</script>
