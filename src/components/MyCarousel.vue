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
               <div style="width: 85%; text-align: center;margin-top: 10px;">
                  <p>hello</p>
               </div>
               <div>
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
               v-model="slide"
               thumbnails
               infinite
               arrows
            >
               <q-carousel-slide
                  :name="1"
                  img-src="https://cdn.quasar.dev/img/mountains.jpg"
               />
               <q-carousel-slide
                  :name="2"
                  img-src="https://cdn.quasar.dev/img/parallax1.jpg"
               />
               <q-carousel-slide
                  :name="3"
                  img-src="https://cdn.quasar.dev/img/parallax2.jpg"
               />
               <q-carousel-slide
                  :name="4"
                  img-src="https://cdn.quasar.dev/img/quasar.jpg"
               />
               <q-carousel-slide
                  :name="5"
                  img-src="https://cdn.quasar.dev/img/parallax1.jpg"
               />
               <q-carousel-slide
                  :name="6"
                  img-src="https://cdn.quasar.dev/img/parallax2.jpg"
               />
               <q-carousel-slide
                  :name="7"
                  img-src="https://cdn.quasar.dev/img/quasar.jpg"
               />
               <q-carousel-slide
                  :name="8"
                  img-src="https://cdn.quasar.dev/img/mountains.jpg"
               />
            </q-carousel>
         </q-card>
      </q-dialog>
   </div>
</template>

<script>
export default {
   props: {
      carouseloDialog: Boolean, // Define a prop to receive showLogin from the parent
   },
   data() {
      return {
         slide: 1,
         carousel: false,
      };
   },
   watch: {
      carouseloDialog: function (item) {
         debugger;
         this.carousel = item;
      },
   },
   methods: {
      closeDialog() {
         this.carousel = false; // Close the dialog
         this.$emit("close-dialog-carousel"); // Emit an event to notify the parent component
      },
   },
};
</script>
