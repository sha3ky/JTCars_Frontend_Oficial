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
                        <q-item-section>Ofertas</q-item-section>
                     </q-item>
                     <q-separator />
                     <q-item clickable>
                        <q-item-section>Contacto</q-item-section>
                     </q-item>
                  </q-list>
               </q-menu>
            </q-btn>
            <!-- <q-img
               height="40px"
               width="108px"
               src="../../public/logoIconCar.png"
               v-if="$q.screen.width > 600"
            >
            </q-img> -->
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
               color="white"
               dark
               v-model="white"
               @click="toggleDarkMode"
            />
         </q-toolbar>
      </q-header>
      <q-footer elevated class="bg-blue-grey-9">
         <q-toolbar>
            <q-toolbar-title>Footer</q-toolbar-title>
         </q-toolbar>
      </q-footer>

      <q-page-container style="min-height: 100vh; text-align: center">
         <q-img
            src="/banner.png"
            class="q-mx-auto"
            :max-width="400"
            :max-height="425"
            alt="Beny1 Logo"

         ></q-img>
         <div>
            <div style="padding: 25px;    background: #37474F;">
               <p style="font-size:6vw;text-align: center;    text-align: center;
    color: white;">
                  Coches de segunda mano y vehículos de ocasión.
               </p>
            </div>
         </div>

         <div>
            <div class="q-pa-md row items-start q-gutter-md" >
              <div class="row">
              <q-card
                v-for="(image, index) in imageUrls"
                :key="index"
                style="padding: 10px;"
                flat
                bordered
                class="my-card col-6"

              >
                <q-img :src="image" />

                <q-card-section>
                  <div class="text-overline text-orange-9">Overline</div>
                  <div class="text-h5 q-mt-sm q-mb-xs">Title</div>
                  <div class="text-caption text-grey">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </div>
                </q-card-section>

                <q-card-actions>
                  <q-btn flat color="primary" label="Share"  @click="carouselFoto"/>
                  <q-btn flat color="secondary" label="Book" />

                  <q-space />

                  <q-btn
                    color="grey"
                    round
                    flat
                    dense
                    :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
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
      </q-page-container>
   </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";

import InputUser from "components/InputUser.vue"; // Replace with the actual path
import loginUser from "src/components/loginUser.vue";
import AdminPart from "components/AdminPart.vue"; // Adjust the path as needed
import LabellerUser from "components/LabellerUser.vue";

//import EssentialLink from 'components/EssentialLink.vue'; // Adjust the path as needed

export default defineComponent({
   name: "MainLayout",
   data() {
      return {
         showNewUser: false,
         showLoginUser: false,
         userId: null,
         userIsAdmin: false,
         white: ref(false),
         modelSelectedMenu: ref("coches"),
         optionsMenu: [
            { label: "Coches", value: "coches" },
            { label: "Ofertas", value: "ofertas" },
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
        "https://cdn.quasar.dev/img/parallax2.jpg"
      ],
      expanded: false,
      lorem:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
         // Initialize with your desired value
      };
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
      // AdminPart,
      // LabellerUser,
   },

   setup() {
      const $q = useQuasar();
      $q.dark.set(true); // or false or "auto"
      $q.dark.toggle(); // toggle


      function carouselFoto () {
      $q.dialog({
        title: 'Alert',
        message: 'Some message'
      }).onOk(() => {
        // console.log('OK')
      }).onCancel(() => {
        // console.log('Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    }
    return { carouselFoto }
   },
});
</script>
