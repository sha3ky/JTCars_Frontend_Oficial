<template>
   <div class="q-pa-md" style="width: 100%; background-color: transparent">
      <q-dialog v-model="carousel" @hide="closeDialog">
         <q-card style="width: 100vw">
            <div
               style="
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
               "
            >
               <div style="width: 85%; text-align: center; margin-top: 10px">
                  <p
                     style="
                        font-size: x-large;
                        font-style: italic;
                        margin-left: 30px;
                        text-transform: capitalize;
                     "
                  >
                     {{ marca }}
                  </p>
               </div>
               <div style="margin-right: 10px">
                  <q-btn
                     glossy
                     style="color: #1aee9f; background: #37474f"
                     @click="closeDialog"
                     flat
                  >
                     Cerrar
                  </q-btn>
               </div>
            </div>
            <q-carousel
               swipeable
               animated
               arrows
               v-model="slide"
               v-model:fullscreen="fullscreen"
               infinite
               control-type="regular"
               control-color="red"
            >
               <q-carousel-slide
                  v-for="(image, index) in imagenes"
                  :key="index"
                  :name="index + 1"
               >
                  <div
                     class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap"
                  >
                     <q-img
                        class="rounded-borders full-height"
                        :src="getBase64Image(image)"
                     />
                  </div>
               </q-carousel-slide>

               <template v-slot:control>
                  <q-carousel-control
                     position="bottom-right"
                     :offset="[18, 18]"
                  >
                     <q-btn
                        push
                        round
                        dense
                        color="white"
                        text-color="primary"
                        :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
                        @click="fullscreen = !fullscreen"
                     />
                  </q-carousel-control>
               </template>
            </q-carousel>
         </q-card>
      </q-dialog>
   </div>
</template>

<script>
import { ref } from "vue";
export default {
   props: {
      carouseloDialog: Boolean, // Define a prop to receive showLogin from the parent
      arrayDatos: Object,
   },
   data() {
      return {
         carousel: false,
         imagenes: [],
         marca: "",
      };
   },
   watch: {
      carouseloDialog: function (item) {
         this.carousel = item;
      },
      arrayDatos: function (item) {
      debugger
         if (item) {
            this.repartirImg(this.arrayDatos);
         }
      },
   },
   methods: {
      repartirImg(array) {
         this.marca = array.marca + " " + array.modelo;
         this.imagenes = [];
         for (let img = 1; img <= 8; img++) {
            const propertyName = "imagen" + img;
            if (array[propertyName]) {
               this.imagenes.push(array[propertyName]);
            }
         }
      },
      getBase64Image(image) {
         return `data:image/jpeg;base64, ${image}`;
      },
      closeDialog() {
         this.carousel = false; // Close the dialog
         this.$emit("close-dialog-carousel"); // Emit an event to notify the parent component
      },
   },
   setup() {
      return {
         slide: ref(1),
         fullscreen: ref(false),
      };
   },
};
</script>
