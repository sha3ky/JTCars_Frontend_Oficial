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
                  <p>hello</p>
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
            >
               <q-carousel-slide
                  v-for="(image, index) in arrayData"
                  :key="index"
                  :name="index + 1"
                  :img-src="getBase64Image(image)"
               />

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
      arrayDatos: Array,
   },
   data() {
      return {
         carousel: false,
         imagenes: [],
      };
   },
   watch: {
      carouseloDialog: function (item) {
         debugger;
         this.carousel = item;
      },
      arrayData: function (item) {
         debugger;
         if (this.arrayData !== 0) {
            this.repartirImg(this.arrayData);
         }
      },
   },
   methods: {
      repartirImg(array) {
         debugger;
         array.forEach((element) => {
            this.imagenes.push(element.imagen1);
         });
      },
      getBase64Image(image) {
         return `data:image/jpeg;base64,${image}`;
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
