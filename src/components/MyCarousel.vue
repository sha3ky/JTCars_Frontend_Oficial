<template>
   <div class="q-pa-md full-width">
      <q-dialog v-model="carousel" @hide="closeDialog">
         <!-- Tarjeta en Full Width -->
         <q-card class="full-width q-card--full-screen">
            <!-- Encabezado de la Modal (Fondo Oscuro para contraste) -->
            <q-card-section
               class="row items-center q-py-sm q-px-md bg-grey-10 text-white"
            >
               <!-- Título de la Marca -->
               <div class="text-h6 text-uppercase text-weight-bold q-px-sm">
                  {{ marca }}
               </div>

               <!-- Espaciador para empujar el botón Cerrar al extremo derecho -->
               <q-space />

               <!-- Botón Cerrar (Asegurando la visibilidad y alto contraste) -->
               <q-btn
                  icon="close"
                  color="transparent"
                  text-color="red-5"
                  size="lg"
                  round
                  flat
                  @click="closeDialog"
               />
            </q-card-section>

            <!-- Carrusel de Imágenes con Flechas Grandes -->
            <q-carousel
               swipeable
               animated
               v-model="slide"
               v-model:fullscreen="fullscreen"
               infinite
               class="bg-black"
               style="height: 70vh"
            >
               <q-carousel-slide
                  v-for="(image, index) in imagenes"
                  :key="index"
                  :name="index + 1"
                  class="q-pa-none"
               >
                  <div class="row fit justify-center items-center">
                     <q-img
                        class="full-width full-height"
                        :src="image.ruta"
                        fit="contain"
                        loading="lazy"
                        spinner-color="primary"
                     />
                  </div>
               </q-carousel-slide>

               <!-- Control de Pantalla Completa -->
               <template v-slot:control>
                  <q-carousel-control
                     position="bottom"
                     :offset="[0, 20]"
                     class="text-white rounded-borders"
                  >
                     <!-- Controles personalizados para las flechas -->
                     <div
                        class="row items-center justify-between full-width q-px-xl"
                     >
                        <q-btn
                           round
                           size="md"
                           icon="chevron_left"
                           @click="
                              slide = slide > 1 ? slide - 1 : imagenes.length
                           "
                           class="arrow-btn"
                        />

                        <q-btn
                           round
                           size="md"
                           icon="chevron_right"
                           @click="
                              slide = slide < imagenes.length ? slide + 1 : 1
                           "
                           class="arrow-btn"
                        />
                     </div>
                  </q-carousel-control>
               </template>
            </q-carousel>
         </q-card>
      </q-dialog>
   </div>
</template>

<script>
import { ref } from "vue";
import apiLink from "../composable/apiLink";

export default {
   props: {
      carouseloDialog: Boolean,
      arrayDatos: Object,
   },
   data() {
      return {
         slide: ref(1),
         fullscreen: ref(false),
         autoplay: ref(false),
         link: apiLink,
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
         if (item) {
            this.extrerImagenes(this.arrayDatos);
         }
      },
   },
   methods: {
      extrerImagenes(row) {
         debugger;
         this.imagenes = [];
         this.marca = row.marca + " " + row.modelo;
         for (let img = 1; img <= 8; img++) {
            const propertyName = "imagen" + img;
            if (row[propertyName]) {
               // Usa URL para evitar problemas con barras
               const rutaCompleta = new URL(row[propertyName], this.link).href;

               let imgObj = {
                  imagen: row[propertyName],
                  imagenNum: propertyName,
                  id: row.media_files,
                  esNueva: false,
                  ruta: rutaCompleta,
               };

               this.imagenes.push(imgObj);
            }
         }
      },

      closeDialog() {
         this.carousel = false;
         this.$emit("close-dialog-carousel");
      },
   },
};
</script>

<style scoped>
::v-deep .arrow-btn {
   width: 50px !important;
   height: 50px !important;
   font-size: 28px !important;
   /* Fondo: Gris muy oscuro con 50% de transparencia */
   background: rgba(51, 51, 51, 0.5) !important;
   /* Borde: Blanco limpio */
   border: 2px solid white !important;
}

::v-deep .arrow-btn:hover {
   /* Fondo al pasar el ratón: Gris claro sutil (simula luz) */
   background: #e0e0e0 !important;
   /* Borde al pasar el ratón: Oscurecemos el borde para más contraste */
   border: 2px solid #555 !important;
   /* Transformación */
   transform: scale(1.1);
}
</style>
